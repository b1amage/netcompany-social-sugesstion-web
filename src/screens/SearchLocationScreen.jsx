import Screen from '@/components/container/Screen'
import SubNavbar from '@/components/navbar/SubNavbar'

import React from 'react'
import { useSelector } from 'react-redux';

const SearchLocationScreen = () => {
    const { user } = useSelector((state) => state.user);

  return (
    <Screen>
        <SubNavbar user={user}/>
    </Screen>
  )
}

export default SearchLocationScreen