import Screen from "@/components/container/Screen";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import React, { useState } from "react";
import Arrow from "@/components/onboarding/Arrow";
import Dot from "@/components/onboarding/Dot";
import Slide from "@/components/onboarding/Slide";
import onboardingScreens from "@/constants/onboarding";

const OnboardingScreen = () => {
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

  return (
    <Screen className="!w-screen h-screen max-w-none">
      <>
        <div className="relative h-full navigation-wrapper">
          <div ref={sliderRef} className="h-full keen-slider">
            {onboardingScreens.map((slide) => (
              <Slide slide={slide} key={slide.heading}></Slide>
            ))}
          </div>

          {/* ARROWS */}
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
        </div>

        {/* DOTS PAGINATION */}
        {loaded && instanceRef.current && (
          <div className="absolute flex justify-center gap-2 px-2 -translate-y-1/2 dots bottom-8 left-10">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => (
              <Dot
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={
                  currentSlide === idx ? "active !bg-secondary-400" : ""
                }
              />
            ))}
          </div>
        )}
      </>
    </Screen>
  );
};

export default OnboardingScreen;
