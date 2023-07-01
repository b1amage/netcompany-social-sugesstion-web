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

};

export default itineraryApi;