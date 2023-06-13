import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { TfiLayoutListThumb, TfiLayoutListThumbAlt } from "react-icons/tfi";
import placeList from "./mockPlaces";

const profileTabs = [
  {
    title: "created",
    icon: TfiLayoutListThumb,
    fillIcon: TfiLayoutListThumbAlt,
    placeList: placeList,
  },
  {
    title: "liked",
    icon: AiOutlineHeart,
    fillIcon: AiFillHeart,
    placeList: placeList,
  },
];

export default profileTabs;
