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
import SubNavbar from "@/components/navbar/SubNavbar";
import useViewport from "@/hooks/useScreenWidth";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { width } = useViewport();
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
    <Wrapper className="h-screen flex-col px-4 my-4 lg:my-8">
      <Wrapper className="flex-col gap-4 lg:flex-row">
        <User user={user} src={user.imageUrl} />
        <SearchBar />
        {width > 1024 && <SubNavbar />}
      </Wrapper>

      <PreviewImage
        imageList={imageList}
        className="!bg-transparent sm:text-left !p-0"
        cardClassName=""
        imageClassName='h-[40vh] lg:h-[60vh]'
        // label="Features"
        // name="Netcompany"
        // address="Opal Tower, 92 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, Thành phố Hồ Chí Minh"
        perView={1}
      />

      <PreferencesSelect
        categoryList={categoryList}
        onSelect={handleCategoryClick}
        locationCategories={locationCategories}
      />

      <PreviewImage
        imageList={imageList}
        className="!bg-transparent sm:text-left !p-0"
        cardClassName="bg-neutral-100 p-4 text-center"
        label="Features"
        name="Netcompany"
        address="Opal Tower, 92 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, Thành phố Hồ Chí Minh"
        perView={width > 768 ? 4 : 2}
      />

      <PreviewImage
        imageList={imageList}
        className="!bg-transparent sm:text-left !p-0"
        cardClassName="bg-neutral-100 p-4 text-center"
        label="Latest"
        name="Netcompany"
        address="Opal Tower, 92 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, Thành phố Hồ Chí Minh"
        perView={width > 768 ? 4 : 2}
      />
    </Wrapper>
  );
};

export default HomeScreen;
