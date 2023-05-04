import Screen from "@/components/container/Screen";
import Input from "@/components/form/Input";
import { useEffect, useState } from "react";
import Range from "@/components/form/Range";

import AvatarUpload from "@/components/image/AvatarUpload";
import { getCurrentLocation } from "@/helpers/helpers";
import Button from "@/components/button/Button";
import categoryList from "@/constants/category";
import authApi from "@/api/authApi";
import { DEFAULT } from "@/constants/defaultData";
import { DISTANCE } from "@/constants/distance";
import PreferencesSelect from "@/components/form/PreferencesSelect";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";

const VerifyScreen = () => {
  const [username, setUsername] = useState("");
  const [distance, setDistance] = useState(0);
  const [locationCategories, setLocationCategories] = useState([]);
  const [location, setLocation] = useState();

  const handleDistanceChange = ({ x }) => setDistance(x);
  const handleCategoryClick = (category) => {
    const newCategory = locationCategories.includes(category)
      ? locationCategories.filter((item) => item !== category)
      : [...locationCategories, category];

    setLocationCategories(newCategory);
  };

  const handleSaveChanges = async () => {
    const userInfo = {
      idToken: localStorage.getItem("idToken"),
      username,
      searchDistance: distance,
      locationCategories,
      coordinates: {
        latitude: location.lat,
        longitude: location.lng,
      },
      imageUrl: localStorage.getItem("avatar") || DEFAULT.avatar,
    };

    await authApi.verifyAccount(userInfo);
  };

  // Get Location
  useEffect(() => {
    (async function () {
      try {
        const location = await getCurrentLocation();
        setLocation(location);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  return (
    <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20">
      <div className="flex flex-col">
        <Heading>Profile Setup</Heading>
        <SubHeading>Provide your preferences for best experience</SubHeading>
      </div>

      <AvatarUpload />
      <Input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        required
        label="Username"
        type="text"
        name="username"
        id="username"
        className=""
      />

      <Input
        label="Email"
        type="text"
        name="email"
        id="email"
        disabled
        value="s3877698@rmit.edu.vn"
      />

      <Range
        min={DISTANCE.min}
        max={DISTANCE.max}
        onChange={handleDistanceChange}
        x={distance}
        label={`Distance: ${distance}km`}
      />

      <PreferencesSelect
        categoryList={categoryList}
        onSelect={handleCategoryClick}
        locationCategories={locationCategories}
      />

      <Button className="!mt-auto" primary active onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </Screen>
  );
};

export default VerifyScreen;
