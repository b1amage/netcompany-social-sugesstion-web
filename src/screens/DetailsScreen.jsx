import Screen from "@/components/container/Screen";
import React, { useRef, useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "@/components/image/Image";
import Wrapper from "@/components/wrapper/Wrapper";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Guess from "@/components/guess/Guess";
import { BsHeart, BsFillHeartFill, BsFillPencilFill } from "react-icons/bs";
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
import Button from "@/components/button/Button";
import { MdDelete } from "react-icons/md";
import Popup from "@/components/popup/Popup";
import Deleting from "@/components/loading/Deleting";
import toast, { Toaster } from "react-hot-toast";
import { GoLocation } from "react-icons/go";

const DetailsScreen = ({ event }) => {
  const notifyDelete = () => toast.success("Successfully delete!");
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
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
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
      const response = await locationApi.getLocationDetails(id, navigate);
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

  const deleteLocation = () => {
    const handleDelete = async () => {
      setShowDeletePopup(false);
      setDeleting(true);
      const response = await locationApi.deleteLocation(
        locationDetails._id,
        notifyDelete
      );
      console.log(response);
      setDeleting(false);
      navigate("/profile");
    };

    handleDelete();
  };

  const popupRef = useRef();
  const onClose = () => setShowLikedUsers(false);
  useOnClickOutside(popupRef, onClose);

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
          <Wrapper col="true" className="px-3">
            {deleting && (
              <Portal>
                <Wrapper className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-[9999] flex-center">
                  <Deleting />
                </Wrapper>
              </Portal>
            )}
            {!event && (
              <Wrapper className="items-center justify-between">
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

                {locationDetails.userId === user._id && (
                  <Wrapper>
                    <Button
                      onClick={() => {}}
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
                        title="Are you sure to delete this location?"
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
                            action: deleteLocation,
                          },
                        ]}
                      />
                    )}
                  </Wrapper>
                )}
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

                  {loaded &&
                    locationDetails.imageUrls.length > 1 &&
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
              <Wrapper className="items-center">
                <GoLocation />
                <SubHeading>{locationDetails?.address}</SubHeading>
              </Wrapper>

              <Text>{locationDetails?.description}</Text>

              <Wrapper className="my-3" col="true">
                <Text>
                  <span className="font-bold">Weekdays: </span>
                  {convertTime(locationDetails.weekday.openTime)} -{" "}
                  {convertTime(locationDetails.weekday.closeTime)}
                </Text>
                {"weekend" in locationDetails &&
                  locationDetails.weekend !== null && (
                    <Text>
                      <span className="font-bold">Weekend: </span>
                      {convertTime(locationDetails.weekend.openTime)} -{" "}
                      {convertTime(locationDetails.weekend.closeTime)}
                    </Text>
                  )}
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

export default DetailsScreen;

// Slider
// Overlay
// Text
// Like Save
// Comments / GuessList
