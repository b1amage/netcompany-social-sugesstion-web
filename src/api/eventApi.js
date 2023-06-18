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
};

export default eventApi;
