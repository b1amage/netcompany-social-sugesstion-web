import Screen from "@/components/container/Screen";
import Input from "@/components/form/Input";
import { useEffect, useState } from "react";
import Range from "@/components/form/Range";
import Label from "@/components/form/Label";
import Category from "@/components/category/Category";
import categoryList from "@/constants/category";

import AvatarUpload from "@/components/image/AvatarUpload";
import { getCurrentLocation } from "@/helpers/helpers";
import Button from "@/components/button/Button";
import generateId from "@/utilities/generateId";
import authApi from "@/api/authApi";

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
      imageUrl:
        localStorage.getItem("avatar") ||
        "https://res.cloudinary.com/dxcgirgcy/image/upload/v1683168039/avatar_yiyczj.png",
    };

    await authApi.verifyAccount(userInfo);
  };

  useEffect(() => {
    (async function () {
      try {
        const location = await getCurrentLocation();
        console.log(
          `Your current location is: ${location.lat}, ${location.lng}`
        );

        setLocation(location);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  return (
    <Screen className="flex flex-col gap-5">
      <AvatarUpload />
      <Input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        required
        label="Username"
        type="text"
        name="username"
        id="username"
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
        min={5}
        max={50}
        onChange={handleDistanceChange}
        x={distance}
        label={`Distance: ${distance}km`}
      />

      <div>
        <Label required>Preferences</Label>

        <div className="flex flex-wrap gap-2">
          {categoryList.map((item) => (
            <Category
              isActive={locationCategories.includes(item.title)}
              onClick={handleCategoryClick}
              key={generateId()}
            >
              {item.title}
            </Category>
          ))}
        </div>
      </div>

      <Button primary active onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </Screen>
  );
};

export default VerifyScreen;
