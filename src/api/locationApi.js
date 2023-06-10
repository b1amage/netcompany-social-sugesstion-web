import axiosClient from "@/api/axiosClient";

const locationApi = {
  async createLocation(data, navigate,setSubmitErr, setIsShowPopup) {
    try {
      const url = "/location";
      const response = await axiosClient.post(url, data, {
        withCredentials: true,
      });
      console.log(response);
      setIsShowPopup(true)
      setTimeout(() => {
        setIsShowPopup(false)
        navigate(-1) 
      }, 2000)
      return response
    } catch (error) {
      console.log(error.response.data.message)
      setSubmitErr((prev) => [...prev,error.response.data.message])
      return error.response.data.message;
    }
  },
};

export default locationApi;
