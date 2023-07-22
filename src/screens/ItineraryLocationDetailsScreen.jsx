import Screen from "@/components/container/Screen";
import SubNavbar from "@/components/navbar/SubNavbar";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Image from "@/components/image/Image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Wrapper from "@/components/wrapper/Wrapper";
import Label from "@/components/form/Label";
import Button from "@/components/button/Button";
import { BsFillPencilFill } from "react-icons/bs";
import Popup from "@/components/popup/Popup";
import itineraryApi from "@/api/itineraryApi";
import { toast } from "react-hot-toast";
import Description from "@/components/form/Description";
import { AiOutlineClose } from "react-icons/ai";
import Error from "@/components/form/Error";
import { DEFAULT } from "@/constants/defaultData";

const ItineraryLocationDetailsScreen = () => {
  const notifyUpdate = () => toast.success("Successfully update!");

  const place = useLocation();
  const { user } = useSelector((state) => state.user);
  const [note, setNote] = useState(place.state.location.note);
  const [submitErr, setSubmitErr] = useState();
  const {id} = useParams()
  const [showEditPopup, setShowEditPopup] = useState(false);
  const navigate = useNavigate()

  // const closePopup = () => {
  //   setShowEditPopup(false);
  //   setSubmitErr();
  // };

  const handleCancelEdit = () => {
    setNote(place.state.location.note)
    setShowEditPopup(false);
    setSubmitErr();
  };

  const handleEditLocationNote = () => {
    const handleUpdate = async () => {
      // setIsUpdating(true);
      await itineraryApi.updateSavedLocation(
        {
          // itineraryId: id,
          itineraryLocationId: id,
          note: note,
        },
        setSubmitErr,
        navigate,
        notifyUpdate
      );
      // setNote("");
      // setIsUpdating(false);
      // setShowEditPopup(false);
    };
    handleUpdate();
  };
  return (
    <Screen className="flex flex-col  px-3 py-4 gap-6 md:gap-4 md:px-6 md:py-5 !rounded-none lg:px-20 !min-h-0">
      <SubNavbar user={user} />
      <Heading className="!text-[32px]">
        {place.state.location.location.name}
      </Heading>
      <Wrapper col="true" className="sm:flex-row !gap-4">
        <Image src={place.state.location.location.imageUrls[0] || DEFAULT.location} className="h-[300px] sm:h-auto w-full" />
        <Wrapper col="true" className="w-full gap-4">
          <Heading className="!px-0 !text-[28px] items-center flex gap-2 justify-between">
            Description
            <Button
              onClick={() => {
                setShowEditPopup(true)
                console.log("Edit!");
              }}
              className="!bg-primary-400 !bg-opacity-40 !text-primary-400 !text-xl !h-fit !my-0"
            >
              <BsFillPencilFill className="text-sm" />
            </Button>
          </Heading>
          <SubHeading className="break-words">{place.state.location.note}</SubHeading>
        </Wrapper>
      </Wrapper>
      
      {showEditPopup && <Popup
          onClose={() => {
            // closePopup();
          }}
          actions={[
            {
              title: "cancel",
              danger: true,
              buttonClassName:
                "!bg-white border-primary-400 border !text-primary-400 hover:!bg-danger hover:!border-danger hover:opacity-100 hover:!text-white",
              action: handleCancelEdit,
            },
            {
              title: "Save",
              danger: true,
              buttonClassName:
                "!bg-primary-400 !border-primary-400 border hover:opacity-70",
              action: handleEditLocationNote,
            },
          ]}
          // title="Search location"
          children={
            <>
              <Heading className="text-center !text-[28px]">
                {"Edit note"}
              </Heading>
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
              

              <Error fluid className={`${!submitErr && "invisible"}`}>
                {submitErr}
              </Error>
              <Button
                className="!absolute top-0 right-0 !bg-transparent !rounded-none !border-none !my-0"
                onClick={() => {
                  handleCancelEdit();
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
        />}
    </Screen>
  );
};

export default ItineraryLocationDetailsScreen;
