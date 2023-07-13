import Screen from "@/components/container/Screen";
import ItineraryCard from "@/components/card/ItineraryCard";
import React, { useEffect, useRef, useState } from "react";
import SubNavbar from "@/components/navbar/SubNavbar";
import { useSelector } from "react-redux";
import Wrapper from "@/components/wrapper/Wrapper";
import Heading from "@/components/typography/Heading";
import Button from "@/components/button/Button";
import Image from "@/components/image/Image";
import add from "@/assets/add.svg";
import itineraryApi from "@/api/itineraryApi";
import Popup from "@/components/popup/Popup";
import Input from "@/components/form/Input";
import SubHeading from "@/components/typography/SubHeading";
import { AiOutlineClose } from "react-icons/ai";
import Error from "@/components/form/Error";
import { toast } from "react-hot-toast";

const ItinerariesScreen = () => {
  const { user } = useSelector((state) => state.user);
  const [itineraries, setItineraries] = useState([]);
  const [lastFetch, setLastFetch] = useState();
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const [value, setValue] = useState("");
  const [err, setErr] = useState();
  const tabRef = useRef();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState()
  const [isUpdating, setIsUpdating] = useState(false);

  const notifyCreate = () => toast.success("Successfully create!!");

  const notifyDelete = () => toast.success("Successfully delete!");

  const notifyUpdate= () => toast.success("Successfully update!");

  useEffect(() => {
    const getItineraryList = async () => {
      const response = await itineraryApi.getItineraries();
      // console.log(response)
      setItineraries(response.data.results);
      localStorage.setItem(
        "itineraries",
        JSON.stringify(response.data.results)
      );
      localStorage.setItem(
        "itinerariesNextCursor",
        JSON.stringify(response.data.next_cursor)
      );
    };
    getItineraryList();
  }, [isUpdating]);
  
  const deleteItinerary = () => {
    const handleDelete = async () => {
      console.log("Delete!");
      // setShowDeletePopup(false);
      // setDeleting(true);
      const response = await itineraryApi.deleteItinerary(
        selectedItinerary._id,
        notifyDelete
      );
      console.log(response);
      const newList = itineraries.filter(item => item._id !== selectedItinerary._id )
      localStorage.setItem("itineraries", JSON.stringify(newList))
      setItineraries(newList);
      
      setShowDeletePopup(false);
      
      // navigate("/profile");
    };

    handleDelete();
  };

  const handleCreateItinerary = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      setErr("Please enter the name for itinerary!");
      return;
    }

    setIsUpdating(true)
    const createItinerary = async () => {
      const response = await itineraryApi.createItinerary(
        { name: value },
        setShowCreatePopup
      );
      console.log(response);
      setItineraries((prev) => [response.data, ...prev]);
      notifyCreate();
      setValue("");
      setErr();
      setIsUpdating(false)
    };
    createItinerary();
  };

  const handleEditItinerary = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      setErr("Please enter the name for itinerary!");
      return;
    }
    const editItinerary = async () => {
      const response = await itineraryApi.editItinerary(
        { 
          itineraryId: selectedItinerary._id,
          name: value },
        setShowEditPopup
      );
      console.log(response);
      setItineraries((prev) => 
      {
        return prev.map((item) =>
          item._id === response.data._id ? { ...item, ...response.data } : item
        );
      }
      );
      notifyUpdate();
      setValue("");
      setErr();
    };
    editItinerary();
  };
  const closePopup = () => {
    setShowCreatePopup(false)
    setShowEditPopup(false)
    setValue("")
  };

  const popupActions = [
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
      action: showCreatePopup ? handleCreateItinerary : handleEditItinerary,
    },
  ];

  const handleNameChange = (e) => {
    if (e.target.value.length > 40) return;
    setValue(e.target.value);
  };

  const handleEditOnClick = (itinerary) => {
    setShowEditPopup(true)
    setValue(itinerary.name)
    setSelectedItinerary(itinerary)
  }

  const loadMoreData = async (nextCursor) => {
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    if (now - lastFetch < 500) return;
    if (nextCursor === null) return;
    // setIsLatestUpdating(true);
    setLastFetch(now);

    const response = await itineraryApi.getItineraries(nextCursor);
    let newList = [
      ...JSON.parse(localStorage.getItem("itineraries")),
      ...response.data.results,
    ];
    setItineraries(newList);
    localStorage.setItem("itineraries", JSON.stringify(newList));
    localStorage.setItem("itinerariesNextCursor", JSON.stringify(response.data.next_cursor));
  };
  useEffect(() => {
    if (!tabRef.current) return;
    const handleScroll = async () => {
      const { scrollTop, scrollHeight, clientHeight } = tabRef.current;
      // console.log(scrollTop)
      // console.log(clientHeight)

      // console.log(scrollHeight)
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (isScrolledToBottom) {
        console.log("Scrolled to bottom!");
        const nextCursor = localStorage.getItem("itinerariesNextCursor");
        if (nextCursor.length > 10) {
          await loadMoreData(nextCursor);
        }
      }
    };

    tabRef.current.addEventListener("scroll", handleScroll);
    // console.log(tabRef.current)
    return () => {
      if (tabRef.current) {
        // Remember to remove event listener when the component is unmounted
        tabRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadMoreData]);

  useEffect(() => {
    if (!showCreatePopup || !showEditPopup){
      setErr()
    }
  }, [showCreatePopup, showEditPopup])
  return (
    <Screen className="flex flex-col  px-3 py-4 gap-6 md:gap-4 md:px-6 md:py-5 !rounded-none lg:px-20 !min-h-0  ">
      <SubNavbar user={user} wrapperClassName="!gap-0" />
      <Wrapper className="md:justify-between md:items-center items-start">
        <Heading className="!text-[28px]">My itineraries</Heading>
        <Button
          onClick={() => {
            // navigate("/create-location");
            console.log("Create!");
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
            Create new itinerary
          </Heading>
        </Button>
      </Wrapper>
      {itineraries.length > 0 && (
        <Wrapper
          _ref={tabRef}
          col="true"
          className="md:gap-8 gap-6 overflow-y-scroll pr-3 py-12 !h-[600px] items-center"
        >
          {itineraries.map((itinerary) => {
            return (
              <ItineraryCard
                key={itinerary._id}
                itinerary={itinerary}
                showDeletePopup={showDeletePopup}
                setShowDeletePopup={setShowDeletePopup}
                deleteItinerary={deleteItinerary}
                editItinerary={handleEditOnClick}
                setSelectedItinerary={setSelectedItinerary}
                // name={itinerary.name}
                // numberOfLocations={itinerary.numOfLocations}
                // createdAt={itinerary.createdAt}
              />
            );
          })}
        </Wrapper>
      )}
      {(showCreatePopup || showEditPopup) && (
        <Popup
          onClose={() => {
            closePopup()
          }}
          title={`${showCreatePopup ? "Create new itinerary": "Edit itinerary"}`}
          actions={popupActions}
          children={
            <>
              <Wrapper col="true" className="w-full h-full gap-4 items-center">
                {/* <Heading className="text-center !text-[36px]">Create new itinerary</Heading> */}
                <Wrapper className="!w-full relative">
                  <Input
                    label="Name"
                    labelClassName=""
                    placeholder={`Enter name of the itinerary...`}
                    value={value}
                    onChange={handleNameChange}
                    fluid
                    className="!rounded-lg !px-4"
                    wrapperInputClassName="!w-full"
                  />
                  <SubHeading className="absolute right-0 px-4 !text-[20px] !text-black">
                    {value.length}/40
                  </SubHeading>
                </Wrapper>
                <Error fluid className={`${!err && "invisible"}`}>
                  {err}
                </Error>
              </Wrapper>
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
          className={` items-center !z-[9100] `}
          formClassName=" justify-center !py-6 !px-4 !h-auto"
          // overflow-hidden justify-center items-end md:items-center 2xl:!py-16
          // overflow-y-scroll !h-auto w-full justify-center md:p-0 md:px-2 !rounded-b-none rounded-t-xl md:!rounded-2xl md:py-0
          titleClassName="!text-[30px]"
          childrenClassName="!mt-0 w-full "
          // setShowCreatePopup={setShowAutoComplete}
        />
      )}
      {showDeletePopup && (
        <Popup
          title="Are you sure to delete this itinerary?"
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
              action: deleteItinerary,
            },
          ]}
        />
      )}
    </Screen>
  );
};

export default ItinerariesScreen;
