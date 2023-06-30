import Screen from "@/components/container/Screen";
import eventApi from "@/api/eventApi";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/image/Image";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Button from "@/components/button/Button";
import Popup from "@/components/popup/Popup";
import Deleting from "@/components/loading/Deleting";
import SubHeading from "@/components/typography/SubHeading";
import Portal from "@/components/HOC/Portal";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { MdDelete } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { DEFAULT } from "@/constants/defaultData";
import Guess from "@/components/guess/Guess";
import { AiFillCalendar, AiFillClockCircle } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import parse from "html-react-parser";

function convertDateTime(dateTimeString) {
  var date = new Date(dateTimeString);

  var day = ("0" + date.getUTCDate()).slice(-2);
  var month = ("0" + (date.getUTCMonth() + 1)).slice(-2); // Months are zero indexed
  var year = date.getUTCFullYear();

  var hours = ("0" + date.getUTCHours()).slice(-2);
  var minutes = ("0" + date.getUTCMinutes()).slice(-2);

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

const EventDetailsScreen = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  console.log(id);
  // get details
  useEffect(() => {
    const handleApi = async () => {
      setLoading(true);
      const response = await eventApi.getEvent(id);
      setEvent(response.data);
      console.log(response.data.description);
      setLoading(false);
    };
    handleApi();
  }, []);

  const handleDelete = () => {
    const handleApi = async () => {
      console.log("delete");
    };

    handleApi();
  };

  function decode(str) {
    let txt = new DOMParser().parseFromString(str, "text/html");

    return txt.documentElement.textContent;
  }
  return (
    <Screen className="py-2 pb-4 xl:gap-10 xl:pb-10">
      {loading ? (
        <LoadingScreen />
      ) : (
        <Wrapper className="px-3" col="true">
          <Wrapper className="items-center justify-between">
            <Wrapper
              className="items-center my-3 !gap-5"
              onClick={() =>
                navigate(
                  user._id === event.user._id
                    ? `/profile`
                    : `/user/${event.user._id}`
                )
              }
            >
              <Image
                className="w-[75px] h-[75px] !rounded-full"
                src={event?.user?.imageUrl}
              />
              <Wrapper col="true">
                <Heading>{event?.user?.username}</Heading>
                <Text>{event?.user?.email}</Text>
              </Wrapper>
            </Wrapper>

            {event.userId === user._id && (
              <Wrapper>
                <Button
                  onClick={() => {
                    navigate(`/event/edit/${id}`);
                  }}
                  className="!bg-primary-400 !bg-opacity-40 !text-primary-400 !text-xl"
                >
                  <BsFillPencilFill />
                </Button>
                <Button
                  onClick={() => setShowDeletePopup(true)}
                  className="!bg-danger !bg-opacity-40 !text-danger !text-xl"
                >
                  <MdDelete />
                </Button>

                {showDeletePopup && (
                  <Popup
                    title="Are you sure to delete this event?"
                    onClose={() => setShowDeletePopup(false)}
                    actions={[
                      {
                        title: "cancel",
                        danger: false,
                        action: () => setShowDeletePopup(false),
                      },
                      {
                        title: "delete",
                        danger: true,
                        action: handleDelete,
                      },
                    ]}
                  />
                )}
              </Wrapper>
            )}
          </Wrapper>

          {event.imageUrls.length > 0 ? (
            <Wrapper>
              <div className="navigation-wrapper w-full relative h-[350px] md:h-[550px]">
                <div ref={sliderRef} className="h-full keen-slider">
                  {event?.imageUrls?.length > 0 &&
                    event?.imageUrls.map((item, index) => (
                      <div
                        key={index}
                        className="relative keen-slider__slide number-slide1"
                      >
                        <Image
                          src={item}
                          className="!w-full !h-full !rounded-none"
                        />
                        <div className="absolute inset-0 z-40 top-1/2 grad-white"></div>
                      </div>
                    ))}
                </div>
                {loaded && instanceRef.current && (
                  <>
                    <Arrow
                      left
                      onClick={(e) =>
                        e.stopPropagation() || instanceRef.current?.prev()
                      }
                      disabled={currentSlide === 0}
                    />

                    <Arrow
                      onClick={(e) =>
                        e.stopPropagation() || instanceRef.current?.next()
                      }
                      disabled={
                        currentSlide ===
                        instanceRef.current.track.details.slides.length - 1
                      }
                    />
                  </>
                )}

                {loaded &&
                  event.imageUrls.length > 1 &&
                  instanceRef.current && (
                    <div className="absolute bottom-4 !z-50 flex gap-2 left-1/2 -translate-x-1/2 dots">
                      {[
                        ...Array(
                          instanceRef.current.track.details.slides.length
                        ).keys(),
                      ].map((idx) => {
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              instanceRef.current?.moveToIdx(idx);
                            }}
                            className={
                              "!rounded-full dot border border-primary-400 !w-3 !h-3 block" +
                              (currentSlide === idx
                                ? "active !bg-primary-400"
                                : "!bg-black !bg-opacity-50")
                            }
                          ></button>
                        );
                      })}
                    </div>
                  )}
              </div>
            </Wrapper>
          ) : (
            <Image
              className="rounded-none w-full relative h-[350px] md:h-[550px] lg:max-w-[600px] lg:mx-auto"
              src={DEFAULT.event}
            />
          )}

          <Wrapper col="true">
            <Heading>{event.name}</Heading>

            <Wrapper className="justify-between !flex-col lg:!flex-row lg:items-center">
              <Wrapper col="true" className="!gap-0">
                <SubHeading className="flex items-center gap-1">
                  <AiFillCalendar />
                  Start at {convertDateTime(event.startDateTime)}
                </SubHeading>

                <Text className="flex items-center gap-1">
                  <AiFillClockCircle />
                  {event.allDay
                    ? "All Day"
                    : `Duration: ${event.duration.hours} ${
                        event.duration.hours === 1 ? "hour" : "hours"
                      } ${event.duration.minutes} ${
                        event.duration.minutes === 1 ? "minute" : "minutes"
                      }`}
                </Text>
              </Wrapper>
              <Wrapper col="true" className="!gap-0">
                <SubHeading
                  onClick={() => {
                    navigate(
                      event.location.isDeleted
                        ? `/error/This location is no longer exists`
                        : `/location/details/${event.location._id}`
                    );
                  }}
                  className="flex items-center gap-1 font-bold cursor-pointer"
                >
                  <HiLocationMarker />
                  {event.location.name}{" "}
                  {event.location.isDeleted &&
                    "(This location is no longer exist)"}
                </SubHeading>

                <Text className="flex items-center gap-1 underline">
                  <HiLocationMarker />
                  {event.location.address}
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper col="true" className="py-4 border-b border-b-neutral-400">
              {event.description.split("\n").map((item, index) => (
                <Text key={index}>{item}</Text>
              ))}
            </Wrapper>

            <SubHeading>Guest List</SubHeading>
            <Wrapper className="overflow-y-scroll">
              {event.guests.map((item) => (
                <Guess
                  img={item.imageUrl}
                  name={item.username}
                  key={item._id}
                  id={item._id}
                  email={item.email}
                />
              ))}
            </Wrapper>
          </Wrapper>
        </Wrapper>
      )}
    </Screen>
  );
};

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled hidden" : "";
  return (
    <div
      onClick={props.onClick}
      className={`absolute w-10 h-10 z-50 -translate-y-1/2 flex-center top-1/2 bg-opacity-20 bg-black ${
        props.left
          ? "arrow--left left-4 cursor-pointer"
          : "arrow--right right-4 cursor-pointer"
      } ${disabeld}`}
    >
      <svg
        onClick={props.onClick}
        className={`arrow w-4 h-4 fill-white`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    </div>
  );
}

export default EventDetailsScreen;
