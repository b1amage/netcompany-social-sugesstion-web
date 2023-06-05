import axiosClient from "@/api/axiosClient";

const locationApi = {
  async createLocation(data) {
    try {
      const url = "/location";
      const response = await axiosClient.post(url, data, {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
};

export default locationApi;
