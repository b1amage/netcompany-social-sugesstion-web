import localStorageKey from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import User from "@/components/user/User";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/search/SearchBar";
import Wrapper from "@/components/wrapper/Wrapper";
// import { imageList } from "@/constants/images";
import PreferencesSelect from "@/components/form/PreferencesSelect";
import categoryList from "@/constants/category";
// import SubNavbar from "@/components/navbar/SubNavbar";
// import useViewport from "@/hooks/useScreenWidth";
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
// import locationImg from "@/assets/location.svg";
// import Image from "@/components/image/Image";
import { changeCategory, changeSearchInput } from "@/features/filterSlice";

// const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const HomeScreen = () => {
  const navigate = useNavigate();
  const [featuredLocations, setFeaturedLocations] = useState([]);
  const [latestLocations, setLatestLocations] = useState([]);
  const [featuredNextCursor, setFeaturedNextCursor] = useState();
  const [latestNextCursor, setLatestNextCursor] = useState();
  const [isFeaturedUpdating, setIsFeaturedUpdating] = useState(false);
  const [isLatestUpdating, setIsLatestUpdating] = useState(false);

  const [locationCategories, setLocationCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleCategoryClick = (category) => {
    const selectedCategory = locationCategories.includes(category)
      ? locationCategories.filter((item) => item !== category)
      : [category];

    setLocationCategories(selectedCategory);
    dispatch(changeCategory(selectedCategory));
  };

  const {
    category,
    searchInput,
    weekdayTime,
    weekendTime,
    searchDistance,
    currentLocation,
    latitude,
    longitude,
  } = useSelector(({ filter, currentLocation }) => {
    return {
      currentLocation: currentLocation.currentLocation,
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      category: filter.category,
      searchInput: filter.searchInput,
      searchDistance: filter.searchDistance,
      weekdayTime: filter.weekdayTime,
      weekendTime: filter.weekendTime,
    };
  });

  useCurrentLocation();

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
          locationCategory: category,
          searchInput: searchInput,
          lat: latitude,
          lng: longitude,
          searchDistance: searchDistance,
          weekday: {
            openTime: weekdayTime.openTime,
            closeTime: weekdayTime.closeTime,
          },
          weekend: {
            openTime: weekendTime.openTime,
            closeTime: weekendTime.closeTime,
          },
        });
        setFeaturedLocations(response.data.results);
        setFeaturedNextCursor(response.data.next_cursor);
        setIsLoading(false);
      };
      fetchFeaturedLocations();
    }
  }, [
    currentLocation,
    latitude,
    longitude,
    category,
    searchInput,
    weekdayTime,
    weekendTime,
    searchDistance,
  ]);

  useEffect(() => {
    if (currentLocation && latitude && longitude) {
      const fetchLatestLocations = async () => {
        const response = await locationApi.getLatestLocation({
          locationCategory: category,
          searchInput: searchInput,
          lat: latitude,
          lng: longitude,
          searchDistance: searchDistance,
          weekday: {
            openTime: weekdayTime.openTime,
            closeTime: weekdayTime.closeTime,
          },
          weekend: {
            openTime: weekendTime.openTime,
            closeTime: weekendTime.closeTime,
          },
        });
        setLatestLocations(response.data.results);
        setLatestNextCursor(response.data.next_cursor);
        setIsLoading(false);
      };
      fetchLatestLocations();
    }
  }, [
    currentLocation,
    latitude,
    longitude,
    category,
    searchInput,
    weekdayTime,
    weekendTime,
    searchDistance,
  ]);

  const handleLoadMoreFeaturedData = (nextCursor) => {
    setIsFeaturedUpdating(true);
    const fetchFeaturedLocations = async () => {
      const response = await locationApi.getFeaturedLocation(
        {
          locationCategory: category,
          searchInput: searchInput,
          lat: latitude,
          lng: longitude,
          searchDistance: searchDistance,
          weekday: {
            openTime: weekdayTime.openTime,
            closeTime: weekdayTime.closeTime,
          },
          weekend: {
            openTime: weekendTime.openTime,
            closeTime: weekendTime.closeTime,
          },
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
          locationCategory: category,
          searchInput: searchInput,
          lat: latitude,
          lng: longitude,
          searchDistance: searchDistance,
          weekday: {
            openTime: weekdayTime.openTime,
            closeTime: weekdayTime.closeTime,
          },
          weekend: {
            openTime: weekendTime.openTime,
            closeTime: weekendTime.closeTime,
          },
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

  const handleSearchValue = (value) => {
    if (value.trim() === "") return;
    dispatch(changeSearchInput(value));
  };

  return (
    <Screen className="my-4 lg:my-12 px-10 flex flex-col gap-8 lg:px-16 py-8 md:py-16 lg:py-0">
      <Wrapper col="true" className="gap-4 md:flex-row md:items-center">
        <User user={user} src={user.imageUrl} />
        <SearchBar onChange={handleSearchValue} />
      </Wrapper>

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
              <Heading
                onClick={() => handleLoadMoreFeaturedData(featuredNextCursor)}
                className="cursor-pointer hover:animate-bounce text-primary-400"
              >
                + Load more
              </Heading>
            ) : (
              <Loading className="!h-10 !w-10" />
            ))}
        </Wrapper>
        {featuredLocations.length > 0 && !isLoading ? (
          <Slider
            items={featuredLocations}
            className="!bg-transparent sm:text-left !p-0"
            cardClassName="bg-neutral-100 p-4 text-center hover:opacity-70 cursor-pointer"
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
              <Heading
                onClick={() => handleLoadMoreLatestData(latestNextCursor)}
                className="cursor-pointer hover:animate-bounce text-primary-400"
              >
                + Load more
              </Heading>
            ) : (
              // className="h-10 w-10"
              <Loading className="!h-10 !w-10" />
            ))}
        </Wrapper>
        {latestLocations.length > 0 && !isLoading ? (
          <Slider
            items={latestLocations}
            className="!bg-transparent sm:text-left !p-0"
            cardClassName="bg-neutral-100 p-4 text-center"
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
