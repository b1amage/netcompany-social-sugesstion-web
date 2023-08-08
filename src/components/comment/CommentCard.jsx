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
import Button from "@/components/button/Button";
import { MdDelete } from "react-icons/md";
import commentApi from "@/api/commentApi";
import { toast } from "react-hot-toast";
// import commentApi from "api/commentApi";

const CommentCard = ({
  user,
  currentUser,
  comment,
  onDelete,
  onEdit,
  onThreeDotsClick,
  selectedComment,
  notifyErr,
  onReply
}) => {
  const [likeComment, setLikeComment] = useState(comment.likedByUser ? true : false);
  const [likeCommentCount, setLikeCommentCount] = useState(comment?.heartCount)
  const [lastFetch, setLastFetch] = useState(Date.now())
  const handleLikeComment = (id) => {
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    if (now - lastFetch < 2000) return;
    setLastFetch(now);

    const likeOrUnlikeComment = async () => {
      if (!likeComment) {
        console.log("call like");
        // await locationApi.like(id);
        const response = await commentApi.likeComment(id)
        if (response.status !== 200){
          notifyErr("This comment does not exist!")
          return
        }
        setLikeComment((prev) => !prev);
        setLikeCommentCount((prev) => prev + 1);
      } else {
        console.log("call unlike");
        const response = await commentApi.unLikeComment(id)
        if (response.status !== 200){
          notifyErr("This comment does not exist!")
          return
        }
        // await locationApi.unlike(id);
        setLikeComment((prev) => !prev);
        setLikeCommentCount((prev) => prev - 1);
      }
    };
    likeOrUnlikeComment();
  };
  return (
    <Wrapper col="true" className="relative rounded-2xl !gap-2">
      <Wrapper className="items-center justify-between relative">
        <Wrapper className="items-center truncate">
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

        {currentUser._id === comment.userId && (
          <BsThreeDotsVertical
            className="cursor-pointer !text-[16px] sm:!text-[20px]"
            onClick={() => {
              onThreeDotsClick(comment._id);
            }}
          />
        )}
        {selectedComment === comment._id && (
          <Wrapper
            col="true"
            className="bg-white absolute bottom-0 right-0 !w-fit translate-y-full"
          >
            <Button
              onClick={(e) => {
                onEdit();
              }}
              className="!bg-primary-400 text-[12px] sm:text-[14px] flex gap-2 !justify-start !bg-opacity-40 !text-primary-400 !h-fit !p-2 !my-0"
            >
              <BsFillPencilFill className="" />
              Edit
            </Button>
            <Button
              onClick={() => {
                onDelete();
              }}
              className="!bg-danger text-[12px] sm:text-[14px] flex gap-2 !bg-opacity-40 !justify-start !text-danger !h-fit !p-2 !my-0"
            >
              <MdDelete className="" />
              Delete
            </Button>
          </Wrapper>
        )}
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
            <BsReplyAll className="text-xl" onClick={() => onReply(comment._id)} />
            <Text>{comment?.numOfReplies}</Text>
          </Wrapper>
          <Wrapper className="items-center !gap-2">
            {likeComment ? (
              <BsFillHeartFill
                className="text-lg cursor-pointer text-secondary-400"
                onClick={() => handleLikeComment(comment._id)}
              />
            ) : (
              <BsHeart
                className="text-lg"
                onClick={() => handleLikeComment(comment._id)}
              />
            )}
            <Text>{likeCommentCount}</Text>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default CommentCard;
