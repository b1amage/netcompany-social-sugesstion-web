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

  async getLocationDetails(id, navigate) {
    try {
      const url = `/location/detail/${id}`;

      const response = await axiosClient.get(url, {
        withCredentials: true,
      });

      console.log("response of details", url, response);

      return response;
    } catch (error) {
      console.log(error);
      const statusCode = error.response.status;
      if (statusCode === 404) {
        navigate(`/error/${error.response.data.message}`);
      }
    }
  },

  async like(id) {
    try {
      const url = `/location/like/${id}`;
      console.log(url);

      const response = await axiosClient.post(
        url,
        {},
        {
          withCredentials: true,
        }
      );

      console.log("response of liked", url, response);

      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async unlike(id) {
    try {
      const url = `/location/like/${id}`;

      console.log(url);

      const response = await axiosClient.delete(url, {
        withCredentials: true,
      });

      console.log("response of unliked", url, response);

      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async getUserLikedPost(id, nextCursor) {
    try {
      const url = nextCursor
        ? `/user/like/${id}?next_cursor=${nextCursor}`
        : `/user/like/${id}`;

      console.log("calling get liked user with url: ", url);
      const response = await axiosClient.get(url, {
        withCredentials: true,
      });

      console.log("response of  ", url, response);

      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default locationApi;
