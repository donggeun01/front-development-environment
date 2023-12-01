import axios from "axios";

const modal = {
  async get() {
    const result = await axios.get("/api/user");

    return result.data;
  },
};

export default modal;
