import Screen from "@/components/container/Screen";
import React, { useRef, useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import eventList from "@/constants/mockEvents";
import Image from "@/components/image/Image";
import Wrapper from "@/components/wrapper/Wrapper";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Guess from "@/components/guess/Guess";
import { BsBookmark, BsHeart, BsFillHeartFill } from "react-icons/bs";
import CommentCard from "@/components/comment/CommentCard";
import { useParams } from "react-router-dom";
import locationApi from "@/api/locationApi";
import LoadingScreen from "./LoadingScreen";
import { useSelector } from "react-redux";
import { DEFAULT } from "@/constants/defaultData";
import Category from "@/components/category/Category";
import SubHeading from "@/components/typography/SubHeading";
import Portal from "@/components/HOC/Portal";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Loading from "@/components/loading/Loading";
import { useNavigate } from "react-router-dom";

const DetailsScreen = ({ event }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [locationDetails, setLocationDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);
  const [likedUsersLoading, setLikedUsersLoading] = useState(false);
  const [showLikedUsers, setShowLikedUsers] = useState(false);
  const [likedUserNextCursor, setLikedUserNextCursor] = useState(undefined);
  const [lastFetch, setLastFetch] = useState(Date.now());
  const [nextLoading, setNextLoading] = useState(false);
  const [likedCount, setLikedCount] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  let likedListRef = useRef();

  useEffect(() => {
    const getLocationDetails = async () => {
      setLoading(true);
      const response = await locationApi.getLocationDetails(id);
      setLocationDetails(response.data);
      setLiked(response.data.likedByUser);
      setLikedCount(response.data.heartCount);
      setLoading(false);
    };

    getLocationDetails();
  }, []);

  useEffect(() => {
    if (!showLikedUsers) return;
    const getLikedUsers = async () => {
      setLikedUsersLoading(true);
      const response = await locationApi.getUserLikedPost(
        locationDetails._id,
        undefined
      );
      console.log(response);
      setLikedUsers(response.data.results);
      setLikedUserNextCursor(response.data.next_cursor);
      setLikedUsersLoading(false);
    };

    getLikedUsers();
  }, [showLikedUsers]);

  useEffect(() => {}, [showLikedUsers]);

  const handleLikeClick = () => {
    const handleLikeOrUnlike = async () => {
      if (!liked) {
        console.log("call like");
        await locationApi.like(id);
        setLiked((prev) => !prev);
        setLikedCount((prev) => prev + 1);
      } else {
        console.log("call unlike");
        await locationApi.unlike(id);
        setLiked((prev) => !prev);
        setLikedCount((prev) => prev - 1);
      }
    };

    handleLikeOrUnlike();
  };

  // useEffect(() => {
  //   console.log("in handleScroll: ", likedListRef.current);

  //   const handleScroll = async () => {
  //     console.log("in handleScroll: ", likedListRef.current);
  //     if (!likedListRef.current) return;
  //     const { scrollTop, scrollHeight, clientHeight } = likedListRef.current;
  //     const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight;

  //     if (isScrolledToBottom) {
  //       console.log("Scrolled to bottom!");
  //       // const nextCursor = localStorage.getItem(
  //       //   activeTabIndex === 0 ? "createdNextCursor" : "likedNextCursor"
  //       // );
  //       // if (nextCursor.length > 10) {
  //       //   await loadMore(nextCursor);
  //       // }
  //     }
  //   };
  //   if (likedListRef.current) {
  //     likedListRef.current.addEventListener("scroll", handleScroll);
  //   }

  //   return () => {
  //     if (likedListRef.current) {
  //       // Remember to remove event listener when the component is unmounted
  //       likedListRef.current.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, [showLikedUsers]);

  const popupRef = useRef();
  const onClose = () => setShowLikedUsers(false);
  useOnClickOutside(popupRef, onClose);
  const navigate = useNavigate();
  function convertTime(str) {
    if (str.length !== 4) {
      throw new Error("Invalid time format. Expected 'HHMM'.");
    }
    return `${str.slice(0, 2)}:${str.slice(2)}`;
  }

  return (
    <Screen className="py-2 pb-4 xl:gap-10 xl:pb-10">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* <Image
            className="hidden xl:flex"
            src="https://images.unsplash.com/photo-1579487785973-74d2ca7abdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80"
          /> */}
          <Wrapper col="true" className="px-3">
            {!event && (
              <Wrapper
                className="items-center my-3 !gap-5"
                onClick={() => navigate(`/user/${locationDetails.user._id}`)}
              >
                <Image
                  className="w-[75px] h-[75px] !rounded-full"
                  src={locationDetails?.user?.imageUrl}
                />
                <Wrapper col="true">
                  <Heading>{locationDetails?.user?.username}</Heading>
                  <Text>{locationDetails?.user?.email}</Text>
                </Wrapper>
              </Wrapper>
            )}

            {locationDetails.imageUrls.length > 0 ? (
              <Wrapper>
                <div className="navigation-wrapper w-full relative h-[350px] md:h-[550px]">
                  <div ref={sliderRef} className="h-full keen-slider">
                    {locationDetails?.imageUrls?.length > 0 &&
                      locationDetails?.imageUrls.map((item, index) => (
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

                  {loaded && instanceRef.current && (
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
                              "rounded-full dot bg-white w-2 h-2" +
                              (currentSlide === idx &&
                                " active !bg-secondary-400")
                            }
                          ></button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Wrapper>
            ) : (
              <Image className="rounded-none" src={DEFAULT.location} />
            )}

            <Wrapper col="true" className="flex-1 px-3 py-2">
              <Wrapper className="items-center justify-between">
                <Category
                  onClick={() => {}}
                  isActive
                  disableHover="true"
                  className="self-start"
                >
                  {locationDetails?.locationCategory}
                </Category>

                {locationDetails?.pricePerPerson && (
                  <SubHeading>
                    {locationDetails?.pricePerPerson?.min} -{" "}
                    {locationDetails?.pricePerPerson?.max} (
                    {locationDetails?.pricePerPerson?.currency})
                  </SubHeading>
                )}
              </Wrapper>

              <Heading>{locationDetails?.name}</Heading>
              <Text>{locationDetails?.description}</Text>

              <Wrapper className="my-3" col="true">
                <Text>
                  <span className="font-bold">Weekdays: </span>
                  {convertTime(locationDetails.weekday.openTime)} -{" "}
                  {convertTime(locationDetails.weekday.closeTime)}
                </Text>
                <Text>
                  <span className="font-bold">Weekend: </span>
                  {convertTime(locationDetails.weekend.openTime)} -{" "}
                  {convertTime(locationDetails.weekend.closeTime)}
                </Text>
              </Wrapper>

              {event ? (
                <Wrapper col="true" className="my-4 mt-auto">
                  <Heading>Guess List</Heading>
                  <Wrapper className="gap-0 overflow-x-scroll lg:gap-8 snap-mandatory snap-x scroll-smooth">
                    {Array(20)
                      .fill(0)
                      .map((item, index) => (
                        <Guess key={index} />
                      ))}
                  </Wrapper>
                </Wrapper>
              ) : (
                <Wrapper col="true" className="flex-1 my-4">
                  {/* Like + Save */}
                  <Wrapper className="!gap-5 pb-5 border-b border-b-neutral-200 w-full items-center">
                    {liked ? (
                      <BsFillHeartFill
                        className="text-lg cursor-pointer text-secondary-400"
                        onClick={handleLikeClick}
                      />
                    ) : (
                      <BsHeart
                        className="text-lg cursor-pointer"
                        onClick={handleLikeClick}
                      />
                    )}

                    <Text
                      className="underline cursor-pointer"
                      onClick={() => setShowLikedUsers(true)}
                    >
                      {likedCount} liked this post
                    </Text>
                  </Wrapper>

                  {showLikedUsers && (
                    <Portal>
                      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-[9999] flex-center">
                        <Wrapper
                          _ref={popupRef}
                          className="h-[450px] w-[400px] max-w-[95vw] drop-shadow-xl bg-white rounded-xl p-5 items-center"
                          col="true"
                        >
                          <Wrapper className="py-4 !border-b-2 border-b-neutral-600 w-full">
                            <Heading className="!text-center w-full">
                              Likes
                            </Heading>
                          </Wrapper>

                          <div
                            ref={likedListRef}
                            onScroll={() => {
                              const loadMore = async () => {
                                const now = Date.now();
                                // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
                                if (now - lastFetch < 1000) return;
                                if (likedUserNextCursor === null) return;
                                setNextLoading(true);
                                const response =
                                  await locationApi.getUserLikedPost(
                                    locationDetails._id,
                                    likedUserNextCursor
                                  );

                                console.log(response);
                                const newLikedList = [
                                  ...likedUsers,
                                  ...response.data.results,
                                ];
                                setLikedUsers(newLikedList);
                                setLikedUserNextCursor(
                                  response.data.next_cursor
                                );

                                setNextLoading(false);
                              };

                              if (
                                likedListRef.current.scrollTop +
                                  likedListRef.current.clientHeight >=
                                likedListRef.current.scrollHeight
                              ) {
                                console.log("Scrolled to bottom!");
                                if (likedUserNextCursor === null) return;
                                // Implement your logic here
                                loadMore();
                              }
                            }}
                            className="flex flex-1 w-full overflow-scroll flex-center"
                          >
                            {likedUsersLoading ? (
                              <Loading />
                            ) : likedUsers.length === 0 ? (
                              <Text>No user like this post</Text>
                            ) : (
                              <Wrapper
                                className="self-start w-full my-2 justify-self-start"
                                col="true"
                              >
                                {likedUsers.map((user) => (
                                  <Wrapper
                                    key={user.email}
                                    className="items-center my-3 !gap-2"
                                    onClick={() =>
                                      navigate(`/user/${user._id}`)
                                    }
                                  >
                                    <Image
                                      className="w-[50px] h-[50px] !rounded-full"
                                      src={user.imageUrl}
                                    />
                                    <Wrapper col="true">
                                      <Heading className="!text-sm">
                                        {user.username}
                                      </Heading>
                                      <Text className="!text-xs">
                                        {user.email}
                                      </Text>
                                    </Wrapper>
                                  </Wrapper>
                                ))}

                                {nextLoading && (
                                  <Wrapper className="my-3 flex-center">
                                    <Loading />
                                  </Wrapper>
                                )}
                              </Wrapper>
                            )}
                          </div>
                        </Wrapper>
                      </div>
                    </Portal>
                  )}

                  {/* Comment */}
                  <Wrapper
                    col="true"
                    className="xl:h-[300px] xl:overflow-y-auto"
                  >
                    <CommentCard />
                    <CommentCard />
                    <CommentCard />
                  </Wrapper>
                </Wrapper>
              )}
            </Wrapper>
          </Wrapper>
        </>
      )}
    </Screen>
  );
};

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled hidden" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow fill-white w-4 h-4 z-50 absolute top-1/2 -translate-y-1/2 ${
        props.left ? "arrow--left left-4" : "arrow--right right-4"
      } ${disabeld}`}
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
  );
}

export default DetailsScreen;

// Slider
// Overlay
// Text
// Like Save
// Comments / GuessList
