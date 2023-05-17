import { AiOutlineInfoCircle, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import placeList from "./mockPlaces";

const profileTabs = [
  { title: "own post", icon: AiOutlineInfoCircle, placeList: placeList },
  { title: "liked post", icon: AiOutlineHeart, placeList: placeList },
  { title: "saved post", icon: BsBookmark, placeList: placeList },
];

export default profileTabs;
