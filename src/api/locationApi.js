import axiosClient from "@/api/axiosClient";

const locationApi = {
  async createLocation(data, navigate,setSubmitErr) {
    try {
      const url = "/location";
      const response = await axiosClient.post(url, data, {
        withCredentials: true,
      });
      // console.log(response);
      navigate(-1)
      return response
    } catch (error) {
      setSubmitErr(error.response.data.message)
      return error.response.data.message;
    }
  },
};

export default locationApi;
