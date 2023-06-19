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
            className={`bg-white focus:ring-primary-400 focus:ring-1 border-primary-400 ${className}`}
            icon={search}
            onChange={(e) => setValue(e.target.value)}
            onIconClick={() => onChange(value)}
            onKeyPress={handleKeyPress}
        />
    </div>
  )
}

export default SearchBar