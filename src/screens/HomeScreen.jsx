import localStorageKey from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "@/components/wrapper/Wrapper";

import PreferencesSelect from "@/components/form/PreferencesSelect";
import categoryList from "@/constants/category";

import Heading from "@/components/typography/Heading";
import locationApi from "@/api/locationApi";
import Slider from "@/components/slider/Slider";
import Label from "@/components/form/Label";
import Loading from "@/components/loading/Loading";

import OnBoardingSlider from "@/components/slider/OnBoardingSlider";
import Screen from "@/components/container/Screen";
import { changeCategory, changeSearchInput } from "@/features/filterSlice";

import SubNavbar from "@/components/navbar/SubNavbar";

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

  const onSelectLocation = (id) => {
    navigate(id);
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

  return (
    <Screen className="my-4 lg:my-12 px-8 flex flex-col gap-4 lg:px-16 py-8 md:py-16 lg:py-0">
      <Wrapper col="true" className="gap-4 md:items-center">
        {/* <Wrapper col="true" className="md:items-center md:flex-row w-full">
          <User user={user} src={user.imageUrl} />
          <SearchBar onChange={handleSearchValue} className="w-full" />
          {width > 768 && <Filter />}
        </Wrapper> */}
        <SubNavbar user={user} />
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
        {!isLoading ? (
          featuredLocations.length > 0 ? (
            <Slider
              items={featuredLocations}
              className="!bg-transparent sm:text-left !p-0"
              cardClassName="text-center hover:opacity-70 cursor-pointer"
              perView={4}
              onClick={onSelectLocation}
            />
          ) : (
            <Wrapper className="justify-center">
              <Heading>No results found!</Heading>
            </Wrapper>
          )
        ) : (
          <Loading />
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
        {!isLoading ? (
          latestLocations.length > 0 ? (
            <Slider
              items={latestLocations}
              className="!bg-transparent sm:text-left !p-0"
              cardClassName="bg-neutral-100 text-center"
              perView={4}
              onClick={onSelectLocation}
            />
          ) : (
            <Wrapper className="justify-center">
              <Heading>No results found!</Heading>
            </Wrapper>
          )
        ) : (
          <Loading />
        )}
      </Wrapper>
    </Screen>
  );
};

export default HomeScreen;
