import Screen from "@/components/container/Screen";
import Heading from "@/components/typography/Heading";
import Wrapper from "@/components/wrapper/Wrapper";
import InputWithDropdown from "@/components/form/InputWithDropdown";
import React, { useState } from "react";
import eventApi from "@/api/eventApi";
import { useNavigate } from "react-router-dom";

const AllEventsScreen = () => {
  const [suggestNextCursor, setSuggestNextCursor] = useState(undefined);
  const navigate = useNavigate();
  const handleGetSuggestionsSearch = (text) => {
    const handleApi = async () => {
      const response = await eventApi.getEvents(text, "all");
      console.log(response);
      setSuggestNextCursor(response.data.next_cursor);
      return response.data;
    };

    return handleApi();
  };
  const handleSuggestionsSelect = (suggest) =>
    navigate(`/event/${suggest._id}`);

  const handleLoadMore = (text) => {
    const apiHandler = async () => {
      if (suggestNextCursor === null) return null;
      console.log(suggestNextCursor);
      const response = await eventApi.getEvents(text, "all", suggestNextCursor);
      setSuggestNextCursor(response.data.next_cursor);
      return response.data;
    };

    return apiHandler();
  };
  return (
    <Screen className="py-2 pb-4 xl:gap-10 xl:pb-10">
      <Heading>Events</Heading>

      <Wrapper>
        <InputWithDropdown
          handleGet={handleGetSuggestionsSearch}
          placeholder="Search event"
          onSelect={handleSuggestionsSelect}
          loadMore={handleLoadMore}
          hideError="true"
          fieldToDisplay="name"
          subFieldToDisplay="startDateTime"
        />
      </Wrapper>
    </Screen>
  );
};

export default AllEventsScreen;
