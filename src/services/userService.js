const User = require("../models/User");
const { generateOptions } = require("../utils/utils");
const https = require("https");




async function saveUserFromGitHub(user) {
  const options = generateOptions("/users/" + user);

  const request = https
    .get(options,async function (apiResponse) {
      let data = "";
      apiResponse.setEncoding("utf8");
      apiResponse.on("data", (chunk) => {
        data += chunk;
      });

      apiResponse.on("end", async() => {
        jsonData = JSON.parse(data);
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
        } = jsonData;
        const userData = {
          username: login,
          id: id,
          avatarUrl: avatar_url,
          name: name,
          type:type,
          company: company,
          blog: blog,
          location: location,
          email: email,
          bio: bio,
          numberOfPublicRepos:public_repos,
          followers: followers,
          following: following,
          createdAt: created_at,
          updatedAt: updated_at,
        };
         await User.create(userData);
      });
    })
    .on("error", (e) => {
      throw e;
    });
  request.end();
 

 
}
const saveUserDetails = async function (user) {

    try {
      const existingUser = await User.findOne({ username: user });
      if (existingUser) {
        return existingUser;
      }
      await saveUserFromGitHub(user);
    } catch (error) {
      throw error;
    }
  };
  const findMutualFollowers = async function (user) {

    try {
      const existingUser = await User.findOne({ username: user });
      if (existingUser) {
        return existingUser;
      }
      await saveUserFromGitHub(user);
    } catch (error) {
      throw error;
    }
  };
  module.exports = {
    saveUserDetails,findMutualFollowers
  };
