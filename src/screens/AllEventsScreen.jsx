import Screen from "@/components/container/Screen";
import Heading from "@/components/typography/Heading";
import Wrapper from "@/components/wrapper/Wrapper";
import InputWithDropdown from "@/components/form/InputWithDropdown";
import React, { useEffect, useRef, useState } from "react";
import eventApi from "@/api/eventApi";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Button from "@/components/button/Button";
import Text from "@/components/typography/Text";

import Select from "@/components/form/Select";
import EventCard from "@/components/card/EventCard";
import { debounce } from "lodash";
import Loading from "../components/loading/Loading";

const AllEventsScreen = () => {
  const [loading, setLoading] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [suggestNextCursor, setSuggestNextCursor] = useState(undefined);
  const [type, setType] = useState("all");
  const [events, setEvents] = useState([]);
  const [eventsNextCursor, setEventsNextCursor] = useState(undefined);
  const [input, setInput] = useState("");
  const [lastFetch, setLastFetch] = useState(Date.now());
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const navigate = useNavigate();
  const listRef = useRef();

  useEffect(() => {
    console.log(type);
  }, [type]);

  useEffect(() => {
    console.log(eventsNextCursor);
  }, [eventsNextCursor]);

  useEffect(() => {
    console.log(events);
  }, [events]);

  useEffect(() => {
    const handleApi = async () => {
      setLoading(true);
      const response = await eventApi.getEvents(input, type, eventsNextCursor);
      setEventsNextCursor(response.data.next_cursor);
      localStorage.setItem("eventsNextCursor", response.data.next_cursor);
      setEvents(response.data.results);
      console.log(response);
      setLoading(false);
    };
    handleApi();
  }, [input, type]);

  const handleGetSuggestionsSearch = (text) => {
    const handleApi = async () => {
      const response = await eventApi.getEvents(text, type);
      console.log(response);
      setSuggestNextCursor(response.data.next_cursor);
      return response.data;
    };

    return handleApi();
  };

  const handleSearchClear = () => {
    const handleApi = async () => {
      setLoading(true);
      const response = await eventApi.getEvents("", type, undefined);
      setEventsNextCursor(response.data.next_cursor);
      localStorage.setItem("eventsNextCursor", response.data.next_cursor);
      setEvents(response.data.results);
      console.log(response);
      setInput("");
      setLoading(false);
    };

    handleApi();
  };

  const handleSuggestionsSelect = (suggest) =>
    navigate(`/event/${suggest._id}`);

  const handleLoadMore = (text) => {
    const apiHandler = async () => {
      if (suggestNextCursor === null) return null;
      console.log(suggestNextCursor);
      const response = await eventApi.getEvents(text, type, suggestNextCursor);
      setSuggestNextCursor(response.data.next_cursor);
      return response.data;
    };

    return apiHandler();
  };
  return (
    <Screen className="p-4 py-2 pb-5 xl:gap-10 xl:pb-10">
      <Heading className="!text-[24px] md:!text-[32px]">Events</Heading>

      <Wrapper className="items-center justify-center my-5">
        <Button
          onClick={() => navigate(`/event/create`)}
          active
          className="lg:!h-[58px] flex gap-2 flex-nowrap !m-0 lg:!min-w-[250px]"
        >
          <AiOutlinePlusCircle className="text-2xl" />
          <Text className="hidden lg:block">New Event</Text>
        </Button>
        <InputWithDropdown
          onClear={handleSearchClear}
          onEnter={(input) => {
            setInput(input);
            console.log("input", input);
            setEventsNextCursor()
            setHideSuggestions(true)
          }}
          onChange={() => setHideSuggestions(false)}
          hideSuggestions={hideSuggestions}
          hideLabel="true"
          handleGet={handleGetSuggestionsSearch}
          placeholder="Search event"
          onSelect={handleSuggestionsSelect}
          loadMore={handleLoadMore}
          hideError="true"
          fieldToDisplay="name"
          subFieldToDisplay="startDateTime"
          withClearButton="true"
        />

        <Select
          onChange={(item) => {
            setType(item);
            setEventsNextCursor()
          }}
          options={["all", "invited", "created", "past"]}
        />
      </Wrapper>

      <Heading className="!capitalize flex gap-2 !text-primary-400 !text-[20px] md:!text-[28px]">
        {input !== "" && events.length === 0 ? (
          <>
            No results found for <Text className="!text-secondary-400">"{input}"</Text>
          </>
        ) : input === "" && events.length === 0 ? (
          <>
            No results found
          </>
        ) : input === "" ? (
          <>
            Show all results
          </>
        ) : 
        type === "all" ? 
        (
          <>
            All Events for
            <Text className="!text-secondary-400">"{input}"</Text>
          </>
        ) 
        : (
          <>
            {type} Events for <Text className="!text-secondary-400">"{input}"</Text>
          </>
        )
        }
      </Heading>

      {loading ? (
        <Wrapper className="my-20 flex-center">
          <Loading />
        </Wrapper>
      ) : (
        <div
          ref={listRef}
          onScroll={() => {
            const now = Date.now();
            if (now - lastFetch < 500) return
            setLastFetch(now);
            const { scrollTop, scrollHeight, clientHeight } = listRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 1000) {
              console.log("Scrolled to bottom!");
              const handleApi = debounce(async () => {
                if (eventsNextCursor === null) return;
                setNextLoading(true);
                const response = await eventApi.getEvents(
                  input,
                  type,
                  eventsNextCursor
                );

                console.log(response);
                const newEvents = [...events, ...response.data.results];
                setEventsNextCursor(response.data.next_cursor);
                setEvents(newEvents);
                setNextLoading(false);
              }, 500);

              handleApi();
            }
          }}
          className="flex flex-col  lg:h-[500px] flex-wrap overflow-y-scroll my-5 py-4"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 place-items-center lg:gap-y-6 ">
            {events.length > 0 &&
              events.map((item) => <EventCard event={item} key={item._id} className="border"/>)}

            {nextLoading && <Loading />}
          </div>
        </div>
      )}
    </Screen>
  );
};

export default AllEventsScreen;
