require("dotenv").config({ path: "src/.env" });
const User = require("../models/User");
const Friend = require("../models/Friend");

const saveUserDetails = async function (user) {
  try {
    const existingUser = await User.findOne({ username: user });
    if (existingUser) {
      return existingUser;
    }
    const responseUser = await fetch(process.env.API_URI + user);

    const gitHubUser = await responseUser.json();
    let {
      login,
      id,
      avatar_url,
      name,
      company,
      blog,
      location,
      email,
      bio,
      type,
      public_repos,
      followers,
      following,
      created_at,
      updated_at,
    } = gitHubUser;
    const userData = {
      username: login,
      id: id,
      avatarUrl: avatar_url,
      name: name,
      type: type,
      company: company,
      blog: blog,
      location: location,
      email: email,
      bio: bio,
      numberOfPublicRepos: public_repos,
      followers: followers,
      following: following,
      createdAt: created_at,
      updatedAt: updated_at,
    };
    const savedUser = await User.create(userData);
    return savedUser;
  } catch (error) {
    throw error;
  }
};

async function findMutualFollowerDetails(user) {
  try {
    const responseUser = await fetch(process.env.API_URI + user);

    const gitHubUser = await responseUser.json();
    const { login, id, followers_url } = gitHubUser;
    const existingFriend = await Friend.findOne({ username: login });
    if (existingFriend) {
      return {username:existingFriend.username,friends:JSON.parse(existingFriend.friends)};
    }
    const responsefollowers = await fetch(followers_url);
    const followers = await responsefollowers.json();
    //console.log(followers);
    const responsefollowing = await fetch(
      process.env.API_URI + user + "/following"
    );
    const following = await responsefollowing.json();
    let friends = [];
    //console.log(following);
    if (followers && following) {
      for (let i = 0; i < following.length; i++) {
        let followersId = followers.find(
          (follower) => follower.id === following[i].id
        );
        if (followersId) {
          friends.push(following[i]);
        }
      }
    }

    console.log(friends);
    if (!friends) {
      throw new Error("No friends");
    }
    if (friends) {
      const savedFriends = await Friend.create({
        username: login,
        id: id,
        friends: JSON.stringify(friends),
      });
      return {username:savedFriends.username,friends:JSON.parse(savedFriends.friends)};
    }
  } catch (error) {
    throw error;
  }
}
const deleteUserDetails = async (username) => {
    try {
      console.log("Delete");
      const deletedUser = await User.findOneAndUpdate(
        { username: username },
        { $set: {isDeleted:true} },
        { new: true }
      );
  
      return deletedUser;
    } catch (error) {
      throw error;
    }
  };

module.exports = {
  saveUserDetails,
  findMutualFollowerDetails,
  deleteUserDetails
};
