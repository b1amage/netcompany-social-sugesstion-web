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
import { useDispatch, useSelector } from "react-redux";
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
import { changeLocation } from "@/features/locationSlice";
import { FaRegCommentDots } from "react-icons/fa";
import Input from "@/components/form/Input";
import send from "@/assets/send.svg";
import TextArea from "@/components/form/TextArea";
import commentApi from "@/api/commentApi";
import User from "@/components/user/User";
import { AiOutlineClose } from "react-icons/ai";

const DetailsScreen = () => {
  const notifyDelete = () => toast.success("Successfully delete!");
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  const commentRef = useRef();
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
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [onReset, setOnReset] = useState(false)
  const [commentsNextCursor, setCommentsNextCursor] = useState()
  const [selectedComment, setSelectedComment] = useState()
  const [showComment, setShowComment] = useState(false)
  const [showDeleteCommentPopup, setShowDeleteCommentPopup] = useState(false)
  const [showEditCommentPopup, setShowEditCommentPopup] = useState(false)
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
  const commentsRef = useRef();

  useEffect(() => {
    const getLocationDetails = async () => {
      setLoading(true);
      const response = await locationApi.getLocationDetails(id, navigate);
      localStorage.setItem("locationDetails", JSON.stringify(response.data));
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

  useEffect(() => {
    const getComments = async() => {
      const response = await commentApi.getCommentsOfLocation(id);
      localStorage.setItem("comments", JSON.stringify(response.data.results))
      setComments(response.data.results)
      localStorage.setItem("commentsNextCursor", response.data.next_cursor)
      setCommentsNextCursor(response.data.next_cursor)
      console.log(response)
    }
    getComments()
  }, [])

  const loadMoreData = async (nextCursor) => {
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    if (now - lastFetch < 1000) return;
    if (nextCursor === null) return;
    
    setLastFetch(now);
    const response = await commentApi.getCommentsOfLocation(id,
      nextCursor
    );
    const newComments = [
      ...JSON.parse(localStorage.getItem("comments")),
      ...response.data.results,
    ];
    localStorage.setItem("comments", JSON.stringify(newComments))
    setComments((prev) => [...prev, ...response.data.results]);
    localStorage.setItem("commentsNextCursor", response.data.next_cursor);
    setCommentsNextCursor(response.data.next_cursor);
  };

  useEffect(() => {
    if (!commentsRef.current) return;
    const handleScroll = async () => {
      const { scrollTop, scrollHeight, clientHeight } = commentsRef.current;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 100;
      
      if (isScrolledToBottom) {
        console.log("Scrolled to bottom!");
        const nextCursor = localStorage.getItem("commentsNextCursor");
        if (nextCursor.length > 10) {
          await loadMoreData(nextCursor);
        }
      }
    };

    commentsRef.current.addEventListener("scroll", handleScroll);
    return () => {
      if (commentsRef.current) {
        // Remember to remove event listener when the component is unmounted
        commentsRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadMoreData]);

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

  function formatCurrency(num, currency) {
    let formattedNum;
    switch (currency) {
      case "USD":
        formattedNum =
          "$" +
          Number(num)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        break;
      case "VND":
        formattedNum = parseInt(num)
          .toString()
          .replace(/(\d)(?=(\d{3})+\b)/g, "$1,");
        break;
      default:
        formattedNum = Number(num)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
    return formattedNum;
  }

  // COMMENTS FUNCTIONS
  const handleThreeDotsClick = (id) => {
    if (selectedComment === id){
      setSelectedComment()
      return
    }
    setSelectedComment(id)
  }

  const handleCloseComment = () => {
    setShowComment(false)
    setShowDeleteCommentPopup(false)
    setSelectedComment()
    setShowEditCommentPopup(false)
    setComment("")
  }

  const handleEditComment = () => {
    const editComment = async() =>{
      const response = await commentApi.updateComment({commentId: selectedComment, content: comment})
      console.log(response)
      setComments((prev) => 
      {
        return prev.map((comment) =>
          comment._id === response.data._id ? {user: user, ...response.data} : comment
        );
      }
      );
      setSelectedComment()
      setShowEditCommentPopup(false)
    }
    editComment()
  }

  const handleDeleteComment = (id) => {
    const deleteComment = async() => {
      await commentApi.deleteComment(id)
      const newList = comments.filter(comment => comment._id !== id)
      setComments(newList)
      localStorage.setItem("comments", JSON.stringify(newList))
      setSelectedComment()
      setShowDeleteCommentPopup(false)
    }
    deleteComment()
  }
  const handleAddComment = (e) => {
    console.log(comment.includes("\n"))
    if (comment.trim() === "" || !comment) return;
    setOnReset(true)
    
    const postComment = async () => {
      const response = await commentApi.createComment({locationId: id, content: comment})
      console.log(response)
      setComments((prev) => [
      { user: user, ...response.data },
      ...prev,
    ]);
      setComment("")
      commentRef.current.value = ""
      commentRef.current.blur();
      setShowComment(false)
    }
    postComment()
    // setOnReset(false)
  };

  useEffect(() => {
    if(onReset){
      commentsRef.current.scrollTop = 0
    }
  }, [onReset])
  return (
    <Screen className="flex flex-col gap-5 px-3 py-4 !mb-2 lg:gap-10 md:px-6 md:py-5 lg:px-20">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Wrapper col="true" className="">
            {deleting && (
              <Portal>
                <Wrapper className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-[9999] flex-center">
                  <Deleting />
                </Wrapper>
              </Portal>
            )}

            <Wrapper className="items-center justify-between">
              <Wrapper
                className="items-center my-2 !gap-2 truncate"
                onClick={() =>
                  navigate(
                    user._id === locationDetails.user._id
                      ? `/profile`
                      : `/user/${locationDetails.user._id}`
                  )
                }
              >
                <Image
                  className="w-[60px] h-[60px] !rounded-full"
                  src={locationDetails?.user?.imageUrl}
                />
                <Wrapper col="true" className="truncate">
                  <Heading className="text-lg w-fit truncate">{locationDetails?.user?.username}</Heading>
                  <Text className="text-md sm:!text-[16px] truncate">{locationDetails?.user?.email}</Text>
                </Wrapper>
              </Wrapper>
              {/* <User user={locationDetails?.user} src={locationDetails?.user?.imageUrl} /> */}
              {locationDetails.userId === user._id && (
                <Wrapper className="">
                  <Button
                    onClick={() => {
                      navigate(`/location/edit/${id}`);
                    }}
                    className="!bg-primary-400 !bg-opacity-40 !text-primary-400 !text-sm sm:!text-xl !p-2 sm:!py-3 sm:!px-4"
                  >
                    <BsFillPencilFill />
                  </Button>
                  <Button
                    onClick={() => setShowDeletePopup(true)}
                    className="!bg-danger !bg-opacity-40 !text-danger !text-sm sm:!text-xl !p-2 sm:!py-3 sm:!px-4"
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

            <Wrapper col="true" className="flex-1">
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
                    {formatCurrency(
                      locationDetails?.pricePerPerson?.min,
                      locationDetails?.pricePerPerson?.currency
                    )}{" "}
                    -{" "}
                    {formatCurrency(
                      locationDetails?.pricePerPerson?.max,
                      locationDetails?.pricePerPerson?.currency
                    )}{" "}
                    ({locationDetails?.pricePerPerson?.currency})
                  </SubHeading>
                )}
              </Wrapper>

              <Heading>{locationDetails?.name}</Heading>
              <Wrapper className="items-center">
                <GoLocation />
                <SubHeading>{locationDetails?.address}</SubHeading>
              </Wrapper>

              <Wrapper col="true">
                {locationDetails?.description.split("\n").map((item, index) => (
                  <Text key={index}>{item}</Text>
                ))}
              </Wrapper>

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

              <Wrapper col="true" className="flex-1 my-4 !gap-4">
                {/* Like + Save */}
                <Wrapper className="!gap-2 pb-4 border-b border-b-neutral-200 w-full items-center">
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
                    className="cursor-pointer"
                    onClick={() => setShowLikedUsers(true)}
                  >
                    {likedCount}
                  </Text>

                  <Wrapper className="!gap-2 items-center px-4 cursor-pointer">
                    <FaRegCommentDots className="text-lg" />
                    <Text
                      className=""
                      onClick={() => setShowComment(true)}
                    >
                      Write comments
                    </Text>
                  </Wrapper>
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
                              setLikedUserNextCursor(response.data.next_cursor);

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
                              {likedUsers.map((_user) => (
                                <Wrapper
                                  key={_user.email}
                                  className="items-center my-3 !gap-2 cursor-pointer"
                                  onClick={() =>
                                    navigate(
                                      _user._id === user._id
                                        ? `/profile`
                                        : `/user/${_user._id}`
                                    )
                                  }
                                >
                                  <Image
                                    className="w-[50px] h-[50px] !rounded-full"
                                    src={_user.imageUrl}
                                  />
                                  <Wrapper col="true">
                                    <Heading className="!text-sm">
                                      {_user.username}
                                    </Heading>
                                    <Text className="!text-xs">
                                      {_user.email}
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
                <Wrapper _ref={commentsRef} col="true" className="max-h-[200px] sm:max-h-[400px] pr-2 !gap-10 overflow-y-auto">
                  {comments.length > 0 ? (
                    comments.map((comment, index) => {
                      return <CommentCard key={index} currentUser={user} user={comment.user} comment={comment} onDelete={() => setShowDeleteCommentPopup(true)} onEdit={() => {
                        setShowEditCommentPopup(true)
                        setComment(comment.content)
                      }} onThreeDotsClick={handleThreeDotsClick} selectedComment={selectedComment}/>;
                    })
                  ) : (
                    <Heading>
                      {" "}
                      Become the first person comment in this location
                    </Heading>
                  )}
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </>
      )}

      {(showComment || showEditCommentPopup) && <Popup
          onClose={() => {
            // closePopup();
            handleCloseComment()
          }}
          actions={[
            {
              title: "cancel",
              danger: true,
              buttonClassName:
                "!bg-white border-primary-400 border !text-primary-400 hover:!bg-danger hover:!border-danger hover:opacity-100 hover:!text-white",
              action: handleCloseComment,
            },
            {
              title: "Post",
              danger: true,
              buttonClassName:
                "!bg-primary-400 !border-primary-400 border hover:opacity-70",
              action: !showEditCommentPopup ? handleAddComment : handleEditComment,
            },
          ]}
          // title="Search location"
          children={
            <>
              <Heading className="text-center !text-[28px]">
                {showEditCommentPopup ? "Edit comment" :"Write comment"}
              </Heading>

              <Wrapper className="rounded-lg items-end w-full">
                  <TextArea
                    placeholder="Write your comment..."
                    className="!py-4 !px-3 focus:!ring-0 max-h-[150px] !h-[150px] w-full"
                    type="text"
                    value={comment}
                    _ref={commentRef}
                    icon={send}
                    onChange={(e) => {
                        setComment(e.target.value)
                        // console.log(e.target.value)
                        setOnReset(false)
                      }
                    }
                    rows={5}
                    wrapperClassName="w-full !gap-0"
                    onReset={onReset}
                  />
                
                </Wrapper>

              {/* <Error fluid className={`${!submitErr && "invisible"}`}>
                {submitErr}
              </Error> */}
              <Button
                className="!absolute top-0 right-0 !bg-transparent !rounded-none !border-none !my-0"
                onClick={() => {
                  // handleCancelEdit();
                  handleCloseComment()
                }}
              >
                <AiOutlineClose className="text-[32px]  text-black " />
              </Button>
            </>
          }
          className={` px-4 sm:px-12 `}
          formClassName="items-center !h-auto w-full !rounded-none md:!py-2 md:!px-4 md:!rounded-lg relative"
          titleClassName="text-[20px]"
          childrenClassName="!mt-0 w-full"
        />}
        {showDeleteCommentPopup && (
              <Popup
                title="Are you sure to remove this comment?"
                onClose={() => handleCloseComment()}
                actions={[
                  {
                    title: "cancel",
                    danger: false,
                    action: () => handleCloseComment(),
                  },
                  {
                    title: "delete",
                    danger: true,
                    action: () => handleDeleteComment(selectedComment),
                  },
                ]}
              />
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
