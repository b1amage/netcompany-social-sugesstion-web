import Button from "@/components/button/Button";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Wrapper from "@/components/wrapper/Wrapper";
import Popup from "@/components/popup/Popup";
import React, { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const ItineraryCard = ({ name, numberOfLocations, createdAt }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const deleteLocation = () => {
    const handleDelete = async () => {
      console.log("Delete!");
      // setShowDeletePopup(false);
      // setDeleting(true);
      // const response = await locationApi.deleteLocation(
      //   locationDetails._id,
      //   notifyDelete
      // );
      // console.log(response);
      // setDeleting(false);
      // navigate("/profile");
    };

    handleDelete();
  };
  return (
    <>
      <Wrapper className=" cursor-pointer hover:-translate-y-2 md:hover:-translate-y-4 duration-300 border hover:ring-1 hover:ring-primary-300 border-primary-400 bg-neutral-300 rounded-2xl justify-around items-center px-4 py-6 gap-8">
        <Wrapper col="true" className="w-full truncate">
          <Heading className="break-words text-[16px] md:!text-[20px]">{name}</Heading>
          <Heading className="!text-[14px] md:!text-[16px]">Locations: {numberOfLocations}</Heading>
          <SubHeading className="!text-[12px] !text-neutral-600 md:!text-[14px]">Created at: {createdAt}</SubHeading>
        </Wrapper>
        {/* <Wrapper> */}
        <Wrapper className="!w-fit">
          <Button
            onClick={() => {
              // navigate(`/location/edit/${id}`);
            }}
            className="!bg-primary-400 !bg-opacity-40 !text-primary-400 !text-x !h-fit"
          >
            <BsFillPencilFill />
          </Button>
          <Button
            onClick={() => setShowDeletePopup(true)}
            className="!bg-danger !bg-opacity-40 !text-danger !text-xl !h-fit"
          >
            <MdDelete />
          </Button>
        </Wrapper>
        {/* </Wrapper> */}
      </Wrapper>
      {showDeletePopup && (
        <Popup
          title="Are you sure to delete this location?"
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
              action: deleteLocation,
            },
          ]}
        />
      )}
    </>
  );
};

export default ItineraryCard;
