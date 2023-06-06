import localStorageKey from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import User from "@/components/user/User";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/search/SearchBar";
import Wrapper from "@/components/wrapper/Wrapper";
import PreviewImage from "@/components/image/PreviewImage";
import { imageList } from "@/constants/images";
import PreferencesSelect from "@/components/form/PreferencesSelect";
import categoryList from "@/constants/category";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [locationCategories, setLocationCategories] = useState([]);
  const handleCategoryClick = (category) => {
    const newCategory = locationCategories.includes(category)
      ? locationCategories.filter((item) => item !== category)
      : [...locationCategories, category];

    setLocationCategories(newCategory);
  };

  // ONBOARDING CHECK
  useEffect(() => {
    const onBoardingAlreadyShown = JSON.parse(
      localStorage.getItem(localStorageKey.alreadyShownOnboarding)
    );

    !onBoardingAlreadyShown && navigate(ROUTE.ONBOARDING);
  }, []);

  // LOGIN CHECK
  useEffect(() => {
    const user =
      localStorage.getItem(localStorageKey.user) || JSON.stringify({});
    if (user === JSON.stringify({})) {
      navigate(ROUTE.LOGIN);
    }
  }, []);
  const { user } = useSelector((state) => state.user);
  console.log(user);

  return (
    <Wrapper className="h-screen flex-col px-4">
      <User user={user} src={user.imageUrl} />
      <SearchBar />
      <PreviewImage imageList={imageList} />
      <PreferencesSelect
        categoryList={categoryList}
        onSelect={handleCategoryClick}
        locationCategories={locationCategories}
      />
    </Wrapper>
  );
};

export default HomeScreen;
