import React, {useState} from 'react'
import Portal from "@/components/HOC/Portal";
import Image from '@/components/image/Image';

const User = ({isCol, user, src}) => {
  const [isShowImage, setIsShowImage] = useState(false)
  const handleShowImage = () => {
    setIsShowImage(true)
  }
  const handleCloseImage = () => {
    setIsShowImage(false)
  }
  return (
    <div className={`${isCol && 'flex-col text-center'} w-fit flex items-center cursor-pointer`}>
        <Image src={src} alt='avatar' className='w-[60px] h-[60px] !rounded-full' onClick={handleShowImage}/>
        <div className='px-4 flex flex-col'>
            <h1 className='font-bold text-lg'>{user.name}</h1>
            <p className='text-md'>{user.email}</p>
        </div>

        {isShowImage && <Portal location='html' >
          <div className="bg-black absolute inset-0" onClick={handleCloseImage}>   
          </div>
          <Image src={src} alt='avatar' className='max-w-full h-screen object-contain fixed top-0 transform translate-x-1/2 z-50'/>
        </Portal>}
    </div>
  )
}

export default User