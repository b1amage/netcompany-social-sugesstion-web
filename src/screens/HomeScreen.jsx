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
import SubNavbar from "@/components/navbar/SubNavbar";
import useViewport from "@/hooks/useScreenWidth";
import { useGeolocated } from "react-geolocated";
import axios from "axios";
import Image from "@/components/image/Image";
import locationImg from "@/assets/location.svg";
import Heading from "@/components/typography/Heading";
import locationApi from "@/api/locationApi";
import Slider from "@/components/slider/Slider";
import Label from "@/components/form/Label";
import Loading from "@/components/loading/Loading";
import { GoPlus } from "react-icons/go";
import OnBoardingSlider from "@/components/slider/OnBoardingSlider";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { width } = useViewport();
  const [location, setLocation] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [featuredLocations, setFeaturedLocations] = useState([]);
  const [latestLocations, setLatestLocations] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [searchDistance, setSearchDistance] = useState();
  const [featuredNextCursor, setFeaturedNextCursor] = useState();
  const [latestNextCursor, setLatestNextCursor] = useState();
  const [isFeaturedUpdating, setIsFeaturedUpdating] = useState(false);
  const [isLatestUpdating, setIsLatestUpdating] = useState(false);

  const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;
  const [locationCategories, setLocationCategories] = useState([]);
  const handleCategoryClick = (category) => {
    const newCategory = locationCategories.includes(category)
      ? locationCategories.filter((item) => item !== category)
      : [...locationCategories, category];

    setLocationCategories(newCategory);
  };

  const {
    category,
    weekdayOpenTime,
    weekdayCloseTime,
    weekendOpenTime,
    weekendCloseTime,
  } = useSelector(({ createLocationForm }) => {
    return {
      category: createLocationForm.category,
      weekdayOpenTime: createLocationForm.weekdayOpenTime,
      weekdayCloseTime: createLocationForm.weekdayCloseTime,
      weekendOpenTime: createLocationForm.weekendOpenTime,
      weekendCloseTime: createLocationForm.weekendCloseTime,
    };
  });

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
  // console.log(user);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      // console.log(coords.latitude);
      // console.log(coords.longitude);
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
      const fetchAddress = async () => {
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${key}`
        );
        setLocation(data.results[0].formatted_address);
        console.log(data.results[0].formatted_address);
      };

      const fetchFeaturedLocations = async () => {
        const response = await locationApi.getFeaturedLocation({
          locationCategory: category,
          searchInput: searchInput,
          lat: coords.latitude,
          lng: coords.longitude,
          searchDistance: searchDistance,
          weekday: { openTime: weekdayOpenTime, closeTime: weekdayCloseTime },
          weekend: { openTime: weekendOpenTime, closeTime: weekendCloseTime },
        });
        setFeaturedLocations(response.data.results);
        setFeaturedNextCursor(response.data.next_cursor);
        // console.log(response)
      };
      const fetchLatestLocations = async () => {
        const response = await locationApi.getLatestLocation({
          locationCategory: category,
          searchInput: searchInput,
          lat: coords.latitude,
          lng: coords.longitude,
          searchDistance: searchDistance,
          weekday: { openTime: weekdayOpenTime, closeTime: weekdayCloseTime },
          weekend: { openTime: weekendOpenTime, closeTime: weekendCloseTime },
        });
        setLatestLocations(response.data.results);
        setLatestNextCursor(response.data.next_cursor);
        // console.log(response)
      };
      fetchFeaturedLocations();
      fetchLatestLocations();
      fetchAddress();
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

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
          weekday: { openTime: weekdayOpenTime, closeTime: weekdayCloseTime },
          weekend: { openTime: weekendOpenTime, closeTime: weekendCloseTime },
        },
        nextCursor
      );
      setFeaturedLocations((prev) => [...prev, ...response.data.results]);
      setFeaturedNextCursor(response.data.next_cursor);
      // console.log(response)
      setIsFeaturedUpdating(false);
    };
    fetchFeaturedLocations();
  };

  const handleLoadMoreLatestData = (nextCursor) => {
    setIsLatestUpdating(true);
    const fetchLatestLocations = async () => {
      const response = await locationApi.getLatestLocation(
        {
          next_cursor: nextCursor,
          locationCategory: category,
          searchInput: searchInput,
          lat: latitude,
          lng: longitude,
          searchDistance: searchDistance,
          weekday: { openTime: weekdayOpenTime, closeTime: weekdayCloseTime },
          weekend: { openTime: weekendOpenTime, closeTime: weekendCloseTime },
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
    <Wrapper col className="my-4 lg:my-8 px-16 gap-8">
      <Wrapper className="flex gap-4 items-center">
        <Image
          src={locationImg}
          alt="location"
          className="max-w-[20px] max-h-[20px]"
        />
        <Heading className="!text-[16px] truncate">
          {location ? location : "Loading..."}
        </Heading>
      </Wrapper>
      <Wrapper col className="gap-4 md:flex-row md:items-center">
        <User user={user} src={user.imageUrl} />
        <SearchBar />
        {width > 768 && <SubNavbar />}
      </Wrapper>

      {/* <Slider
        imgList={imageList}
        className="!bg-transparent sm:text-left !p-0"
        cardClassName="!w-full"
        imageClassName="h-[40vh] lg:h-[60vh]"
        // label="Features"
        // name="Netcompany"
        // address="Opal Tower, 92 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, Thành phố Hồ Chí Minh"
        perView={1}
      /> */}
      <OnBoardingSlider />

      <PreferencesSelect
        categoryList={categoryList}
        onSelect={handleCategoryClick}
        locationCategories={locationCategories}
      />

      <Wrapper col="true" className="">
        <Wrapper className="justify-between items-center">
          <Label>Features</Label>
          {featuredNextCursor &&
            (!isFeaturedUpdating ? (
              <GoPlus
                className="h-16 w-16 cursor-pointer hover:animate-bounce"
                onClick={() => {
                  handleLoadMoreFeaturedData(featuredNextCursor);
                }}
              />
            ) : (
              <Loading />
            ))}
        </Wrapper>
        {featuredLocations.length > 0 ? (
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
            <Loading />
          </Wrapper>
        )}
      </Wrapper>

      <Wrapper col="true" className="">
        <Wrapper className="justify-between items-center">
          <Label>Latest</Label>
          {latestNextCursor &&
            (!isLatestUpdating ? (
              <GoPlus
                className="h-16 w-16 cursor-pointer hover:animate-bounce"
                onClick={() => handleLoadMoreLatestData(latestNextCursor)}
              />
            ) : (
              <Loading />
            ))}
        </Wrapper>
        {latestLocations.length > 0 ? (
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
            <Loading />
          </Wrapper>
        )}
      </Wrapper>
    </Wrapper>
  );
};

export default HomeScreen;
