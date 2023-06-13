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

const VerifyScreen = () => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [distance, setDistance] = useState(DISTANCE.min);
  const [locationCategories, setLocationCategories] = useState([]);
  const [location, setLocation] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleDistanceChange = ({ x }) => setDistance(x);
  const handleCategoryClick = (category) => {
    const newCategory = locationCategories.includes(category)
      ? locationCategories.filter((item) => item !== category)
      : [...locationCategories, category];

    setLocationCategories(newCategory);
  };

  const handleAPIMessage = (message) => setMessage(message);
  const handleAPIError = (value) => setError(value);

  const handleSaveChanges = async () => {
    const userInfo = {
      idToken: localStorage.getItem("idToken"),
      username,
      searchDistance: distance,
      locationCategories,
      // coordinates: {
      //   latitude: location.lat,
      //   longitude: location.lng,
      // },
      imageUrl: localStorage.getItem("avatar") || DEFAULT.avatar,
    };

    console.log(userInfo);

    await authApi.verifyAccount(
      userInfo,
      handleAPIMessage,
      handleAPIError,
      navigate
    );
  };

  // Get Location
  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const location = await getCurrentLocation();
  //       setLocation(location);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   })();
  // }, []);

  const registerEmail = localStorage.getItem("registerEmail") || "";

  return (
    <Screen className="flex !min-h-[90vh] md:!min-h-[85vh] lg:!overflow-hidden flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20 lg:!min-h-0">
      <Wrapper className="flex-1 lg:!flex-initial xl:grid xl:gap-2 lg:mx-auto lg:w-[700px] lg:p-20 lg:shadow-xl lg:rounded-lg lg:bg-neutral-400 lg:!h-[800px] lg:overflow-scroll">
        {/* <Wrapper className="flex-1 hidden xl:block">
          <Image className="flex-1 h-full" src={hero} />
        </Wrapper> */}
        <Wrapper className="" col="true">
          <Wrapper col="true">
            <Heading>Profile Setup</Heading>
            <SubHeading>
              Provide your preferences for best experience
            </SubHeading>
          </Wrapper>

          <AvatarUpload />
          <Input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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
            locationCategories={locationCategories}
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
  );
};

export default VerifyScreen;
