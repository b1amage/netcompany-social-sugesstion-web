import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/image/Image";
import React from "react";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import { BsHeart, BsReplyAll, BsThreeDotsVertical } from "react-icons/bs";

const CommentCard = ({ user, currentUser, comment, onDelete, onEdit }) => {
  return (
    <Wrapper col="true" className="relative rounded-2xl !gap-2">
      <Wrapper className="items-center justify-between">
        <Wrapper className="items-center truncate">
          <Image imageClassName="" className="w-[32px] h-[32px] sm:w-10 sm:h-10 !rounded-full" src={user?.imageUrl} />

          <Wrapper col="true" className="!gap-0 truncate w-fit">
            <Heading className="w-fit !text-[12px] sm:!text-[16px] truncate">{user?.username}</Heading>
          </Wrapper>
        </Wrapper>

        {currentUser._id === comment.userId && <BsThreeDotsVertical className="cursor-pointer !text-[16px] sm:!text-[20px]" />}
        {/* <Wrapper className="!w-fit">
          <Button
            onClick={(e) => {
              onEdit()
            }}
            className="!bg-primary-400 !bg-opacity-40 !text-primary-400 !h-fit !p-2 !my-0"
          >
            <BsFillPencilFill className="text-sm" />
          </Button>
          <Button
            onClick={(e) => {
              onDelete()
            }}
            className="!bg-danger !bg-opacity-40 !text-danger !h-fit !p-2 !my-0"
          >
            <MdDelete className="text-sm" />
          </Button>
        </Wrapper> */}
      </Wrapper>

      <Wrapper col="true">
        <Wrapper className="w-full">
          <Text className="!text-[12px] sm:!text-[16px] whitespace-pre-line">
            {/* This such an amazing place that I have ever tried. Thank you for
          recommend this place, Bao! */}
            {comment.content}
          </Text>
        </Wrapper>

        {/* like, unlike, reply */}
        <Wrapper className="items-center !gap-2">
          <Wrapper className="items-center !gap-2">
            <BsReplyAll className="text-xl" />
            <Text>{comment?.numOfReplies}</Text>
          </Wrapper>
          <Wrapper className="items-center !gap-2">
            <BsHeart className="text-lg" />
            <Text>{comment?.heartCount}</Text>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default CommentCard;
