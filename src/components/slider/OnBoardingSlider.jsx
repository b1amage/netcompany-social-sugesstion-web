import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import React, {useState} from "react";
import Arrow from "@/components/onboarding/Arrow";
import Dot from "@/components/onboarding/Dot";
import Slide from "@/components/onboarding/Slide";
import onboardingScreens from "@/constants/onboarding";

const OnBoardingSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="relative">
      <div className="relative h-full navigation-wrapper">
        {/* SLIDES */}
        <div ref={sliderRef} className="h-[500px] keen-slider">
          {onboardingScreens.map((slide) => (
            <Slide 
            className={`!mt-0`} slide={slide} key={slide.heading}></Slide>
          ))}
        </div>

        {/* ARROWS */}
        {/* {loaded && instanceRef.current && (
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
        )} */}
      </div>

      {/* DOTS PAGINATION */}
      {loaded && instanceRef.current && (
        <div className="absolute flex justify-center gap-2 px-2 -translate-y-1/2 dots bottom-2 left-1/2 -translate-x-1/2">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => (
            <Dot
              key={idx}
              onClick={() => {
                instanceRef.current?.moveToIdx(idx);
              }}
              className={`${currentSlide === idx ? "active !bg-secondary-400" : ""} border border-primary-400`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OnBoardingSlider;
