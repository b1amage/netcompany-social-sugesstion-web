import User from "@/components/user/User";
import PlaceCard from "@/components/card/PlaceCard";
import placeList from "@/constants/mockPlaces";
import React from "react";
import generateId from "@/utilities/generateId";

const HomeScreen = () => {
  return <div>
    <User src='https://scontent.fsgn12-1.fna.fbcdn.net/v/t39.30808-6/289119097_1456144428173839_7549261293075397454_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=AvucbsT3a-YAX_Mhny_&_nc_ht=scontent.fsgn12-1.fna&oh=00_AfArEeRTE1-e_tbg1JAnNtnwJt_QKRkmnw-a0lyZoT44rw&oe=6450E8B6' user={{name: 'An Bui', email:'quangan186@gmail.com'}} />
  </div>;
};

export default HomeScreen;
