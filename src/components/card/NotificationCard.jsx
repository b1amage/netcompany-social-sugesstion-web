import Wrapper from '@/components/wrapper/Wrapper'
import Text from '@/components/typography/Text'
import React from 'react'
import { BsFillCircleFill } from 'react-icons/bs'

const NotificationCard = ({notification, onClick}) => {
  return (
    <Wrapper onClick={() => {
        onClick()        
      }
    } className="items-center !gap-4 py-4 px-3 hover:bg-neutral-400/70 duration-300 cursor-pointer">
        <img src={notification.modifier.imageUrl} className="!w-[60px] !h-[60px] !rounded-full" imageClassName=""/>
        <Text className="w-full">{notification.content}</Text>
        {!notification.isSeen && <BsFillCircleFill className='text-primary-400' />}
    </Wrapper>
  )
}

export default NotificationCard