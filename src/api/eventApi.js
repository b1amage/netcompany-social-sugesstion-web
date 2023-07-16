import axiosClient from "@/api/axiosClient";

const eventApi = {
  async getSuggestLocation(input, nextCursor) {
    try {
      const url = nextCursor
        ? `/location/search/${input}?next_cursor=${nextCursor}`
        : `/location/search/${input}`;
      const response = await axiosClient.get(url, {
        withCredentials: true,
      });

      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async getSuggestGuest(input, nextCursor) {
    try {
      const url = nextCursor
        ? `/user/search/${input}?next_cursor=${nextCursor}`
        : `/user/search/${input}`;
      const response = await axiosClient.get(url, {
        withCredentials: true,
      });

      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async createEvent(data) {
    try {
      const url = "/event";
      const response = await axiosClient.post(url, data, {
        withCredentials: true,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async updateEvent(data) {
    try {
      const url = "/event";
      const response = await axiosClient.patch(url, data, {
        withCredentials: true,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async getEvent(id) {
    try {
      const url = `/event/${id}`;
      const response = await axiosClient.get(url, {
        withCredentials: true,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async getEvents(searchInput, type, nextCursor) {
    try {
      const url = nextCursor
        ? `/event/filter/${type}?searchInput=${searchInput}&next_cursor=${nextCursor}`
        : `/event/filter/${type}?searchInput=${searchInput}`;
      console.log(url);
      const response = await axiosClient.get(url, {
        withCredentials: true,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async deleteEvent(id) {
    try {
      const url = `/event/${id}`;
      const response = await axiosClient.delete(url, {
        withCredentials: true,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default eventApi;
