import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegStickyNote, FaStickyNote } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import placeList from "./mockPlaces";

const profileTabs = [
  {
    title: "own post",
    icon: FaRegStickyNote,
    fillIcon: FaStickyNote,
    placeList: placeList,
  },
  {
    title: "liked post",
    icon: AiOutlineHeart,
    fillIcon: AiFillHeart,
    placeList: placeList,
  },
  {
    title: "saved post",
    icon: BsBookmark,
    fillIcon: BsBookmarkFill,
    placeList: placeList,
  },
];

export default profileTabs;
