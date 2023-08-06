import Screen from "@/components/container/Screen";
import SubNavbar from "@/components/navbar/SubNavbar";
import Button from "@/components/button/Button";
import PlaceCard from "@/components/card/PlaceCard";
import Image from "@/components/image/Image";
import Heading from "@/components/typography/Heading";
import Wrapper from "@/components/wrapper/Wrapper";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import itineraryApi from "@/api/itineraryApi";
import { useParams } from "react-router-dom";
import add from "@/assets/add.svg";
import Popup from "@/components/popup/Popup";
import { AiOutlineClose } from "react-icons/ai";
import Description from "@/components/form/Description";
import { GoLocation } from "react-icons/go";
import InputWithDropdown from "@/components/form/InputWithDropdown";
import eventApi from "@/api/eventApi";
import Error from "@/components/form/Error";
import { toast } from "react-hot-toast";
import Loading from "@/components/loading/Loading";
// import useItineraryDragAndDrop from "@/hooks/useItineraryDragAndDrop";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ItineraryDetailsScreen = () => {
  const CARD_HEIGHT = 1000000000;
  const { user } = useSelector((state) => state.user);
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const [itinerary, setItinerary] = useState();
  const [locations, setLocations] = useState([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [availableErr, setAvailableErr] = useState();
  const [selectedSuggestLocation, setSelectedSuggestLocation] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const [note, setNote] = useState("");
  const [suggestNextCursor, setSuggestNextCursor] = useState();
  const [submitErr, setSubmitErr] = useState("");
  const { id } = useParams();
  
  // const [showFloatButton, setShowFloatButton] = useState(false)

  // const buttonRef = useRef()

  const notifyCreate = () => toast.success("Successfully create!");

  const notifyDelete = () => toast.success("Successfully delete!");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.scrollBehavior="unset"
    const getDetails = async () => {
      const response = await itineraryApi.getItineraryDetails(
        id,
        setAvailableErr
      );
      setItinerary(response.data);
      setLocations([...response.data.savedLocations]);
      localStorage.setItem(
        "itineraryLocations",
        JSON.stringify(response.data.savedLocations)
      );
      setIsLoading(false);
      console.log(response);
    };
    getDetails();
  }, [id, isUpdating]);

  useEffect(() => {
    if (isUpload){
      document.documentElement.scrollTop=document.documentElement.scrollHeight
    }
  }, [isUpload, locations])

  const handleSaveLocation = () => {
    setSubmitErr();
    setIsUpload(false)
    if (!selectedSuggestLocation) {
      setSubmitErr("Please enter a location!");
      return;
    }
    if (
      locations.filter(
        (location) => location?.location?._id === selectedSuggestLocation?._id
      ).length === 1
    ) {
      setSubmitErr("This location has already been added!");
      return;
    }
    console.log({
      itineraryId: id,
      locationId: selectedSuggestLocation._id,
      note: note,
    });
    const handleCreate = async () => {
      setIsUpdating(true);
      const response = await itineraryApi.saveLocation({
        itineraryId: id,
        locationId: selectedSuggestLocation._id,
        note: note,
      });
      console.log(response);
      if (response.status !== 200) {
        setSubmitErr(response.data.message);
        return;
      }
      notifyCreate();
      setSelectedSuggestLocation();
      setNote("");
      setShowCreatePopup(false);
      setIsUpdating(false);
      setIsUpload(true)
    };
    handleCreate();
  };

  const handleDeleteLocation = () => {
    const handleDelete = async () => {
      const response = await itineraryApi.deleteSavedLocation(
        selectedSuggestLocation._id,
        notifyDelete
      );
      console.log(response);
      const newList = locations.filter(
        (item) => item._id !== selectedSuggestLocation._id
      );
      localStorage.setItem("itineraryLocation", JSON.stringify(newList));
      setLocations(newList);
      setSelectedSuggestLocation();
      setNote("");
      setShowDeletePopup(false);
    };

    handleDelete();
  };

  const closePopup = () => {
    setShowCreatePopup(false);
    setShowDeletePopup(false);
    setSelectedSuggestLocation();
    setNote("");
    setSubmitErr();
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
    setHideSuggestions(true);
    setSubmitErr()
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

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const newItems = [...locations];
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);
    setLocations(newItems);
    const updateList = newItems.map(item => item._id)
    // console.log(updateList)
    itineraryApi.updateLocationsOrder({
      itineraryId: id,
      savedLocations: updateList,
    });
  }

  // useEffect(() => {
  //   if (!buttonRef.current) return;
  //   // console.log(buttonRef.current.getBoundingClientRect())
  //   const {height, y} = buttonRef.current.getBoundingClientRect()
  //   const checkScrollTop = () => {
  //     // console.log(document.documentElement.scrollTop);
  //     if(document.documentElement.scrollTop >= y - height){
  //       setShowFloatButton(true)
  //     } else{
  //       setShowFloatButton(false)
  //     }
  //   };
  
  //   window.addEventListener('scroll', checkScrollTop);
  
  //   return () => {
  //     window.removeEventListener('scroll', checkScrollTop);
  //   };

  //   // if (document.documentElement.scrollTop > buttonRef.current.getBoundingClientRect())
  // }, [])

  return (
    <Screen className="flex flex-col !mb-2 px-3 py-4 gap-6 md:gap-4 md:px-6 lg:!mt-[120px] md:py-5 !rounded-none lg:px-20 !min-h-0">
      <DragDropContext onDragStart={() => {}} onDragEnd={handleOnDragEnd}>
        {!availableErr ? (
          <>
            <SubNavbar user={user} wrapperClassName="!gap-0" />
            <Wrapper className="sm:justify-between sm:items-center items-start gap-4">
              <Heading className="!text-[28px] truncate">
                {itinerary?.name}
              </Heading>
              <Button
                // _ref={buttonRef}
                onClick={() => {
                  setShowCreatePopup(true);
                }}
                active
                className={`!my-0 h-[60px] sm:w-[350px] md:w-[280px] flex justify-center gap-2  sm:!rounded-2xl sm:!static sm:!bg-primary-400 sm:!border-primary-400 md:hover:opacity-70 !fixed !rounded-full z-[4000] right-4 bottom-4 border-secondary-400 bg-secondary-400 `}
              >
                <Image
                  imageClassName=""
                  src={add}
                  alt="add"
                  className="w-[28px] h-[28px]"
                />
                <Heading className={` text-white !text-[20px] hidden  sm:block`}>
                  Add new location
                </Heading>
              </Button>
            </Wrapper>
            {!isLoading ? (
              locations?.length > 0 ? (
                <Droppable droppableId="locations">
                  {(provided) => (
                    <ul
                      className="leading-10 list-none sm:max-h-[350px] sm:overflow-y-scroll"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {locations.map((location, index) => {
                        return (
                          <Draggable
                            key={location._id}
                            draggableId={location._id}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                className="mt-4"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <PlaceCard
                                  // _ref={provided.innerRef}
                                  index={index}
                                  provided={provided}
                                  key={location._id}
                                  place={location}
                                  className=""
                                  setShowDeletePopup={setShowDeletePopup}
                                  setSelectedLocation={
                                    setSelectedSuggestLocation
                                  }
                                />
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              ) : (
                <Wrapper>
                  <Heading>No locations yet!</Heading>
                </Wrapper>
              )
            ) : (
              <Wrapper className="justify-center items-center">
                <Loading />
              </Wrapper>
            )}
            {showCreatePopup && (
              <Popup
                onClose={() => {
                  closePopup();
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
                children={
                  <>
                    <Heading className="text-center !text-[28px]">
                      {showCreatePopup ? "Add location" : "Edit location"}
                    </Heading>
                    <Wrapper col="true" className="!w-full">
                      <InputWithDropdown
                        label="Location:"
                        handleGet={handleGetLocationSuggestList}
                        placeholder="Select registered location"
                        onSelect={handlePlaceSelect}
                        loadMore={handleLoadmoreSuggestList}
                        hideSuggestions={hideSuggestions}
                        searchQuery={selectedSuggestLocation?.location?.name}
                        fieldToDisplay="name"
                        onClear={() => {
                          setSubmitErr()
                        }}
                        subFieldToDisplay="address"
                        icon={<GoLocation />}
                        withClearButton="true"
                        inputClassName="!h-[60px] !rounded-2xl !ring-black"
                        wrapperClassName=""
                        hideError
                        dropdownClassName="!z-[8500]"
                        onChange={() => setHideSuggestions(false)}
                      />
                      <Description
                        counter
                        maxWordCount={500}
                        label="Note:"
                        onChange={(e) => {
                          if (e.target.value.length > 500) return;
                          setNote(e.target.value);
                        }}
                        value={note}
                        placeholder="Enter the description..."
                        wrapperClassName="!my-0 "
                        textareaClassName="!rounded-2xl"
                      />
                    </Wrapper>

                    <Error fluid className={`${!submitErr && "invisible"}`}>
                      {submitErr}
                    </Error>
                    <Button
                      className="!absolute top-0 right-0 !bg-transparent !rounded-none !border-none !my-0"
                      onClick={() => {
                        closePopup();
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
          </>
        ) : (
          <Heading>{availableErr}</Heading>
        )}
      </DragDropContext>
    </Screen>
  );
};

export default ItineraryDetailsScreen;
