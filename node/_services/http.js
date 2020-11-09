const axios = require("axios");
//  user function imports

const api = {
  login(token) {
    return axios.get(`https://portal.whiterabbit.group/projects.json`, {
      headers: {
        Authorization: `${token}`
      }
    });
  },
  getProjects(token) {
    return axios.get(
      `https://portal.whiterabbit.group/projects.json?orderBy=lastActivityDate&status=ACTIVE&orderMode=desc`, {
        headers: {
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          Authorization: `${token}`
        }
      }
    );
  }
};

module.exports = api;