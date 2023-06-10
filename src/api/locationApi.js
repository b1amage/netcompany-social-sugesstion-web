import axiosClient from "@/api/axiosClient";

const locationApi = {
  async createLocation(data, navigate, setSubmitErr, setIsShowPopup) {
    try {
      const url = "/location";
      const response = await axiosClient.post(url, data, {
        withCredentials: true,
      });
      console.log(response);
      setIsShowPopup(true);
      setTimeout(() => {
        setIsShowPopup(false);
        navigate(-1);
      }, 2000);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      setSubmitErr((prev) => [...prev, error.response.data.message]);
      return error.response.data.message;
    }
  },

  async getLocationDetails(id) {
    try {
      const url = `/location/detail/${id}`;

      const response = await axiosClient.get(url, {
        withCredentials: true,
      });

      console.log("response of details", url, response);

      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default locationApi;
