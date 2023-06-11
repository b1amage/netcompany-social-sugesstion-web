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
  async getFeaturedLocation(data, next_cursor){
    try{
      const url = `/location/filter/featured?next_cursor=${next_cursor}&locationCategory=${data.locationCategory}&searchInput=${data.searchInput}&latitude=${data.lat}&longitude=${data.lng}&searchDistance=${data.searchDistance}&weekday[openTime]=${data.weekday[0]}&weekday[closeTime]=${data.weekday[1]}&weekend[openTime]=${data.weekend[0]}&weekend[closeTime]=${data.weekend[1]}`
      const response = await axiosClient.get(url, {
        withCredentials: true
      })
      console.log(response)
    }catch(err){
      console.log(err)
    }
  },
  async getLatestLocation(data, next_cursor){
    try{
      const url = `/location/filter/latest?next_cursor=${next_cursor}&locationCategory=${data.locationCategory}&searchInput=${data.searchInput}&latitude=${data.lat}&longitude=${data.lng}&searchDistance=${data.searchDistance}&weekday[openTime]=${data.weekday[0]}&weekday[closeTime]=${data.weekday[1]}&weekend[openTime]=${data.weekend[0]}&weekend[closeTime]=${data.weekend[1]}`
      const response = await axiosClient.get(url, {
        withCredentials: true
      })
      console.log(response)
    }catch(err){
      console.log(err)
    }
  }
};

export default locationApi;
