import axiosClient from "@/api/axiosClient";

const commentApi = {
  async getCommentsOfLocation(locationId, nextCursor = "") {
    try {
      const url = `/comment/location/${locationId}?next_cursor=${nextCursor}`;
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
  async createComment(data, nextCursor = "") {
    try {
      const url = `/comment`;
      const response = await axiosClient.post(url, data, {
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

export default commentApi;