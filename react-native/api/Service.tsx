import ServiceError from "../Handler/ServiceError";
import env from "constants/env";

const API_VERSION = "api/v1";

export default class Service {
  constructor(api) {
    this.api = api;
  }

  handleSession = (sessionData) => {
    const {
      data: { token }
    } = sessionData;
    return {
      user: {
        accessToken: token
      }
    };
  };

  handleLogin = (sessionData) => {
    const {
      data: { token }
    } = sessionData;
    return {
      user: {
        token
      }
    };
  };

  handleResponse = (data) => {
    if (typeof data !== "string") {
      return data;
    } else {
      //Session timeout
      window.open(env.ADMIN_URL, "_self");
    }
  };

  handleParseError = async (error) => {
    if (error) {
      switch (error.status) {
        default:
          throw new ServiceError(error);
      }
    } else {
      throw new ServiceError({ code: -1 });
    }
  };

  async getUsers(page = 0) {
    try {
      const data = await this.api.get(`api/users?page=${page}`);
      if (data.status == 200) {
        return this.handleResponse(data);
      } else {
        return this.handleParseError(data?.data);
      }
    } catch (error) {
      return this.handleParseError(error);
    }
  }
}
