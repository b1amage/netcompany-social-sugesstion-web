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
import Image from "@/components/image/Image";
import Portal from "@/components/HOC/Portal";
import { useRef } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Text from "@/components/typography/Text";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

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

  const navigate = useNavigate();

  const [submitErr, setSubmitErr] = useState([]);
  const [event, setEvent] = useState(defaultEvent);
  const [error, setError] = useState(defaultEventError);
  const [suggestNextCursor, setSuggestNextCursor] = useState(undefined);
  const [guestNextCursor, setGuestNextCursor] = useState(undefined);
  const [showGuestPortal, setShowGuestPortal] = useState(false);

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
    // check if exist
    const alreadyExist = event.guests.some((item) => item._id === guest._id);
    if (alreadyExist) return;

    const newGuests = [...event.guests, guest];
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

  const popupRef = useRef();
  useOnClickOutside(popupRef, () => setShowGuestPortal(false));

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
            <Wrapper col="true">
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
              {event.guests.length > 0 && (
                <Wrapper
                  onClick={() => setShowGuestPortal(true)}
                  className="relative !inline-flex my-2 group cursor-pointer w-fit"
                >
                  {event.guests.map((guest, index) => {
                    if (index > 2) return;
                    return (
                      <Image
                        className={`w-10 h-10 !rounded-full shadow-2xl transition-all border border-primary-400 group-hover:brightness-75 ${
                          index === 1 && "-translate-x-[80%] z-10 "
                        } ${index === 2 && "-translate-x-[160%]"} z-20`}
                        src={guest.imageUrl}
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
