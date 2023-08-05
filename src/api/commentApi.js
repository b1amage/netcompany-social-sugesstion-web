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
      return error.response;
    }
  },
  async createComment(data, setErr) {
    try {
      const url = `/comment`;
      const response = await axiosClient.post(url, data, {
        withCredentials: true,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      setErr(error.response.data.message);
      return error.response;
    }
  },
  async deleteComment(id, notifyErr) {
    try {
      const url = `/comment/${id}`;
      const response = await axiosClient.delete(url, {
        withCredentials: true,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      // setSubmitErr((prev) => [...prev, error.response.data.message]);
      notifyErr(error.response.data.message)
      return error.response;
    }
  },
  async updateComment(data, setErr) {
    try {
      const url = `/comment`;
      const response = await axiosClient.patch(url, data, {
        withCredentials: true,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      setErr(error.response.data.message);
      return error.response;
    }
  },
  async likeComment(id) {
    try {
      const url = `/comment/like/${id}`;
      const response = await axiosClient.post(url, {
        withCredentials: true,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      // setSubmitErr((prev) => [...prev, error.response.data.message]);
      return error.response;
    }
  },
  async unLikeComment(id) {
    try {
      const url = `/comment/like/${id}`;
      const response = await axiosClient.delete(url, {
        withCredentials: true,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      // setSubmitErr((prev) => [...prev, error.response.data.message]);
      return error.response;
    }
  },
};

export default commentApi;