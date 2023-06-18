import Input from '@/components/form/Input'
import React, { useState } from 'react'
import search from '@/assets/search.svg'
const SearchBar = ({onChange, className, wrapperClassName}) => {
  const [value, setValue] = useState()
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onChange(value)
    }
  };
  return (
    <div className={`w-full ${wrapperClassName}`}>
        <Input
            placeholder="Search"
            className={`bg-neutral-100 border-none ${className}`}
            icon={search}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={handleKeyPress}
        />
    </div>
  )
}

export default SearchBar