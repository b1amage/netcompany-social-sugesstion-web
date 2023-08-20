import Screen from "@/components/container/Screen";
import Wrapper from "@/components/wrapper/Wrapper";
import Heading from "@/components/typography/Heading";
import { useState, useEffect, useMemo, useLayoutEffect } from "react";
import SubHeading from "@/components/typography/SubHeading";
import Input from "@/components/form/Input";
import Error from "@/components/form/Error";
import InputWithDropdown from "@/components/form/InputWithDropdown";
import inputState from "@/constants/inputState";
import eventApi from "@/api/eventApi";
import { GoLocation } from "react-icons/go";
import { BiUser } from "react-icons/bi";
import Image from "@/components/image/Image";
import Portal from "@/components/HOC/Portal";
import { useRef } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Text from "@/components/typography/Text";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import TextArea from "@/components/form/TextArea";
import DatePicker from "@/components/form/DatePicker";
import { DateTime } from "luxon";
import Switch from "@/components/form/Switch";
import TimePicker from "@/components/form/TimePicker";
import Button from "@/components/button/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ImageUpload from "@/components/form/ImageUpload";
import Label from "@/components/form/Label";
import { convertDateTime } from "@/helpers/dateTimeHelpers";

import {
  isEndTimeAfterStartTime,
  calculateDuration,
  isDateToday,
  isInvalidTime,
} from "@/helpers/dateTimeHelpers.js";
import {
  defaultCreateEventError,
  defaultCreateEventForm,
} from "@/constants/event";
import locationApi from "@/api/locationApi";

