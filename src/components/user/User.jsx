import React from 'react'

const User = ({isCol, name, email, src}) => {
  return (
    <div className={`${isCol && 'flex-col text-center'} w-fit flex items-center cursor-pointer`}>
        <img src={src} alt='avatar' className='w-[60px] h-[60px] rounded-full' />
        <div className='px-4 flex flex-col'>
            <h1 className='font-bold text-lg'>{name}</h1>
            <p className='text-md'>{email}</p>
        </div>
    </div>
  )
}

export default User