import Screen from "@/components/container/Screen";
import Heading from "@/components/typography/Heading";
import Wrapper from "@/components/wrapper/Wrapper";
import eventList from "@/constants/mockEvents";
import EventCard from "@/components/card/EventCard";

import React from "react";
import useDragAndDrop from "@/hooks/useDragAndDrop";

const EventsScreen = () => {
  const [renderItems] = useDragAndDrop(eventList, () => {
    console.log("changed");
  });
  return (
    <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20">
      <Heading>My Events</Heading>

      {/* CARDS */}
      <Wrapper
        col="true"
        className="grid grid-cols-1 gap-2 px-2 place-items-center md:grid-cols-2 xl:grid-cols-3 md:gap-5 lg:gap-8 drag-and-drop-list"
      >
        {/* {eventList.map((event) => (
          <EventCard key={event.title} event={event} />
        ))} */}

        {renderItems()}
      </Wrapper>
    </Screen>
  );
};

export default EventsScreen;
