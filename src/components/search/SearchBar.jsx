import Input from "@/components/form/Input";
import React, { useState } from "react";
import search from "@/assets/search.svg";
import Image from "@/components/image/Image";
const SearchBar = ({ onChange, className, wrapperClassName }) => {
  const [value, setValue] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (value.trim() === "") return
      setIsSearching(true);
      setTimeout(() => {
        onChange(value);
        setIsSearching(false);
      }, 2000);
    }
  };
  return (
    <div className={`w-full relative ${wrapperClassName}`}>
      <Input
        placeholder="Search"
        className={`bg-white focus:ring-primary-400 focus:ring-1 border-primary-400 !pr-12 ${className}`}
        // icon={search}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <Image
        src={search}
        alt="search"
        className={`absolute w-[24px] h-[24px] top-1/2 right-4 -translate-y-3 ${
          isSearching && "animate-bounce !top-4"
        }`}
        onClick={() => {
          setIsSearching(true);
          setTimeout(() => {
            onChange(value);
            setIsSearching(false);
          }, 2000);
        }}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