const CreateEventScreen = () => {
  const defaultEvent = useMemo(() => defaultCreateEventForm, []);
  const defaultEventError = useMemo(() => defaultCreateEventError, []);

  const [submitErr, setSubmitErr] = useState([]);
  const [event, setEvent] = useState(defaultEvent);
  const [error, setError] = useState(defaultEventError);
  const [suggestNextCursor, setSuggestNextCursor] = useState(undefined);
  const [guestNextCursor, setGuestNextCursor] = useState(undefined);
  const [showGuestPortal, setShowGuestPortal] = useState(false);
  const [name, setName] = useState(null);
  const [hideSuggest, setHideSuggest] = useState(true);

  const navigate = useNavigate();
  const popupRef = useRef();
  useOnClickOutside(popupRef, () => setShowGuestPortal(false));

  useEffect(() => {
    if (localStorage.getItem("eventCreate")) {
      const newEvent = JSON.parse(localStorage.getItem("eventCreate"));
      setEvent(newEvent);
    }

    if (localStorage.getItem("createLocationName")) {
      const newName = JSON.parse(localStorage.getItem("createLocationName"));
      console.log("new Name", newName);
      setName(newName);
    }
  }, []);

  // check every change of event
  useEffect(() => {
    console.log(`Event change: ${JSON.stringify(event, null, 2)}`);
    console.log(`Error change: ${JSON.stringify(error, null, 2)}`);

    localStorage.setItem("eventCreate", JSON.stringify(event, null, 2));
  }, [event, error]);

  useEffect(() => {
    console.log(`name: ${name}`);
  }, [name]);

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
    console.log(location);
    const newEvent = { ...event, locationId: location._id };
    setEvent(newEvent);
    setName(location.name);
    setError({ ...error, locationId: null });

    localStorage.setItem("createLocationName", JSON.stringify(location.name));
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
    // check if exist
    const alreadyExist = event.guests.some((item) => item._id === guest._id);
    if (alreadyExist) {
      toast.error("Cannot add one guest twice!");
      return;
    }

    const newGuests = [...event.guests, guest];
    const newEvent = { ...event, guests: newGuests };
    setEvent(newEvent);
    setError({ ...error, guests: null });
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

  const handleDescriptionChange = (e) => {
    setEvent({ ...event, description: e.target.value });
  };

  const handleDateChange = (e) => {
    let chosenDate = new Date(e.target.value);
    let today = new Date();

    // Remove the time part of both dates for a fair comparison
    chosenDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (chosenDate < today) {
      setError({ ...error, startDate: "Cannot choose past day!" });
      return;
    }

    const luxonDateTime = DateTime.fromJSDate(chosenDate);
    const newStartDate = luxonDateTime.toISO();
    setEvent({ ...event, startDate: newStartDate });
    setError({ ...error, startDate: "" });

    if (error.startTime || error.endTime) {
      setError({ ...error, startDate: "", startTime: null, endTime: null });
      setEvent({
        ...event,
        startDate: newStartDate,
        startTime: { hours: null, minutes: null },
        endTime: { hours: null, minutes: null },
      });
    }
  };

  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(":");
    if (!event.startDate) {
      setError({ ...error, startTime: "Choose a date first" });
      setEvent({
        ...event,
        startTime: { hours: hours, minutes: minutes },
        duration: null,
      });
      return;
    }

    if (isDateToday(event.startDate) && isInvalidTime(e.target.value)) {
      setError({ ...error, startTime: "Cannot choose time from past!" });
      setEvent({
        ...event,
        startTime: { hours: hours, minutes: minutes },
        duration: null,
      });
      return;
    }

    if (
      event.endTime.hours &&
      !isEndTimeAfterStartTime(
        e.target.value,
        `${event.endTime?.hours}:${event.endTime?.minutes}`
      )
    ) {
      setEvent({
        ...event,
        startTime: { hours: hours, minutes: minutes },
        duration: null,
      });

      setError({
        ...error,
        startTime: "Invalid start time",
      });
      return;
    }

    // const [hours, minutes] = e.target.value.split(":");

    let duration;

    if (event.startTime.hours && event.endTime.hours) {
      duration = calculateDuration(
        e.target.value,
        `${event.endTime.hours}:${event.endTime.minutes}`
      );
    }
    setEvent({
      ...event,
      startTime: { hours: hours * 1, minutes: minutes * 1 },
      duration,
    });

    setError({ ...error, startTime: "" });
  };

  const handleEndTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(":");
    if (!event.startDate) {
      setEvent({
        ...event,
        endTime: { hours: hours, minutes: minutes },
        duration: null,
      });
      setError({ ...error, endTime: "Choose a date first" });
      return;
    }

    if (!event.startTime) {
      setEvent({
        ...event,
        endTime: { hours: hours, minutes: minutes },
        duration: null,
      });
      setError({ ...error, endTime: "Choose a start time first" });
      return;
    }

    if (isDateToday(event.startDate) && isInvalidTime(e.target.value)) {
      setEvent({
        ...event,
        endTime: { hours: hours, minutes: minutes },
        duration: null,
      });
      setError({ ...error, endTime: "Cannot choose time from past!" });
      return;
    }

    if (
      !isEndTimeAfterStartTime(
        `${event.startTime.hours}:${event.startTime.minutes}`,
        e.target.value
      )
    ) {
      setEvent({
        ...event,
        endTime: { hours: hours, minutes: minutes },
        duration: null,
      });
      setError({
        ...error,
        endTime: "Invalid endtime",
      });
      return;
    }

    const duration = calculateDuration(
      `${event.startTime.hours}:${event.startTime.minutes}`,
      e.target.value
    );

    setEvent({
      ...event,
      endTime: { hours: hours * 1, minutes: minutes * 1 },
      duration,
    });

    setError({ ...error, endTime: "", startTime: "" });
  };

  const handleSubmit = () => {
    console.log(event);
    const apiHandle = async () => {
      // check

      const newError = {};
      if (event.name.length === 0 || !event.name) {
        // setError({ ...error, name: "Cannot be null" });
        newError.name = "Cannot be null";
        // return;
      }

      if (event.guests.length === 0) {
        // setError({ ...error, guests: "Must be at least 1 guest" });
        newError.guests = "Must be at least 1 guest";
        // return;
      }

      if (event.locationId.length === 0 || !event.locationId) {
        // setError({ ...error, locationId: "Cannot be null" });
        newError.locationId = "Cannot be null";

        // return;
      }

      if (!event.startDate) {
        // setError({ ...error, startDate: "Cannot be null" });
        newError.startDate = "Cannot be null";

        // return;
      }

      if (
        !event.allDay &&
        (!event.startTime.hours || !event.startTime.minutes)
      ) {
        // setError({ ...error, startTime: "Cannot be null" });
        newError.startTime = "Cannot be null";

        // return;
      }

      if (!event.allDay && (!event.endTime.hours || !event.endTime.minutes)) {
        // setError({ ...error, startTime: "Cannot be null" });
        newError.endTime = "Cannot be null";

        // return;
      }

      if (JSON.stringify(newError) !== "{}") {
        setError({ ...error, ...newError });
        return;
      }

      const newGuests = event.guests.map((guest) => guest._id);
      const newEvent = { ...event, guests: newGuests };
      const imageUrls =
        localStorage.getItem("eventCreateImages") !== "undefined" &&
        localStorage.getItem("eventCreateImages") !== "null" &&
        localStorage.getItem("eventCreateImages")
          ? JSON.parse(localStorage.getItem("eventCreateImages"))
          : [];

      newEvent.imageUrls = imageUrls;
      setEvent(newEvent);

      const response = await eventApi.createEvent(newEvent);

      // success
      if (response.status === 200) {
        toast.success("Successfully create event!");
        setEvent(defaultEvent);
        localStorage.removeItem("eventCreateImages");
        localStorage.removeItem("eventCreate");
        localStorage.removeItem("createLocationName");
        navigate("/events");
      }
    };

    apiHandle();
  };

  useLayoutEffect(() => {
    localStorage.removeItem("eventCreateImages");
  }, []);

  return (
    <Screen className="relative p-5">
      {/* popup guest */}
      {showGuestPortal && (
        <Portal>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-[9999] flex-center">
            <Wrapper
              _ref={popupRef}
              className="h-[450px] w-[400px] max-w-[95vw] drop-shadow-xl bg-white rounded-xl p-5 items-center"
              col="true"
            >
              <Wrapper className="py-4 !border-b-2 border-b-neutral-600 w-full">
                <Heading className="!text-center w-full">Guest List</Heading>
              </Wrapper>

              <div
                // ref={likedListRef}
                onScroll={() => {}}
                className="flex flex-1 w-full overflow-scroll flex-center"
              >
                {
                  <Wrapper
                    className={`self-start flex-1 w-full my-2 justify-self-start ${
                      event.guests.length === 0 &&
                      "!justify-center !items-center !self-center"
                    }`}
                    col="true"
                  >
                    {event.guests.length === 0 ? (
                      <Wrapper className="self-center justify-self-center">
                        <Text className="text-center">No guests on list</Text>
                      </Wrapper>
                    ) : (
                      event.guests.map((guest) => (
                        <Wrapper
                          className="relative items-center justify-between my-1 cursor-pointer"
                          onClick={() => navigate(`/user/${guest._id}`)}
                        >
                          <AiFillDelete
                            id={guest._id}
                            className="absolute text-lg text-red-500 top-2 right-3 hover:text-danger"
                            onClick={(e) => {
                              e.stopPropagation();
                              const newGuests = event.guests.filter(
                                (item) => item._id !== guest._id
                              );
                              console.log("new guest", newGuests);
                              setEvent({ ...event, guests: newGuests });
                            }}
                          />
                          <Wrapper className="items-center !gap-5">
                            <Image
                              className="w-[50px] h-[50px] !rounded-full"
                              src={guest.imageUrl}
                            />
                            <Wrapper col="true">
                              <Heading>{guest.username}</Heading>
                              <Text>{guest.email}</Text>
                            </Wrapper>
                          </Wrapper>
                        </Wrapper>
                      ))
                    )}
                  </Wrapper>
                }
              </div>
            </Wrapper>
          </div>
        </Portal>
      )}

      {/* headings */}
      <Wrapper
        col="true"
        className="items-center justify-center w-full pb-10 border-b border-b-neutral-100"
      >
        <Heading>Add New Event</Heading>
        <SubHeading>Let &lsquo;s create your own event</SubHeading>
      </Wrapper>

      <Wrapper
        col="true"
        className="w-full gap-4 p-5 my-10 rounded-lg bg-slate-200 max-w-[600px] mx-auto"
      >
        {/* left */}
        <Wrapper col="true">
          <form className="flex flex-col gap-4">
            {/* name */}
            <Input
              required
              label="Name"
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
            <Wrapper col="true">
              <InputWithDropdown
                inputClassName={error.guests && inputState.err}
                label="Guest List"
                required
                handleGet={handleGetGuestSuggestList}
                placeholder="Invite guest"
                onSelect={handleGuestSelect}
                loadMore={handleLoadmoreGuestList}
                fieldToDisplay="username"
                icon={<BiUser />}
                clearInputAfterSelect="true"
                subFieldToDisplay="email"
                setHideSuggestions
              />
              {error.guests && <Error fluid>{error.guests}</Error>}
              {event.guests.length > 0 && (
                <Wrapper
                  onClick={() => setShowGuestPortal(true)}
                  className="relative !inline-flex my-2 group cursor-pointer w-fit"
                >
                  {event.guests.map((guest, index) => {
                    if (index > 2) return;
                    return (
                      <Image
                        key={index}
                        className={`w-10 h-10 !rounded-full shadow-2xl transition-all border border-primary-400 group-hover:brightness-75 ${
                          index === 1 && "-translate-x-[80%] z-10 "
                        } ${index === 2 && "-translate-x-[160%]"} z-20`}
                        src={guest?.imageUrl}
                      />
                    );
                  })}

                  {event.guests.length > 3 && (
                    <Wrapper className="w-10 h-10 rounded-full shadow-2xl transition-all flex-center bg-neutral-200 -translate-x-[240%] z-30 group-hover:brightness-75">
                      <Heading>{event.guests.length - 3}+</Heading>
                    </Wrapper>
                  )}
                </Wrapper>
              )}
            </Wrapper>

            <TextArea
              value={event.description}
              placeholder="Description"
              label="Description"
              onChange={handleDescriptionChange}
            />
          </form>
        </Wrapper>

        {/* right */}
        <Wrapper className="gap-4" col="true">
          {/* location */}
          <Wrapper col="true" className="!w-full !gap-1">
            <Wrapper className="!flex-col md:items-center md:!flex-row">
              <InputWithDropdown
                onChange={() => setHideSuggest(false)}
                defaultValue={
                  localStorage.getItem("createLocationName")
                    ? JSON.parse(localStorage.getItem("createLocationName"))
                    : null
                }
                hideSuggestions={hideSuggest}
                inputClassName={error.locationId && inputState.err}
                label="Location"
                required
                handleGet={handleGetLocationSuggestList}
                placeholder="Select location"
                onSelect={handlePlaceSelect}
                loadMore={handleLoadmoreSuggestList}
                fieldToDisplay="name"
                subFieldToDisplay="address"
                icon={<GoLocation />}
              />
            </Wrapper>
            {error.locationId && <Error fluid>{error.locationId}</Error>}
            <Text
              className="font-bold underline cursor-pointer !text-xs md:w-[200px] gap-1 flex items-center mt-2"
              onClick={() => navigate("/create-location")}
            >
              <AiOutlinePlusCircle />
              <span> Create new location</span>
            </Text>
          </Wrapper>

          <Wrapper className="!flex-col lg:flex-row">
            {/* date */}
            <DatePicker
              defaultValue={convertDateTime(event.startDate)[0]}
              err={error.startDate}
              required
              label="Date"
              onChange={handleDateChange}
              className={`${
                error.startDate === null
                  ? ""
                  : error.startDate === ""
                  ? inputState.success
                  : inputState.err
              }`}
            />
            {!event.allDay && (
              <Wrapper col="true" className="justify-start w-full">
                {/* startTime */}
                <Wrapper className="items-center">
                  <Wrapper col="true">
                    <Wrapper>
                      <TimePicker
                        // err={error.startTime}
                        defaultValue={`${
                          event.startTime.hours !== null &&
                          event.startTime.hours.toString().padStart(2, "0")
                        }:${
                          event.startTime.minutes !== null &&
                          event.startTime.minutes.toString().padStart(2, "0")
                        }`}
                        className={`!w-[120px] md:!w-[140px] ${
                          error.startTime === null
                            ? ""
                            : error.startTime === ""
                            ? inputState.success
                            : inputState.err
                        }`}
                        label="Start time"
                        required
                        onChange={handleTimeChange}
                      />
                      {/* duration */}
                      <TimePicker
                        // err={error.endTime}
                        defaultValue={`${
                          event.endTime.hours !== null &&
                          event.endTime.hours.toString().padStart(2, "0")
                        }:${
                          event.endTime.minutes !== null &&
                          event.endTime.minutes.toString().padStart(2, "0")
                        }`}
                        className={`!w-[120px] md:!w-[140px] ${
                          error.endTime === null
                            ? ""
                            : error.endTime === ""
                            ? inputState.success
                            : inputState.err
                        }`}
                        label="End time"
                        required
                        onChange={handleEndTimeChange}
                      />
                    </Wrapper>

                    {(error.startTime || error.endTime) && (
                      <Error fluid="true">
                        {error.startTime || error.endTime}
                      </Error>
                    )}
                  </Wrapper>
                </Wrapper>

                {(event.duration?.hours || event.duration?.minutes) && (
                  <Wrapper col="true" className="gap-1 md:gap-2 lg:gap-3">
                    <Text className="flex items-center gap-2 text-black">
                      <Text className="font-bold">Duration:</Text>
                      <Text>
                        {event.duration.hours}h : {event.duration.minutes}m
                      </Text>
                    </Text>
                  </Wrapper>
                )}
              </Wrapper>
            )}
          </Wrapper>

          {/* isAllDay */}
          <Switch
            label="All day"
            checked={event.allDay}
            onClick={() => {
              const oldAllDay = event.allDay;

              if (oldAllDay) {
                setEvent({
                  ...event,
                  allDay: !oldAllDay,
                  startTime: {
                    hours: null,
                    minutes: null,
                  },
                  endTime: {
                    hours: null,
                    minutes: null,
                  },
                  duration: {
                    hours: null,
                    minutes: null,
                  },
                });

                setError({
                  ...error,
                  startTime: null,
                  endTime: null,
                });
              } else {
                setEvent({
                  ...event,
                  allDay: !oldAllDay,
                  startTime: {
                    hours: 0,
                    minutes: 0,
                  },
                  endTime: {
                    hours: 0,
                    minutes: 0,
                  },
                  duration: {
                    hours: 0,
                    minutes: 0,
                  },
                });
              }
            }}
          />

          <Wrapper col="true">
            <Label>Event image(s)</Label>
            <ImageUpload />
          </Wrapper>
        </Wrapper>
        <Button onClick={handleSubmit} primary active>
          Create Event
        </Button>
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
