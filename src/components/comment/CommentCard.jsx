import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/image/Image";
import React, { useEffect, useRef, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import Popup from "@/components/popup/Popup";
import TextArea from "@/components/form/TextArea";
import { AiOutlineClose } from "react-icons/ai";
import Error from "@/components/form/Error";
import ReplyCard from "./ReplyCard";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const CommentCard = ({
  user,
  currentUser,
  comment,
  onDelete,
  onEdit,
  onThreeDotsClick,
  selectedComment,
  notifyErr,
  onClose,
  commentRef,
  onReply,
  replyComment,
  setReplyComment,
  setSelectedComment,
  handleThreeDotsReplyClick,
  err,
  setErr,
  notifySuccess
}) => {
  const [likeComment, setLikeComment] = useState(
    comment.likedByUser ? true : false
  );
  const [replyCount, setReplyCount] = useState(comment?.numOfReplies)
  const [likeCommentCount, setLikeCommentCount] = useState(comment?.heartCount);
  const [lastFetch, setLastFetch] = useState(Date.now());
  const [replies, setReplies] = useState([]);
  const [repliesNextCursor, setRepliesNextCursor] = useState();
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [showDeleteReplyPopup, setShowDeleteReplyPopup] = useState(false);
  const [showEditReplyPopup, setShowEditReplyPopup] = useState(false);
  const [replyCommentValue, setReplyCommentValue] = useState("")
  const navigate = useNavigate();
  // const dropdownRef = useRef()

  // useOnClickOutside(dropdownRef, () => {
  //   setSelectedComment()
  //   setReplyComment()
  // })

  // REPLY FUNCTIONS
  const onDeleteReplyButtonClick = () => {
    setShowDeleteReplyPopup(true);
  };

  const onEditReplyButtonClick = (comment) => {
    setShowEditReplyPopup(true);
    setReplyCommentValue(comment.content);
  };
  
  const handleAddReplyComment = () => {
    if (replyCommentValue.trim() === "" || !replyCommentValue) {
      setErr("Please enter the comment!");
      return;
    }
    console.log({
      targetCommentId: replyComment.targetCommentId
        ? replyComment.targetCommentId
        : replyComment._id,
      targetUserId: replyComment.user._id,
      content: replyCommentValue,
    });

    // return
    const postReplyComment = async () => {
      const response = await commentApi.createReply(
        {
          targetCommentId: replyComment.targetCommentId
            ? replyComment.targetCommentId
            : replyComment._id,
          targetUserId: replyComment.user._id,
          content: replyCommentValue,
        },
        setErr
      );
      if(response.status !== 200){
        setErr(response.data.message);
        return
      }
      // console.log(response);
      notifySuccess("Successfully post!");
      setReplies((prev) => [
        ...prev,
        { user: currentUser, targetUser: replyComment.user, ...response.data },
      ]);
      commentRef.current.value = "";
      commentRef.current.blur();
      setReplyComment();
      setReplyCommentValue("")
      setReplyCount(replyCount + 1)
      setShowReplyPopup(false);
    };
    postReplyComment();
  };

  const handleDeleteReplyComment = (comment) => {
    const deleteReply = async () => {
      const response = await commentApi.deleteReplyComment(
        comment._id,
        notifyErr
      );
      if (response.status !== 200) {
        setReplyComment();
        setShowDeleteReplyPopup(false);
        return;
      }
      const newList = replies.filter((reply) => reply._id !== comment._id);
      notifySuccess("Successfully delete!");
      setReplies(newList)
      setReplyComment();
      setReplyCount(replyCount - 1)
      setShowDeleteReplyPopup(false);
    };
    deleteReply();
  };

  const handleEditReplyComment = () => {
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    if (now - lastFetch < 2000) return;
    setLastFetch(now);
    if (replyCommentValue.trim() === "" || !replyCommentValue) {
      setErr("Please enter the comment!");
      return;
    }
    console.log({
      replyId: replyComment._id,
      content: replyCommentValue,
    });
    // return
    const editReply = async () => {
      const response = await commentApi.updateReplyComment(
        {
          replyId: replyComment._id,
          content: replyCommentValue,
        },
        setErr
      );
      console.log(response);
      if (response.status !== 200) {
        return;
      }
      notifySuccess("Successfully update!");
      setReplies((prev) => {
        return prev.map((reply) =>
          reply._id === response.data._id
            ? { user: currentUser, targetUser: replyComment.user, ...response.data }
            : reply
        );
      });
      setReplyComment();
      setReplyCommentValue("");
      setShowEditReplyPopup(false);
    };
    editReply();
  };

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
        setReplies((prev) => {
          const existingIds = new Set(prev.map(item => item._id));
          const newResults = response.data.results.reverse().filter(result => !existingIds.has(result._id));
          return [...newResults, ...prev];
        });
      }
      setRepliesNextCursor(response.data.next_cursor);
    };
    getReplies();
  };
  return (
    <>
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
          className="items-center truncate cursor-pointer"
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
        {((selectedComment && selectedComment._id === comment._id)) && (
          <Wrapper
            // _ref={dropdownRef}
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
                comment.targetUserId ===
                JSON.parse(localStorage.getItem("user"))._id
                  ? `/profile`
                  : `/user/${comment.targetUserId}`
              }
            >
              @{comment.targetUser.username}
            </Link>
          )}
          <Text className="!text-[12px] sm:!text-[16px] whitespace-pre-line">
            {comment.content}
          </Text>
        </Wrapper>

        {/* like, unlike, reply */}
        <Wrapper className="items-center !gap-2">
          <Wrapper className="items-center !gap-2">
            <BsReplyAll
              className="text-xl cursor-pointer"
              onClick={() => {
                onReply(comment)
                setShowReplyPopup(true);
              }}
            />
            <Text>{replyCount}</Text>
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

        {(comment.numOfReplies > 0 && repliesNextCursor !== null) && <Wrapper
          onClick={() => {
            handleGetReplies(comment);
          }}
          className="cursor-pointer !w-fit"
        >
          <Text>View replies</Text>
        </Wrapper>}
        
      </Wrapper>
      <Wrapper col="true" className="!pl-12">
          {replies.length > 0 &&
            replies.map((reply) => {
              return (
                <ReplyCard
                  key={reply._id}
                  currentUser={currentUser}
                  user={reply.user}
                  comment={reply}
                  onDelete={onDeleteReplyButtonClick}
                  onEdit={() =>  {
                    onEditReplyButtonClick(reply)
                  }}
                  onClose={onClose}
                  onReply={() => {
                    onReply(reply)
                    setShowReplyPopup(true);
                  }}
                  onThreeDotsClick={() => handleThreeDotsReplyClick(reply)}
                  selectedComment={replyComment}
                  setReplyComment={setReplyComment}
                  notifyErr={notifyErr}
                  // dropdownRef={dropdownRef}
                />
              );
            })}
        </Wrapper>
    </Wrapper>
    {(showEditReplyPopup || showReplyPopup) && (
          <Popup
            onClose={() => {
              onClose();
              setReplyComment();
              setShowReplyPopup(false)
              setShowDeleteReplyPopup(false)
              setShowEditReplyPopup(false)
              setReplyCommentValue("")
            }}
            actions={[
              {
                title: "cancel",
                danger: true,
                buttonClassName:
                  " !h-fit !mt-4 !mb-0 !bg-white border-primary-400 border !text-primary-400 hover:!bg-danger hover:!border-danger hover:opacity-100 hover:!text-white",
                action: () => {
                  onClose();
                  setReplyComment();
                  setShowReplyPopup(false)
                  setShowDeleteReplyPopup(false)
                  setShowEditReplyPopup(false)
                },
              },
              {
                title: "Post",
                danger: true,
                buttonClassName:
                  "!h-fit !mt-4 !mb-0 !bg-primary-400 !border-primary-400 border hover:opacity-70",
                action: (showReplyPopup && handleAddReplyComment) || (showEditReplyPopup && handleEditReplyComment)
              },
            ]}
            // title="Search location"
            children={
              <>
                <Wrapper className="justify-end">
                  <Button
                    className="!p-0 !bg-transparent !rounded-none !border-none !my-0"
                    onClick={() => {
                      onClose();
                      setReplyComment();
                      setReplyCommentValue("")
                      setShowReplyPopup(false)
                      setShowDeleteReplyPopup(false)
                      setShowEditReplyPopup(false)
                    }}
                  >
                    <AiOutlineClose className="text-[32px]  text-black " />
                  </Button>
                </Wrapper>

                <Wrapper col="true" className="gap-4">
                  <Heading className="text-center !text-[28px]">
                    {showEditReplyPopup
                      ? "Edit reply"
                      : `Reply comment of ${replyComment && replyComment.user.username}`}
                  </Heading>

                  <Wrapper className="rounded-lg items-end w-full">
                    <TextArea
                      _ref={commentRef}
                      placeholder="Write your comment..."
                      className="!py-4 !px-3 focus:!ring-0 max-h-[150px] !h-[150px] w-full"
                      type="text"
                      value={replyCommentValue}
                      onChange={(e) => {
                        setReplyCommentValue(e.target.value);
                        // console.log(e.target.value)
                      }}
                      rows={5}
                      wrapperClassName="w-full !gap-0"
                    />
                  </Wrapper>

                  <Error fluid className={`${!err && "invisible"}`}>
                    {err}
                  </Error>
                </Wrapper>
              </>
            }
            className={` px-4 sm:px-12 `}
            formClassName="items-center !h-auto w-full !rounded-none md:!py-4 md:!px-4 md:!rounded-lg relative !block !p-2"
            titleClassName="text-[20px]"
            childrenClassName="!mt-0 w-full"
          />
        )}
      {(showDeleteReplyPopup && (
          <Popup
            title="Are you sure to remove this comment?"
            onClose={() => {
              onClose()
              setReplyComment();
              setShowReplyPopup(false)
              setShowDeleteReplyPopup(false)
              setShowEditReplyPopup(false)            
            }}
            actions={[
              {
                title: "cancel",
                danger: false,
                action: () => {
                  onClose()
                  setReplyComment();
                  setShowReplyPopup(false)
                  setShowDeleteReplyPopup(false)
                  setShowEditReplyPopup(false)
                },
              },
              {
                title: "delete",
                danger: true,
                action: () => (replyComment && handleDeleteReplyComment(replyComment)),
              },
            ]}
          />
        ))}
    </>
  );
};

export default CommentCard;
