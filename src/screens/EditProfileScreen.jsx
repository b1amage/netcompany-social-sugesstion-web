import { useEffect, useState } from "react";
import { getCurrentLocation } from "@/helpers/helpers";
import authApi from "@/api/authApi";
import categoryList from "@/constants/category";
import { DEFAULT } from "@/constants/defaultData";
import { DISTANCE } from "@/constants/distance";
import PreferencesSelect from "@/components/form/PreferencesSelect";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Error from "@/components/form/Error";
import Message from "@/components/form/Message";
import Button from "@/components/button/Button";
import Range from "@/components/form/Range";
import AvatarUpload from "@/components/image/AvatarUpload";
import Screen from "@/components/container/Screen";
import Input from "@/components/form/Input";
import Wrapper from "@/components/wrapper/Wrapper";
import { useNavigate } from "react-router-dom";
import Image from "@/components/image/Image";
import hero from "@/assets/verify/hero.png";
import userApi from "@/api/userApi";
import { useSelector } from "react-redux";
import LoadingScreen from "@/screens/LoadingScreen";

// 1. Fetch current data into UI
// 2. Edit
// 3. Call api for submit

const EditProfileScreen = () => {
  const { user } = useSelector((state) => state.user);
  const { username, email, imageUrl, _id, locationCategories, searchDistance } =
    user;
  const [usernameInput, setUsernameInput] = useState(username);
  const [distance, setDistance] = useState(searchDistance || DISTANCE.min);
  const [locationCategoriesInput, setLocationCategoriesInput] =
    useState(locationCategories);
  // const [location, setLocation] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);
  // const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleDistanceChange = ({ x }) => setDistance(x);
  const handleCategoryClick = (category) => {
    const newCategory = locationCategoriesInput.includes(category)
      ? locationCategoriesInput.filter((item) => item !== category)
      : [...locationCategoriesInput, category];

    setLocationCategoriesInput(newCategory);
  };

  const handleAPIMessage = (message) => setMessage(message);
  const handleAPIError = (value) => setError(value);

  const handleSaveChanges = async () => {
    const userInfo = {
      idToken: localStorage.getItem("idToken"),
      username: usernameInput,
      searchDistance: distance,
      locationCategories: locationCategoriesInput,
      imageUrl: localStorage.getItem("avatar") || imageUrl || DEFAULT.avatar,
    };

    console.log(userInfo);

    const data = await userApi.editProfile(userInfo);
    localStorage.setItem("user", JSON.stringify(data));
  };

  // Get Location
  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const user = JSON.parse(localStorage.getItem("user"));
  //       const userId = user?._id;
  //       if (userId) {
  //         const response = await userApi.getUserProfile(userId);
  //         setUser(response?.data);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   })();
  // }, []);

  const registerEmail = email || localStorage.getItem("registerEmail") || "";

  return (
    <>
      {!loading ? (
        <LoadingScreen />
      ) : (
        <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20">
          <Wrapper className="flex-1 xl:grid xl:grid-cols-2 xl:gap-10">
            <Wrapper className="flex-1 hidden xl:block">
              <Image className="flex-1 h-full" src={hero} />
            </Wrapper>
            <Wrapper className="" col="true">
              <Wrapper col="true">
                <Heading>Profile Edit</Heading>
                <SubHeading>Edit your profile!</SubHeading>
              </Wrapper>

              <AvatarUpload img={imageUrl} />
              <Input
                onChange={(e) => setUsernameInput(e.target.value)}
                value={usernameInput}
                required
                label="Display name"
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
                value={registerEmail}
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
                locationCategories={locationCategoriesInput}
              />

              {error ? (
                <Error fluid>{message}</Error>
              ) : (
                message && (
                  <Message className="my-5" fluid>
                    {message}
                  </Message>
                )
              )}

              <Button
                className="!mt-auto !mb-0"
                primary
                active
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </Wrapper>
          </Wrapper>
        </Screen>
      )}
    </>
  );
};

export default EditProfileScreen;
