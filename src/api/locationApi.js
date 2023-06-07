import axiosClient from "@/api/axiosClient";

const locationApi = {
  async createLocation(data) {
    try {
      const url = "/location";
      const response = await axiosClient.post(url, data, {
        withCredentials: true,
      });
      // console.log(response);
      return response
    } catch (error) {
      return error.response.data.message;
      // setErr(error.response)
    }
  },
};

export default locationApi;
