import Screen from '@/components/container/Screen'
import SubNavbar from '@/components/navbar/SubNavbar'
import Button from '@/components/button/Button'
import PlaceCard from '@/components/card/PlaceCard'
import Image from '@/components/image/Image'
import Heading from '@/components/typography/Heading'
import Wrapper from '@/components/wrapper/Wrapper'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import itineraryApi from '@/api/itineraryApi'
import { useParams } from 'react-router-dom'

const ItineraryDetailsScreen = () => {
  const {user} = useSelector(state => state.user)
  const [itinerary, setItinerary] = useState()
  const [locations, setLocations] = useState([])
  const {id} = useParams()

  useEffect(() => {
    const getDetails = async() =>{
      const response = await itineraryApi.getItineraryDetails(id)
      setItinerary(response.data)
      setLocations([...response.data.savedLocations])
      console.log(response)
    }
    getDetails()
  }, [id])

  return (
    <Screen className="flex flex-col  px-3 py-4 gap-6 md:gap-4 md:px-6 md:py-5 !rounded-none lg:px-20 !min-h-0">
      <SubNavbar user={user} wrapperClassName="!gap-0" />
      <Wrapper className="md:justify-between md:items-center items-start">
        <Heading className="!text-[28px]">{itinerary?.name}</Heading>
        <Button
          onClick={() => {
            // navigate("/create-location");
            console.log(locations);
            // setShowCreatePopup(true);
          }}
          active
          className="md:!w-[280px] md:hover:opacity-70 md:!rounded-2xl flex justify-evenly gap-2 h-[60px] !rounded-full !fixed md:!static z-[4000] right-4 !w-fit  bottom-4 !bg-secondary-400 md:!bg-primary-400 md:!border-primary-400 border-secondary-400"
        >
          <Heading className=" text-white !text-[20px]">
            Save a new location
          </Heading>
        </Button>
      </Wrapper>
      {locations?.length > 0 ? (
        <Wrapper
          // _ref={tabRef}
          col="true"
          className="md:gap-8 gap-6 pr-3 py-12"
        >
          {locations.map((location) => {
            return (
              <PlaceCard
                key={location._id}
                place={location?.location}
                description={location?.note}
                className="!w-full !flex-row"
                // key={itinerary._id}
                // itinerary={itinerary}
                // showDeletePopup={showDeletePopup}
                // setShowDeletePopup={setShowDeletePopup}
                // deleteItinerary={deleteItinerary}
                // editItinerary={handleEditOnClick}
                // setSelectedItinerary={setSelectedItinerary}
                // name={itinerary.name}
                // numberOfLocations={itinerary.numOfLocations}
                // createdAt={itinerary.createdAt}
              />
           );
          })}
        </Wrapper>
      ) : (
        <Wrapper>
          <Heading>No locations</Heading>
        </Wrapper>
      )} 
    </Screen>
  )
}

export default ItineraryDetailsScreen