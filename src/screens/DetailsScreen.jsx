import Screen from "@/components/container/Screen";
import React, { useEffect, useState } from "react";
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

const DetailsScreen = ({ event }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [locationDetails, setLocationDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    const getLocationDetails = async () => {
      setLoading(true);
      const response = await locationApi.getLocationDetails(id);
      setLocationDetails(response.data);
      setLiked(response.data.likedByUser);
      setLoading(false);
    };

    getLocationDetails();
  }, []);

  const handleLikeClick = () => {
    const handleLikeOrUnlike = async () => {
      if (!liked) {
        console.log("call like");
        await locationApi.like(id);
        setLiked((prev) => !prev);
      } else {
        console.log("call unlike");
        await locationApi.unlike(id);
        setLiked((prev) => !prev);
      }
    };

    handleLikeOrUnlike();
  };

  return (
    <Screen className="xl:!grid xl:grid-cols-2 xl:gap-10 pb-4 xl:pb-10 py-2">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {" "}
          <Image
            className="hidden xl:flex"
            src="https://images.unsplash.com/photo-1579487785973-74d2ca7abdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80"
          />
          <Wrapper col="true">
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

            <Wrapper col="true" className="flex-1 px-3 py-2">
              <Heading>{locationDetails?.name}</Heading>
              <Text>{locationDetails?.description}</Text>

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
                  <Wrapper className="!gap-5 pb-5 border-b border-b-neutral-200 w-full">
                    {liked ? (
                      <BsFillHeartFill
                        className="text-lg text-secondary-400"
                        onClick={handleLikeClick}
                      />
                    ) : (
                      <BsHeart className="text-lg" onClick={handleLikeClick} />
                    )}

                    <BsBookmark className="text-lg" />
                  </Wrapper>

                  {/* Comment */}
                  <Wrapper col="true" className="h-[300px] overflow-y-auto">
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
