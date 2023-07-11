import Screen from "@/components/container/Screen";
import SubNavbar from "@/components/navbar/SubNavbar";
import Button from "@/components/button/Button";
import PlaceCard from "@/components/card/PlaceCard";
import Image from "@/components/image/Image";
import Heading from "@/components/typography/Heading";
import Wrapper from "@/components/wrapper/Wrapper";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import itineraryApi from "@/api/itineraryApi";
import { useParams } from "react-router-dom";
import add from "@/assets/add.svg";
import Popup from "@/components/popup/Popup";
import AutoCompleteScreen from "@/test/AutoComplete";
import { AiOutlineClose } from "react-icons/ai";
import Description from "@/components/form/Description";
import SearchBar from "@/components/search/SearchBar";
import { GoLocation } from "react-icons/go";
import InputWithDropdown from "@/components/form/InputWithDropdown";
import eventApi from "@/api/eventApi";
import Error from "@/components/form/Error";
import { toast } from "react-hot-toast";
import Loading from "@/components/loading/Loading";

const ItineraryDetailsScreen = () => {
  const { user } = useSelector((state) => state.user);
  const [itinerary, setItinerary] = useState();
  const [locations, setLocations] = useState([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedSuggestLocation, setSelectedSuggestLocation] = useState();
  const [isUpdating, setIsUpdating] = useState(false);

  // const [hideSuggestions, setHideSuggestions] = useState(true)
  const [note, setNote] = useState("");
  const [suggestNextCursor, setSuggestNextCursor] = useState();
  const [submitErr, setSubmitErr] = useState()
  const { id } = useParams();

  const notifyCreate = () => toast.success("Successfully create!");

  const notifyDelete = () => toast.success("Successfully delete!");

  const notifyUpdate= () => toast.success("Successfully update!");

  useEffect(() => {
    const getDetails = async () => {
      const response = await itineraryApi.getItineraryDetails(id);
      setItinerary(response.data);
      setLocations([...response.data.savedLocations]);
      console.log(response);
    };
    getDetails();
  }, [id, isUpdating]);

  const handleSaveLocation = () => {
    if (!selectedSuggestLocation) {
      setSubmitErr("Please enter a location!")
      return;
    }
    console.log({
      itineraryId: id,
      locationId: selectedSuggestLocation._id,
      note: note
    })
    setIsUpdating(true)
    const handleCreate = async() => {
      const response = await itineraryApi.saveLocation({
        itineraryId: id,
        locationId: selectedSuggestLocation._id,
        note: note
      }, setSubmitErr)
      // if (submitErr) return
      console.log(response)
      if(response.response.status === 400){
        setSubmitErr(response.response.data.message)
        setIsUpdating(false)
        return
      }
      notifyCreate()
      // setLocations((prev) => [...prev, response.data])
      setSelectedSuggestLocation()
      setNote("")
      setIsUpdating(false)
      setShowCreatePopup(false)
    }
    handleCreate()
  };
  
  const handleEditItinerary = () => {
    if (!selectedSuggestLocation) {
      setSubmitErr("Please enter a location!")
      return;
    }
    console.log({
      itineraryId: id,
      // locationId: selectedSuggestLocation._id,
      note: note
    })
    setIsUpdating(true)

    const handleUpdate = async() => {
      const response = await itineraryApi.updateSavedLocation({
        // itineraryId: id,
        itineraryLocationId: selectedSuggestLocation._id,
        note: note
      }, setSubmitErr)
      notifyUpdate()
      setSelectedSuggestLocation()
      setNote("")
      setIsUpdating(false)
      setShowEditPopup(false)
    }
    handleUpdate()
  };

  const closePopup = () => {
    setShowCreatePopup(false);
    setShowEditPopup(false)
    setShowDeletePopup(false)
    setSelectedSuggestLocation()
    setNote("")
    setSubmitErr()
  };

  

  const handleGetLocationSuggestList = (text) => {
    const apiHandler = async () => {
      const response = await eventApi.getSuggestLocation(text);
      setSuggestNextCursor(response.data.next_cursor);
      return response.data;
    };

    return apiHandler();
  };

  const handlePlaceSelect = (location) => {
    // navigate(`/location/details/${location._id}`)
    // setHideSuggestions(true)
    setSelectedSuggestLocation(location);
  };

  const handleLoadmoreSuggestList = (text) => {
    const apiHandler = async () => {
      if (suggestNextCursor === null) return null;
      const response = await eventApi.getSuggestLocation(
        text,
        suggestNextCursor
      );
      setSuggestNextCursor(response.data.next_cursor);
      return response.data;
    };

    return apiHandler();
  };

  const handleDeleteLocation = () => {
    const handleDelete = async () => {
      const response = await itineraryApi.deleteSavedLocation(
        selectedSuggestLocation._id,
        notifyDelete
      );
      console.log(response);
      const newList = locations.filter(item => item._id !== selectedSuggestLocation._id )
      localStorage.setItem("itineraryLocation", JSON.stringify(newList))
      setLocations(newList);
      
      setShowDeletePopup(false);
      
      // navigate("/profile");
    };

    handleDelete();
  }
  return (
    <Screen className="flex flex-col  px-3 py-4 gap-6 md:gap-4 md:px-6 md:py-5 !rounded-none lg:px-20 !min-h-0">
      <SubNavbar user={user} wrapperClassName="!gap-0" />
      <Wrapper className="md:justify-between md:items-center items-start gap-4">
        <Heading className="!text-[28px] truncate">{itinerary?.name}</Heading>
        <Button
          onClick={() => {
            // navigate("/create-location");
            // console.log(locations);
            setShowCreatePopup(true);
          }}
          active
          className="md:!w-[280px] md:hover:opacity-70 md:!rounded-2xl flex justify-evenly gap-2 h-[60px] !rounded-full !fixed md:!static z-[4000] right-4 !w-fit  bottom-4 !bg-secondary-400 md:!bg-primary-400 md:!border-primary-400 border-secondary-400"
        >
          <Image
            imageClassName=""
            src={add}
            alt="add"
            className="w-[28px] h-[28px]"
          />
          <Heading className="md:block text-white hidden !text-[20px]">
            Save a new location
          </Heading>
        </Button>
      </Wrapper>
      {!isUpdating ?
      locations?.length > 0 ? (
        <Wrapper
          // _ref={tabRef}
          col="true"
          className="md:gap-8 gap-6 h-auto"
        >
          {locations.map((location) => {
            return (
              <PlaceCard
                key={location._id}
                place={location}
                description={location?.note}
                className=""
                setShowDeletePopup={setShowDeletePopup}
                setShowEditPopup={setShowEditPopup}
                setSelectedLocation={setSelectedSuggestLocation}
                setNote={setNote}
              />
            );
          })}
        </Wrapper>
      ) : (
        <Wrapper>
          <Heading>No locations yet!</Heading>
        </Wrapper>
      ) : (
        <Wrapper className="justify-center items-center">
          <Loading />
        </Wrapper>
      )}
      {(showCreatePopup || showEditPopup) && (
        <Popup
          onClose={() => {
            closePopup()
          }}
          actions={[
            {
              title: "cancel",
              danger: true,
              buttonClassName:
                "!bg-white border-primary-400 border !text-primary-400 hover:!bg-danger hover:!border-danger hover:opacity-100 hover:!text-white",
              action: closePopup,
            },
            {
              title: "Save",
              danger: true,
              buttonClassName:
                "!bg-primary-400 !border-primary-400 border hover:opacity-70",
              action: showCreatePopup
                ? handleSaveLocation
                : handleEditItinerary,
            },
          ]}
          // title="Search location"
          children={
            <>
              <Heading className="text-center !text-[28px]">
                {showCreatePopup ? "Save location" : "Edit location"}
              </Heading>
              <Wrapper col="true" className="!w-full">
                <InputWithDropdown
                  label="Location:"
                  handleGet={handleGetLocationSuggestList}
                  placeholder="Select location"
                  onSelect={handlePlaceSelect}
                  loadMore={handleLoadmoreSuggestList}
                  // hideSuggestions={hideSuggestions}
                  // onChange={() => setHideSuggestions(false)}
                  searchQuery={selectedSuggestLocation?.location?.name}
                  fieldToDisplay="name"
                  subFieldToDisplay="address"
                  icon={<GoLocation />}
                  inputClassName="!h-[60px] !rounded-2xl !ring-black"
                  wrapperClassName=""
                  hideError
                  dropdownClassName="!z-[8500]"
                />
                <Description
                  counter
                  maxWordCount={500}
                  label="Note:"
                  onChange={(e) => {
                    if (e.target.value.length > 500) return 
                    setNote(e.target.value)

                  }}
                  value={note}
                  placeholder="Enter the description..."
                  wrapperClassName="!my-0 "
                  textareaClassName="!rounded-2xl"
                />
              </Wrapper>

              <Error fluid className={`${!submitErr && "invisible" }`}>{submitErr}</Error>
              <Button
                className="!absolute top-0 right-0 !bg-transparent !rounded-none !border-none !my-0"
                onClick={() => {
                  closePopup()
                }}
              >
                <AiOutlineClose className="text-[32px]  text-black " />
              </Button>
            </>
          }
          className={` px-4 sm:px-12 `}
          formClassName="items-center !h-auto w-full !rounded-none md:!py-2 md:!px-4 md:!rounded-lg relative"
          titleClassName="text-[20px]"
          childrenClassName="!mt-0 w-full"
          // setShowPopup={setShowAutoComplete}
        />
      )}
      {showDeletePopup && (
        <Popup
          title="Are you sure to remove this location?"
          onClose={() => setShowDeletePopup(false)}
          actions={[
            {
              title: "cancel",
              danger: false,
              action: () => setShowDeletePopup(false),
            },
            {
              title: "delete",
              danger: true,
              action: handleDeleteLocation,
            },
          ]}
        />
      )}
    </Screen>
  );
};

export default ItineraryDetailsScreen;
