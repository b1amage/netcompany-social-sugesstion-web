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
import commentApi from "@/api/commentApi";

const ReplyCard = ({
  currentUser,
  user,
  comment,
  onDelete,
  onEdit,
  onReply,
  onThreeDotsClick,
  selectedComment,
  notifyErr,
  // dropdownRef
}) => {
  const [likeReplyCommentCount, setLikeReplyCommentCount] = useState(
    comment.heartCount
  );
  const [likeReplyComment, setLikeReplyComment] = useState(
    comment.likedByUser ? true : false
  );
  const [lastFetch, setLastFetch] = useState(Date.now());

  const handleLikeReplyComment = (id) => {
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    if (now - lastFetch < 2000) return;
    setLastFetch(now);

    const likeOrUnlikeReplyComment = async () => {
      if (!likeReplyComment) {
        // await locationApi.like(id);
        const response = await commentApi.likeReplyComment(id);
        if (response.status !== 200) {
          notifyErr("This comment does not exist!");
          return;
        }
        setLikeReplyComment((prev) => !prev);
        setLikeReplyCommentCount((prev) => prev + 1);
      } else {
        const response = await commentApi.unLikeReplyComment(id);
        if (response.status !== 200) {
          notifyErr("This comment does not exist!");
          return;
        }
        // await locationApi.unlike(id);
        setLikeReplyComment((prev) => !prev);
        setLikeReplyCommentCount((prev) => prev - 1);
      }
    };
    likeOrUnlikeReplyComment();
  };
  return (
    <Wrapper col="true">
      <Wrapper
        col="true"
        className="relative rounded-2xl !gap-2 border w-fit px-4 py-3"
      >
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
              // _ref={dropdownRef}
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
          <Text className="!text-[12px] sm:!text-[16px] whitespace-pre-line">
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
            {"\t" + comment.content}
          </Text>
        </Wrapper>
      </Wrapper>
      {/* like, unlike, reply */}
      <Wrapper className="items-center !gap-2 px-2">
        <Wrapper className="items-center !gap-2">
          <BsReplyAll className="text-xl cursor-pointer" onClick={onReply} />
        </Wrapper>
        <Wrapper className="items-center !gap-2">
          {likeReplyComment ? (
            <BsFillHeartFill
              className="text-lg cursor-pointer text-secondary-400"
              onClick={() => {
                handleLikeReplyComment(comment._id);
              }}
            />
          ) : (
            <BsHeart
              className="text-lg cursor-pointer"
              onClick={() => {
                handleLikeReplyComment(comment._id);
              }}
            />
          )}
          <Text>{likeReplyCommentCount}</Text>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default ReplyCard;
