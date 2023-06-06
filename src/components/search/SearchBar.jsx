import Input from '@/components/form/Input'
import React from 'react'
import search from '@/assets/search.svg'
const SearchBar = () => {
  return (
    <div className='w-full '>
        <Input
            placeholder="Search"
            className="bg-neutral-100 border-none"
            icon={search}
        />
    </div>
  )
}

export default SearchBar