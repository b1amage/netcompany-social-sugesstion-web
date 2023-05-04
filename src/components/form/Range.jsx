import Slider from "react-input-slider";
import Label from "./Label";

const Range = ({ min, max, onChange, x, label, required }) => {
  return (
    <div className={`flex flex-col ${label && "gap-1 md:gap-2 lg:gap-3"}`}>
      <Label required={required}>{label}</Label>
      <Slider
        className="distance-slider"
        xmax={max}
        xmin={min}
        x={x}
        onChange={onChange}
        styles={{
          width: "100%",
          track: {
            backgroundColor: "#F2F2F6",
          },
          active: {
            backgroundColor: "#0E1F42",
          },
          thumb: {
            width: 12,
            height: 12,
          },
          disabled: {
            opacity: 0.5,
          },
        }}
      />
    </div>
  );
};

export default Range;
