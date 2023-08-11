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
import { Link, useNavigate } from "react-router-dom";
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
  onReply,
  onThreeDotsReplyClick,
}) => {
  const [likeComment, setLikeComment] = useState(
    comment.likedByUser ? true : false
  );
  const [likeCommentCount, setLikeCommentCount] = useState(comment?.heartCount);
  const [lastFetch, setLastFetch] = useState(Date.now());
  const [replies, setReplies] = useState([]);
  const [repliesNextCursor, setRepliesNextCursor] = useState();
  const navigate = useNavigate();
  const handleLikeComment = (id) => {
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    if (now - lastFetch < 2000) return;
    setLastFetch(now);

    const likeOrUnlikeComment = async () => {
      if (!likeComment) {
        console.log("call like");
        // await locationApi.like(id);
        const response = await commentApi.likeComment(id);
        if (response.status !== 200) {
          notifyErr("This comment does not exist!");
          return;
        }
        setLikeComment((prev) => !prev);
        setLikeCommentCount((prev) => prev + 1);
      } else {
        console.log("call unlike");
        const response = await commentApi.unLikeComment(id);
        if (response.status !== 200) {
          notifyErr("This comment does not exist!");
          return;
        }
        // await locationApi.unlike(id);
        setLikeComment((prev) => !prev);
        setLikeCommentCount((prev) => prev - 1);
      }
    };
    likeOrUnlikeComment();
  };
  const handleGetReplies = (comment) => {
    const getReplies = async () => {
      const response = await commentApi.getRepliesOfComment(
        comment._id,
        repliesNextCursor
      );
      if (replies.length === 0) {
        setReplies(response.data.results.reverse());
      } else {
        setReplies((prev) => [...response.data.results.reverse(), ...prev]);
      }
      setRepliesNextCursor(response.data.next_cursor);
    };
    getReplies();
  };
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
          className="items-center truncate"
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
            onClick={() => {
              onThreeDotsClick(comment);
            }}
          />
        )}
        {selectedComment && selectedComment._id === comment._id && (
          <Wrapper
            col="true"
            className="bg-white absolute bottom-0 right-2 !w-fit translate-y-full !gap-0 drop-shadow-lg"
          >
            <Wrapper
              onClick={() => {
                onEdit(comment);
              }}
              className=" cursor-pointer text-[12px] sm:text-[14px] flex gap-2 justify-start text-primary-400 !h-fit !p-2 !my-0 items-center hover:bg-primary-400 hover:text-white duration-300"
            >
              <BsFillPencilFill className="" />
              Edit
            </Wrapper>

            <Wrapper
              onClick={() => {
                onDelete();
              }}
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
                comment.targetUserId === JSON.parse(localStorage.getItem("user"))._id
                  ? `/profile`
                  : `/user/${comment.targetUserId}`
              }
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
              onClick={() => onReply(comment)}
            />
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
                className="text-lg cursor-pointer"
                onClick={() => handleLikeComment(comment._id)}
              />
            )}
            <Text>{likeCommentCount}</Text>
          </Wrapper>
        </Wrapper>

        <Wrapper
          onClick={() => {
            handleGetReplies(comment);
          }}
        >
          <Text>View replies</Text>
        </Wrapper>
        <Wrapper col="true" className="!pl-12">
          {replies.length > 0 &&
            replies.map((reply) => {
              return (
                <CommentCard
                  key={reply._id}
                  currentUser={currentUser}
                  user={reply.user}
                  comment={reply}
                  // onDelete={() => setShowDeleteCommentPopup(true)}
                  // onEdit={handleEditButton}
                  onReply={onReply}
                  onThreeDotsClick={() => onThreeDotsReplyClick(comment)}
                  // selectedComment={selectedComment}
                  // notifyErr={notifyErr}
                  // onThreeDotsReplyClick={handleThreeDotsReplyClick}
                />
              );
            })}
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default CommentCard;
