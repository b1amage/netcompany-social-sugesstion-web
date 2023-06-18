import Screen from "@/components/container/Screen";
import Wrapper from "@/components/wrapper/Wrapper";
import Heading from "@/components/typography/Heading";
import { useState, useEffect, useMemo } from "react";
import SubHeading from "@/components/typography/SubHeading";
import Input from "@/components/form/Input";
import Error from "@/components/form/Error";
import InputWithDropdown from "@/components/form/InputWithDropdown";
import inputState from "@/constants/inputState";
import eventApi from "@/api/eventApi";
import { GoLocation } from "react-icons/go";
import { BiUser } from "react-icons/bi";

const CreateEventScreen = () => {
  const defaultEvent = useMemo(
    () => ({
      name: "",
      locationId: null,
      description: null,
      startDate: null,
      startTime: {
        hours: null,
        minutes: null,
      },
      duration: {
        hours: null,
        minutes: null,
      },
      imageUrls: [],
      allDay: false,
      guests: [],
    }),
    []
  );

  const defaultEventError = useMemo(
    () => ({
      name: null,
      locationId: "",
      description: "",
      startDate: "",
      startTime: "",
      duration: "",
      imageUrls: "",
      guests: "",
    }),
    []
  );

  const [submitErr, setSubmitErr] = useState([]);
  const [event, setEvent] = useState(defaultEvent);
  const [error, setError] = useState(defaultEventError);
  const [suggestNextCursor, setSuggestNextCursor] = useState(undefined);
  const [guestNextCursor, setGuestNextCursor] = useState(undefined);

  // check every change of event
  useEffect(() => {
    console.log(`Event change: ${JSON.stringify(event, null, 2)}`);
  }, [event]);

  const handleNameChange = (e) => {
    const enteredText = e.target.value;
    const nameError =
      enteredText.trim() === "" ? "Name cannot be an empty or space(s)" : "";

    setError({
      ...error,
      name: nameError,
    });

    const newEvent = { ...event, name: enteredText };
    setEvent(newEvent);
  };

  const handleGetLocationSuggestList = (text) => {
    const apiHandler = async () => {
      const response = await eventApi.getSuggestLocation(text);
      setSuggestNextCursor(response.data.next_cursor);
      return response.data;
    };

    return apiHandler();
  };

  const handlePlaceSelect = (location) => {
    const newEvent = { ...event, locationId: location._id };
    setEvent(newEvent);
  };

  const handleLoadmoreSuggestList = (text) => {
    const apiHandler = async () => {
      if (suggestNextCursor === null) return null;
      const response = await eventApi.getSuggestLocation(
        text,
        suggestNextCursor
      );
      setSuggestNextCursor(response.data.next_cursor);
      return response.data;
    };

    return apiHandler();
  };

  const handleGetGuestSuggestList = (text) => {
    const apiHandler = async () => {
      const response = await eventApi.getSuggestGuest(text);
      setGuestNextCursor(response.data.next_cursor);
      return response.data;
    };

    return apiHandler();
  };

  const handleGuestSelect = (guest) => {
    const newGuests = [...event.guests, guest._id];
    const newEvent = { ...event, guests: newGuests };
    setEvent(newEvent);
  };

  const handleLoadmoreGuestList = (text) => {
    const apiHandler = async () => {
      if (guestNextCursor === null) return null;
      const response = await eventApi.getSuggestGuest(text, guestNextCursor);
      setGuestNextCursor(response.data.next_cursor);
      return response.data;
    };

    return apiHandler();
  };

  return (
    <Screen className="p-5">
      {/* headings */}
      <Wrapper
        col="true"
        className="w-full pb-10 border-b border-b-neutral-100"
      >
        <Heading>Add New Event</Heading>
        <SubHeading>Let &lsquo;s create your own event</SubHeading>
      </Wrapper>

      <Wrapper className="w-full !grid grid-cols-2 gap-10 bg-slate-200 my-10 p-5">
        {/* left */}
        <Wrapper col="true">
          <form className="flex flex-col gap-4">
            {/* name */}
            <Input
              required
              label="Title"
              placeholder="Enter the event's name"
              className={`rounded-lg h-[60px] !transition-none ${
                error.name === null
                  ? ""
                  : error.name === ""
                  ? inputState.success
                  : inputState.err
              }`}
              value={event.name}
              onChange={handleNameChange}
              err={error.name}
            />

            {/* guest list */}
            <InputWithDropdown
              label="Guest List"
              required
              handleGet={handleGetGuestSuggestList}
              placeholder="Invite guest"
              onSelect={handleGuestSelect}
              loadMore={handleLoadmoreGuestList}
              fieldToDisplay="username"
              icon={<BiUser />}
              clearInputAfterSelect="true"
            />
          </form>
        </Wrapper>

        {/* right */}
        <Wrapper className="">
          {/* location */}
          <InputWithDropdown
            label="Location"
            required
            handleGet={handleGetLocationSuggestList}
            placeholder="Select location"
            onSelect={handlePlaceSelect}
            loadMore={handleLoadmoreSuggestList}
            fieldToDisplay="name"
            icon={<GoLocation />}
          />
        </Wrapper>
      </Wrapper>

      <Error
        fluid
        className={`${submitErr.length > 0 ? "visible" : "invisible"}`}
      >
        <Wrapper col="true">
          {submitErr.map((msg) => {
            return <p key={msg}>{msg}</p>;
          })}
        </Wrapper>
      </Error>
    </Screen>
  );
};

export default CreateEventScreen;
