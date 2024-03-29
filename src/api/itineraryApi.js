import axiosClient from "@/api/axiosClient";

const itineraryApi = {
  async getItineraries(nextCursor = "") {
    try {
      const url = `/itinerary/me?next_cursor=${nextCursor}`;
      const response = await axiosClient.get(url, {
        withCredentials: true,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      // setSubmitErr((prev) => [...prev, error.response.data.message]);
      return error.response.data.message;
    }
  },
  async createItinerary(data, setShowPopup){
    try{
      const url = "/itinerary"
      const response = await axiosClient.post(url, data,{
        withCredentials: true,
      });
      setShowPopup(false)

      return response
    } catch (error){
      console.log(error);
    }
  },
  async deleteItinerary(id, notifyDelete){
    try{
      const url = `/itinerary/${id}`
      const response = await axiosClient.delete(url, {
        withCredentials: true,
      });
      notifyDelete()

      return response
    } catch (error){
      console.log(error);
    }
  },
  async editItinerary(data, setShowEditPopup){
    try{
      const url = `/itinerary`
      const response = await axiosClient.patch(url, data, {
        withCredentials: true,
      });
      setShowEditPopup(false)

      return response
    } catch (error){
      console.log(error);
    }
  },
  async getItineraryDetails(id, setAvailableErr){
    try{
      const url = `/itinerary/${id}`
      const response = await axiosClient.get(url, {
        withCredentials: true,
      });
      return response
    } catch (error){
      console.log(error);
      setAvailableErr(error.response.data.message)
      return error.response
    }
  },
  async saveLocation(data){
    try{
      const url = `/itinerary/location/save`
      const response = await axiosClient.post(url, data,{
        withCredentials: true,
      });
      return response
    } catch (error){
      console.log(error);
      return error.response
    }
  },
  async deleteSavedLocation(id, notifyDelete){
    try{
      const url = `/itinerary/location/delete/${id}`
      const response = await axiosClient.delete(url, {
        withCredentials: true,
      });
      notifyDelete()
      return response
    } catch (error){
      console.log(error);
    }
  }, 
  async updateSavedLocation(data, setSubmitErr, navigate, notifyUpdate){
    try{
      const url = `/itinerary/location/update`
      const response = await axiosClient.patch(url, data,{
        withCredentials: true,
      });
      notifyUpdate()
      navigate(-1)
      return response
    } catch (error){
      console.log(error);
      setSubmitErr(error.response.data.message)
      return error.response
    }
  }, 
  async updateLocationsOrder(data){
    try{
      const url = `/itinerary/location/order`
      const response = await axiosClient.patch(url, data,{
        withCredentials: true,
      });
      console.log(response)
      return response
    } catch (error){
      console.log(error);
      // setSubmitErr(error.response.data.message)
      return error.response
    }
  }, 
};

export default itineraryApi;