import localStorageKey from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import User from "@/components/user/User";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/search/SearchBar";
import Wrapper from "@/components/wrapper/Wrapper";
import { imageList } from "@/constants/images";
import PreferencesSelect from "@/components/form/PreferencesSelect";
import categoryList from "@/constants/category";
// import SubNavbar from "@/components/navbar/SubNavbar";
import useViewport from "@/hooks/useScreenWidth";
// import { useGeolocated } from "react-geolocated";
// import axios from "axios";
// import Image from "@/components/image/Image";
// import locationImg from "@/assets/location.svg";
import Heading from "@/components/typography/Heading";
import locationApi from "@/api/locationApi";
import Slider from "@/components/slider/Slider";
import Label from "@/components/form/Label";
import Loading from "@/components/loading/Loading";
import { GoPlus } from "react-icons/go";
import OnBoardingSlider from "@/components/slider/OnBoardingSlider";
import Screen from "@/components/container/Screen";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import locationImg from "@/assets/location.svg";
import Image from "@/components/image/Image";

// const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const HomeScreen = () => {
  const navigate = useNavigate();
  const { width } = useViewport();
  // const [location, setLocation] = useState();
  // const [latitude, setLatitude] = useState();
  // const [longitude, setLongitude] = useState();
  const [featuredLocations, setFeaturedLocations] = useState([]);
  const [latestLocations, setLatestLocations] = useState([]);
  const [featuredNextCursor, setFeaturedNextCursor] = useState();
  const [latestNextCursor, setLatestNextCursor] = useState();
  const [isFeaturedUpdating, setIsFeaturedUpdating] = useState(false);
  const [isLatestUpdating, setIsLatestUpdating] = useState(false);

  const [locationCategories, setLocationCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryClick = (category) => {
    const newCategory = locationCategories.includes(category)
      ? locationCategories.filter((item) => item !== category)
      : [...locationCategories, category];

    setLocationCategories(newCategory);
  };

  // const { isAdded, isShowNotification, isShowFilter, } = useSelector(
  //   ({ createLocationForm }) => {
  //     return {

  //     };
  //   }
  // );

  const {
    category,
    weekdayOpenTime,
    weekdayCloseTime,
    weekendOpenTime,
    weekendCloseTime,
    currentLocation,
    latitude,
    longitude,
  } = useSelector(({ currentLocation }) => {
    return {
      currentLocation: currentLocation.currentLocation,
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    };
  });

  useCurrentLocation();
  const [locationCategory, setLocationCategory] = useState();
  const [searchInput, setSearchInput] = useState();
  const [searchDistance, setSearchDistance] = useState();
  const [weekday, setWeekday] = useState({ openTime: "", closeTime: "" });
  const [weekend, setWeekend] = useState({ openTime: "", closeTime: "" });

  const onSelectLocation = (id) => {
    navigate(id);
  };

  // const data = {
  //   locationCategory: category,
  //   searchInput: searchInput,
  //   lat: latitude,
  //   lng: longitude,
  //   searchDistance: searchDistance,
  //   weekday: {openTime: weekdayOpenTime, closeTime: weekdayCloseTime},
  //   weekend: {openTime: weekendOpenTime, closeTime: weekendCloseTime},
  // }

  // ONBOARDING CHECK
  useEffect(() => {
    const onBoardingAlreadyShown = JSON.parse(
      localStorage.getItem(localStorageKey.alreadyShownOnboarding)
    );

    !onBoardingAlreadyShown && navigate(ROUTE.ONBOARDING);
  }, []);

  // LOGIN CHECK
  useEffect(() => {
    if (localStorage.getItem("loginReload") === "true") {
      localStorage.setItem("loginReload", "false");
      location.reload();
    }

    const user =
      localStorage.getItem(localStorageKey.user) || JSON.stringify({});
    if (user === JSON.stringify({})) {
      navigate(ROUTE.LOGIN);
    }
  }, []);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentLocation && latitude && longitude) {
      // if (currentLocation) {
      setIsLoading(true);
      const fetchFeaturedLocations = async () => {
        const response = await locationApi.getFeaturedLocation({
          locationCategory: locationCategory,
          searchInput: searchInput,
          lat: latitude,
          lng: longitude,
          searchDistance: searchDistance,
          weekday: { openTime: weekday.openTime, closeTime: weekday.closeTime },
          weekend: { openTime: weekend.openTime, closeTime: weekend.closeTime },
        });
        setFeaturedLocations(response.data.results);
        setFeaturedNextCursor(response.data.next_cursor);
        // console.log(response)
        setIsLoading(false);
      };
      const fetchLatestLocations = async () => {
        const response = await locationApi.getLatestLocation({
          locationCategory: locationCategory,
          searchInput: searchInput,
          lat: latitude,
          lng: longitude,
          searchDistance: searchDistance,
          weekday: { openTime: weekday.openTime, closeTime: weekday.closeTime },
          weekend: { openTime: weekend.openTime, closeTime: weekend.closeTime },
        });
        setLatestLocations(response.data.results);
        setLatestNextCursor(response.data.next_cursor);
        // console.log(response)
        setIsLoading(false);
      };
      fetchFeaturedLocations();
      fetchLatestLocations();
      // fetchAddress();
      // }
    }
  }, [currentLocation, latitude, longitude]);

  const handleLoadMoreFeaturedData = (nextCursor) => {
    setIsFeaturedUpdating(true);
    const fetchFeaturedLocations = async () => {
      const response = await locationApi.getFeaturedLocation(
        {
          locationCategory: locationCategory,
          searchInput: searchInput,
          lat: latitude,
          lng: longitude,
          searchDistance: searchDistance,
          weekday: { openTime: weekday.openTime, closeTime: weekday.closeTime },
          weekend: { openTime: weekend.openTime, closeTime: weekend.closeTime },
        },
        nextCursor
      );
      setFeaturedLocations((prev) => [...prev, ...response.data.results]);
      setFeaturedNextCursor(response.data.next_cursor);
      setIsFeaturedUpdating(false);
    };
    fetchFeaturedLocations();
  };

  const handleLoadMoreLatestData = (nextCursor) => {
    setIsLatestUpdating(true);
    const fetchLatestLocations = async () => {
      const response = await locationApi.getLatestLocation(
        {
          locationCategory: locationCategory,
          searchInput: searchInput,
          lat: latitude,
          lng: longitude,
          searchDistance: searchDistance,
          weekday: { openTime: weekday.openTime, closeTime: weekday.closeTime },
          weekend: { openTime: weekend.openTime, closeTime: weekend.closeTime },
        },
        nextCursor
      );
      setLatestLocations((prev) => [...prev, ...response.data.results]);
      setLatestNextCursor(response.data.next_cursor);
      // console.log(response)
      setIsLatestUpdating(false);
    };
    fetchLatestLocations();
  };
  // locationCategory=${data.locationCategory}&searchInput=${data.searchInput}&latitude=${data.lat}&longitude=${data.lng}&searchDistance=${data.searchDistance}&weekday[openTime]=${data.weekday[0]}&weekday[closeTime]=${data.weekday[1]}&weekend[openTime]=${data.weekend[0]}&weekend[closeTime]=${data.weekend[1]}
  return (
    <Screen className="my-4 lg:my-12 px-10 flex flex-col gap-8 lg:px-16 py-8 md:py-16 lg:py-0">
      <Wrapper col="true" className="gap-4 md:flex-row md:items-center">
        <User user={user} src={user.imageUrl} />
        <SearchBar />
      </Wrapper>

      {/* <Slider
        imgList={imageList}
        className="!bg-transparent sm:text-left !p-0"
        cardClassName="!w-full"
        imageClassName="h-[40vh] lg:h-[60vh]"
        // label="Features"
        // name="Netcompany"
        // address="Opal Tower={} 92 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, Thành phố Hồ Chí Minh"
        perView={1}
      /> */}
      <OnBoardingSlider />

      <PreferencesSelect
        categoryList={categoryList}
        onSelect={handleCategoryClick}
        locationCategories={locationCategories}
      />

      <Wrapper col="true" className="gap-4">
        <Wrapper className="justify-between items-end">
          <Label>Features</Label>
          {featuredNextCursor &&
            (!isFeaturedUpdating ? (
              <GoPlus
                className="h-10 w-10 cursor-pointer hover:animate-bounce"
                onClick={() => {
                  handleLoadMoreFeaturedData(featuredNextCursor);
                }}
              />
            ) : (
              <Loading className="!h-10 !w-10" />
            ))}
        </Wrapper>
        {featuredLocations.length > 0 && !isLoading ? (
          <Slider
            items={featuredLocations}
            className="!bg-transparent sm:text-left !p-0"
            cardClassName="bg-neutral-100 p-4 text-center hover:opacity-70 cursor-pointer"
            // label="Features"
            // name="Netcompany"
            // address="Opal Tower, 92 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, Thành phố Hồ Chí Minh"
            perView={4}
            onClick={onSelectLocation}
          />
        ) : (
          <Wrapper className="justify-center">
            {currentLocation ? (
              <Loading />
            ) : (
              <Heading>No results found!</Heading>
            )}
          </Wrapper>
        )}
      </Wrapper>

      <Wrapper col="true" className="gap-4">
        <Wrapper className="justify-between items-end">
          <Label>Latest</Label>
          {latestNextCursor &&
            (!isLatestUpdating ? (
              <GoPlus
                className="h-10 w-10 cursor-pointer hover:animate-bounce"
                onClick={() => handleLoadMoreLatestData(latestNextCursor)}
              />
            ) : (
              <Loading className="!h-10 !w-10" />
            ))}
        </Wrapper>
        {latestLocations.length > 0 && !isLoading ? (
          <Slider
            items={latestLocations}
            className="!bg-transparent sm:text-left !p-0"
            cardClassName="bg-neutral-100 p-4 text-center"
            // label="Latest"
            // name="Netcompany"
            // address="Opal Tower, 92 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, Thành phố Hồ Chí Minh"
            perView={4}
            onClick={onSelectLocation}
          />
        ) : (
          <Wrapper className="justify-center">
            {currentLocation ? (
              <Loading />
            ) : (
              <Heading>No results found!</Heading>
            )}
          </Wrapper>
        )}
      </Wrapper>
    </Screen>
  );
};

export default HomeScreen;
