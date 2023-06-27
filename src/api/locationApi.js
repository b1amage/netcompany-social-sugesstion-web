import axiosClient from "@/api/axiosClient";

const locationApi = {
  async createLocation(
    data,
    navigate,
    setSubmitErr,
    setIsShowPopup,
    notfifyCreate
  ) {
    try {
      const url = "/location";
      const response = await axiosClient.post(url, data, {
        withCredentials: true,
      });
      console.log(response);
      setIsShowPopup(true);
      setTimeout(() => {
        setIsShowPopup(false);
        notfifyCreate();
        navigate(-1);
      }, 2000);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      setSubmitErr((prev) => [...prev, error.response.data.message]);
      return error.response.data.message;
    }
  },
  //   ${data.weekday.openTime ? `&weekday[openTime]=${data.weekday.openTime}` : ""}${data.weekday.closeTime ? `&weekday[closeTime]=${data.weekday.closeTime}` : ""}${data.weekend.openTime ? `&weekend[openTime]=${data.weekend.openTime}` : ""}${data.weekend.closeTime ? `&weekend[closeTime]=${data.weekend.closeTime}` : ""}
  // ${data.weekday.openTime ? `&weekday[openTime]=${data.weekday.openTime}` : ""}${data.weekday.closeTime ? `&weekday[closeTime]=${data.weekday.closeTime}` : ""}${data.weekend.openTime ? `&weekend[openTime]=${data.weekend.openTime}` : ""}${data.weekend.closeTime ? `&weekend[closeTime]=${data.weekend.closeTime}` : ""}
  async getFeaturedLocation(data, next_cursor) {
    try {
      const url = `/location/filter/featured?${
        next_cursor ? `next_cursor=${next_cursor}` : ""
      }${
        data.locationCategory
          ? `&locationCategory=${data.locationCategory}`
          : ""
      }${data.searchInput ? `&searchInput=${data.searchInput}` : ""}${
        data.lat ? `&latitude=${data.lat}` : ""
      }${data.lng ? `&longitude=${data.lng}` : ""}${
        data.searchDistance ? `&searchDistance=${data.searchDistance}` : ""
      }${
        data.weekday
          ? `&weekday[openTime]=${data.weekday.openTime}&weekday[closeTime]=${data.weekday.closeTime}`
          : ""
      }${
        data.weekend
          ? `&weekend[openTime]=${data.weekend.openTime}&weekend[closeTime]=${data.weekend.closeTime}`
          : ""
      }`;
      console.log(url);
      const response = await axiosClient.get(url, {
        withCredentials: true,
      });
      // console.log(response)
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  async getLatestLocation(data, next_cursor) {
    try {
      const url = `/location/filter/latest?${
        next_cursor ? `next_cursor=${next_cursor}` : ""
      }${
        data.locationCategory
          ? `&locationCategory=${data.locationCategory}`
          : ""
      }${data.searchInput ? `&searchInput=${data.searchInput}` : ""}${
        data.lat ? `&latitude=${data.lat}` : ""
      }${data.lng ? `&longitude=${data.lng}` : ""}${
        data.searchDistance ? `&searchDistance=${data.searchDistance}` : ""
      }${
        data.weekday
          ? `&weekday[openTime]=${data.weekday.openTime}&weekday[closeTime]=${data.weekday.closeTime}`
          : ""
      }${
        data.weekend
          ? `&weekend[openTime]=${data.weekend.openTime}&weekend[closeTime]=${data.weekend.closeTime}`
          : ""
      }`;
      console.log(url);
      const response = await axiosClient.get(url, {
        withCredentials: true,
      });
      // console.log(response)
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  async getLocationDetails(id, navigate) {
    try {
      const url = `/location/detail/${id}`;

      const response = await axiosClient.get(url, {
        withCredentials: true,
      });

      console.log("response of details", url, response);

      if (response.data?.isDeleted && response.data.isDeleted === true) {
        navigate("/error/This location no longer exists");
      }
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

  async deleteLocation(id, notifyDelete) {
    try {
      const url = `/location/${id}`;
      const response = await axiosClient.delete(url, {
        withCredentials: true,
      });
      notifyDelete();

      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async updateLocation(
    data,
    navigate,
    setSubmitErr,
    setIsShowPopup,
    notifyUpdate
  ) {
    const url = `/location`;

    try {
      const response = await axiosClient.patch(url, data, {
        withCredentials: true,
      });
      setIsShowPopup(true);
      setTimeout(() => {
        setIsShowPopup(false);
        notifyUpdate();
        navigate(-1);
      }, 2000);
      return response;
    } catch (error) {
      console.log(error);
      setSubmitErr((prev) => [...prev, error.response.data.message]);
    }
  },
};

export default locationApi;
