import { useState, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import userApi from "@/api/userApi";
import { useSelector } from "react-redux";
import LoadingScreen from "@/screens/LoadingScreen";
import ROUTE from "@/constants/routes";
import toast, { Toaster } from "react-hot-toast";

// 1. Fetch current data into UI
// 2. Edit
// 3. Call api for submit'

const notify = () => toast.success("Successfully update");

const EditProfileScreen = () => {
  const { user } = useSelector((state) => state.user);
  const { username, email, imageUrl, _id, locationCategories, searchDistance } =
    user;
  const [fetchUser, setFetchUser] = useState(user);

  const [usernameInput, setUsernameInput] = useState(username);
  const [distance, setDistance] = useState(searchDistance || DISTANCE.min);
  const [locationCategoriesInput, setLocationCategoriesInput] =
    useState(locationCategories);

  const [message, setMessage] = useState();
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleDistanceChange = ({ x }) => setDistance(x);
  const handleCategoryClick = (category) => {
    const newCategory = locationCategoriesInput.includes(category)
      ? locationCategoriesInput.filter((item) => item !== category)
      : [...locationCategoriesInput, category];

    setLocationCategoriesInput(newCategory);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    const userInfo = {
      idToken: localStorage.getItem("idToken"),
      username: usernameInput,
      searchDistance: distance,
      locationCategories: locationCategoriesInput,
      imageUrl: localStorage.getItem("avatar") || imageUrl || DEFAULT.avatar,
    };

    console.log("to edit: ", userInfo);

    const data = await userApi.editProfile(userInfo, notify);
    setLoading(false);

    // localStorage.setItem("user", JSON.stringify(data));
    navigate(ROUTE.PROFILE);
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

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      const response = await userApi.getUserProfile(_id);
      console.log(response);
      setFetchUser(response.data);
      setUsernameInput(response.data.username);
      setDistance(response.data.searchDistance);
      setLocationCategoriesInput(response.data.locationCategories);
      setLoading(false);
      return response;
    };
    if (_id) {
      getUserProfile();
    }
  }, []);

  const registerEmail = email || localStorage.getItem("registerEmail") || "";

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Screen className="flex !min-h-[90vh] md:!min-h-[85vh] lg:!overflow-hidden flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20 lg:!min-h-0">
          <Wrapper className="flex-1 lg:!flex-initial xl:grid xl:gap-2 lg:mx-auto lg:w-[700px] lg:p-20 lg:shadow-xl lg:rounded-lg lg:bg-neutral-400 lg:min-h-[800px]">
            {/* <Wrapper className="flex-1 hidden xl:block">
              <Image className="flex-1 h-full" src={hero} />
            </Wrapper> */}
            <Wrapper className="" col="true">
              <Wrapper col="true">
                <Heading>Profile Edit</Heading>
                <SubHeading>Edit your profile!</SubHeading>
              </Wrapper>

              <AvatarUpload img={fetchUser.imageUrl} />
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

              <Wrapper className="items-center !w-full justify-center !flex-col md:!flex-row !mt-auto lg:!mt-10 !mb-0">
                <Button
                  className="!border-2 !border-primary-400 !m-0"
                  primary
                  active
                  onClick={handleSaveChanges}
                  isLoading={loading}
                >
                  Save Changes
                </Button>

                <Link className="w-full" to={ROUTE.PROFILE}>
                  <Button
                    className="bg-transparent !m-0 !border-2 !border-primary-400 !text-primary-400 !py-[10px]"
                    active
                    primary
                  >
                    Cancel
                  </Button>
                </Link>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Screen>
      )}
    </>
  );
};

export default EditProfileScreen;
