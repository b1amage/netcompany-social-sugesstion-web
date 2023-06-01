import Screen from "@/components/container/Screen";
import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import eventList from "@/constants/mockEvents";
import Image from "@/components/image/Image";

const DetailsScreen = ({ event }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const data = event ? eventList[0] : {};
  const images = [
    "https://images.unsplash.com/photo-1685362926801-d97120f56465?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1685461331095-1743eda176f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=958&q=80",
    "https://images.unsplash.com/photo-1615454782617-e69bbd4f2969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2328&q=80",
    "https://images.unsplash.com/photo-1684665742691-ddf2242c1c5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3432&q=80",
    "https://images.unsplash.com/photo-1635087506255-82b7794673ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80",
  ];

  return (
    <Screen>
      <>
        <div className="navigation-wrapper relative h-[350px]">
          <div ref={sliderRef} className="h-full keen-slider">
            {images.map((item, index) => (
              <div
                key={index}
                className="relative keen-slider__slide number-slide1"
              >
                <Image src={item} className="!w-full !h-full !rounded-none" />
                <div className="absolute inset-0 z-40 grad-white"></div>
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
                      (currentSlide === idx && " active !bg-secondary-400")
                    }
                  ></button>
                );
              })}
            </div>
          )}
        </div>
      </>
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
