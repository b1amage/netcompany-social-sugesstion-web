import Slider from "react-input-slider";
import Label from "./Label";
import Note from "@/components/note/Note";

const Range = ({
  min,
  max,
  onChange,
  x,
  label,
  required,
  isHint,
  labelClassName,
  src
}) => {
  return (
    <div className={`flex flex-col ${label && "gap-1 md:gap-2 lg:gap-3"}`}>
      <Label required={required} className={labelClassName}>
        {label}{" "}
        {isHint && (
          <Note src={src} description="If you do not filter by distance, the list will be filtered depending
          on your default search distance" />
        )}{" "}
      </Label>
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
            width: 16,
            height: 16,
            border: "4px solid #5CBCA9",
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
