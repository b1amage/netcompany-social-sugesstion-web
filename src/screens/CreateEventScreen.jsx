import Screen from "@/components/container/Screen";
import Wrapper from "@/components/wrapper/Wrapper";
import Heading from "@/components/typography/Heading";
import { useState, useEffect, useMemo } from "react";
import SubHeading from "@/components/typography/SubHeading";
import Input from "@/components/form/Input";
import Error from "@/components/form/Error";

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

  // check every change of event
  useEffect(() => {
    console.log(`Event change: ${JSON.stringify(event, null, 2)}`);
  }, [event]);

  const inputState = {
    success: "!ring-green-500 !border-green-500",
    err: "!ring-danger !border-danger",
  };

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
          <form>
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

            {/* location */}
          </form>
        </Wrapper>

        {/* right */}
        <Wrapper className="bg-red-300"></Wrapper>
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
