import React from 'react'

const Counter = ({count}) => {
  return (
    <div className='absolute top-0 right-0 w-[20px] h-[20px] text-white bg-secondary-400 rounded-full flex justify-center items-center text-[12px]'>
        {count}
    </div>
  )
}

export default Counter