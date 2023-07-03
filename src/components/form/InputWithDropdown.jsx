import Wrapper from "@/components/wrapper/Wrapper";
import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import Label from "./Label";
import inputState from "@/constants/inputState";
import Error from "./Error";
import Loading from "@/components/loading/Loading";
import Text from "@/components/typography/Text";
import { GoLocation } from "react-icons/go";
import Image from "@/components/image/Image";
import { DEFAULT } from "@/constants/defaultData";
import { DateTime } from "luxon";

const InputWithDropdown = ({
  placeholder,
  onSelect,
  label,
  required,
  handleGet,
  id,
  loadMore,
  fieldToDisplay,
  subFieldToDisplay,
  icon,
  clearInputAfterSelect,
  isForEventSearch,
  hideError,
}) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(false);
  const [err, setErr] = useState(null);
  const [listLoading, setListLoading] = useState(false);
  const listRef = useRef();

  const getSuggestions = debounce(async (input) => {
    if (input) {
      const data = await handleGet(input);
      console.log(data);
      setSuggestions(data.results);
    } else {
      setSuggestions([]);
    }
  }, 500);

  // get suggest list
  useEffect(() => {
    if (input === "") return;
    getSuggestions(input);
  }, [input]);

  // load more
  useEffect(() => {
    const handleScroll = debounce(async () => {
      if (!listRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight;

      if (isScrolledToBottom) {
        console.log("Scrolled to bottom!");
        setListLoading(true);
        const newSuggestions = await loadMore(input);
        if (newSuggestions !== null) {
          const newList = [...suggestions, ...newSuggestions.results];
          setSuggestions(newList);
        }
        setListLoading(false);
      }
    }, 1000);

    if (listRef.current) {
      listRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadMore]);

  const handleSuggestionClick = (suggestion) => {
    setSelected(true);
    setInput(clearInputAfterSelect ? "" : suggestion[fieldToDisplay]);
    setSuggestions([]);
    setErr(null);
    onSelect(suggestion);
  };

  function parseDate(isoString) {
    const [datePart, timePart] = isoString.split("T");
    const [yyyy, mm, dd] = datePart.split("-");
    const [hh, mi] = timePart.split(":");

    return `${dd}/${mm}/${yyyy}, ${hh}:${mi}`;
  }

  return (
    <div className="relative flex flex-col w-full !gap-1 md:!gap-2 lg:!gap-3">
      <Label id={id} required={required}>
        {label}
      </Label>

      {!hideError && err && err !== "" && <Error fluid>{err}</Error>}

      <div className="relative">
        <input
          className={`!w-full px-4 py-3 text-sm duration-300 border rounded-lg outline-none border-primary-400 focus:ring-1 focus:ring-primary-400 md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 text-overflow-ellipsis ${
            selected && inputState.success
          } ${(err !== null) & (err !== "") && inputState.err}`}
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => {
            setSelected(false);
            setInput(e.target.value);
            // if (suggestions.length === 0)
            //   setErr(`No place with name ${input} found in database`);
            if (!selected && !hideError) setErr("Please select!");
          }}
        />

        {!selected && suggestions.length > 0 && (
          <Wrapper
            _ref={listRef}
            col="true"
            className="absolute !z-[9999] bottom-0 left-0 w-full translate-y-full bg-white border pb-8 h-[200px] overflow-y-scroll border-gray-200 rounded shadow-xl cursor-pointer"
          >
            {suggestions.map((suggestion, index) => (
              <Wrapper
                key={index}
                className="items-center justify-between gap-3 px-3 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Wrapper className="items-center">
                  <Image
                    className="!w-10 !h-10 !shrink-0 !rounded-full"
                    src={
                      fieldToDisplay === "name"
                        ? suggestion.imageUrls.length > 0
                          ? suggestion.imageUrls[0]
                          : DEFAULT.location
                        : suggestion.imageUrl || DEFAULT.avatar
                    }
                  />
                  <Wrapper col="true" className="!gap-0">
                    <Text className="!font-bold text-overflow-ellipsis">
                      {suggestion[fieldToDisplay]}
                    </Text>
                    <Text className="!text-xs !text-neutral-500 text-overflow-ellipsis">
                      {subFieldToDisplay === "startDateTime"
                        ? parseDate(suggestion[subFieldToDisplay])
                        : suggestion[subFieldToDisplay]}
                    </Text>
                  </Wrapper>
                </Wrapper>

                {icon}
              </Wrapper>
            ))}

            {listLoading && (
              <Wrapper className="w-full flex-center">
                <Loading />
              </Wrapper>
            )}
          </Wrapper>
        )}
      </div>
    </div>
  );
};

export default InputWithDropdown;
