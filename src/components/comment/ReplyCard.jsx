import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/image/Image";
import React, { useState } from "react";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import {
  BsFillHeartFill,
  BsFillPencilFill,
  BsHeart,
  BsReplyAll,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ReplyCard = ({
  currentUser,
  user,
  comment,
  onDelete,
  onEdit,
  onReply,
  onThreeDotsClick,
likeComment,
  selectedComment,
}) => {
    const [likeCommentCount, setLikeCommentCount] = useState(0)
  return (
    <Wrapper col="true" className="relative rounded-2xl !gap-2">
      <Wrapper className="items-center justify-between relative">
        <Wrapper
          onClick={() => {
            navigate(
              comment.userId === JSON.parse(localStorage.getItem("user"))._id
                ? `/profile`
                : `/user/${comment.userId}`
            );
          }}
          className="items-center truncate cursor-pointer "
        >
          <Image
            imageClassName=""
            className="w-[32px] h-[32px] sm:w-10 sm:h-10 !rounded-full"
            src={user?.imageUrl}
          />

          <Wrapper col="true" className="!gap-0 truncate w-fit">
            <Heading className="w-fit !text-[12px] sm:!text-[16px] truncate">
              {user?.username}
            </Heading>
          </Wrapper>
        </Wrapper>

        {currentUser._id === user._id && (
          <BsThreeDotsVertical
            className="cursor-pointer !text-[16px] sm:!text-[20px]"
            onClick={onThreeDotsClick}
          />
        )}
        {selectedComment && selectedComment._id === comment._id && (
          <Wrapper
            col="true"
            className="bg-white absolute bottom-0 right-2 !w-fit translate-y-full !gap-0 drop-shadow-lg"
          >
            <Wrapper
              onClick={onEdit}
              className=" cursor-pointer text-[12px] sm:text-[14px] flex gap-2 justify-start text-primary-400 !h-fit !p-2 !my-0 items-center hover:bg-primary-400 hover:text-white duration-300"
            >
              <BsFillPencilFill className="" />
              Edit
            </Wrapper>

            <Wrapper
              onClick={onDelete}
              className="cursor-pointer text-[12px] sm:text-[14px] flex gap-2 justify-start text-primary-400 !h-fit !p-2 !my-0 items-center hover:bg-danger hover:text-white duration-300"
            >
              <MdDelete className="" />
              Delete
            </Wrapper>
          </Wrapper>
        )}
      </Wrapper>

      <Wrapper col="true">
        <Wrapper className="w-full">
          {comment.targetUser && (
            <Link
              to={
                comment.targetUserId ===
                JSON.parse(localStorage.getItem("user"))._id
                  ? `/profile`
                  : `/user/${comment.targetUserId}`
              }
              className="!text-secondary-300 font-bold"
            >
              @{comment.targetUser.username}
            </Link>
          )}
          <Text className="!text-[12px] sm:!text-[16px] whitespace-pre-line">
            {/* This such an amazing place that I have ever tried. Thank you for
          recommend this place, Bao! */}
            {comment.content}
          </Text>
        </Wrapper>

        {/* like, unlike, reply */}
        <Wrapper className="items-center !gap-2">
          <Wrapper className="items-center !gap-2">
            <BsReplyAll
              className="text-xl cursor-pointer"
              onClick={onReply}
            />
          </Wrapper>
          <Wrapper className="items-center !gap-2">
            {likeComment ? (
              <BsFillHeartFill
                className="text-lg cursor-pointer text-secondary-400"
                onClick={() => {
                    // handleLikeComment(comment._id)
                }}
              />
            ) : (
              <BsHeart
                className="text-lg cursor-pointer"
                onClick={() => {
                    // handleLikeComment(comment._id)
                }}
              />
            )}
            <Text>{likeCommentCount}</Text>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default ReplyCard;
