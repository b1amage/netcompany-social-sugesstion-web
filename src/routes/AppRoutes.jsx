import React, { Suspense, useEffect } from "react";
import ROUTE from "@/constants/routes";
import { Routes, Route, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

const AllEventsScreen = React.lazy(() => import("@/screens/AllEventsScreen"));
const UpdateEventScreen = React.lazy(() =>
  import("@/screens/UpdateEventScreen")
);

const ItineraryDetailsScreen = React.lazy(() =>
  import("@/screens/ItineraryDetailsScreen")
);
const ItineraryLocationDetailsScreen = React.lazy(() => import("@/screens/ItineraryLocationDetailsScreen"));

const ItinerariesScreen = React.lazy(() =>
  import("@/screens/ItinerariesScreen")
);
const EventDetailsScreen = React.lazy(() =>
  import("@/screens/EventDetailsScreen")
);
const SearchLocationScreen = React.lazy(() =>
  import("@/screens/SearchLocationScreen")
);
const CreateEventScreen = React.lazy(() =>
  import("@/screens/CreateEventScreen")
);
const ErrorScreen = React.lazy(() => import("@/screens/ErrorScreen"));
const CreateLocationScreen = React.lazy(() =>
  import("@/screens/CreateLocationScreen")
);
const OnboardingScreen = React.lazy(() => import("@/screens/OnboardingScreen"));
const AutoCompleteScreen = React.lazy(() => import("@/test/AutoComplete"));
const VerifyScreen = React.lazy(() => import("@/screens/VerifyScreen"));
const LoadingScreen = React.lazy(() => import("@/screens/LoadingScreen"));
const HomeScreen = React.lazy(() => import("@/screens/HomeScreen"));
const EditLocationScreen = React.lazy(() =>
  import("@/screens/EditLocationScreen")
);
const LoginScreen = React.lazy(() => import("@/screens/LoginScreen"));
const NotFoundScreen = React.lazy(() => import("@/screens/404Screen"));
const MyRouteScreen = React.lazy(() => import("@/screens/MyRouteScreen"));
const PlanEventScreen = React.lazy(() => import("@/screens/PlanEventScreen"));
const MyEvent = React.lazy(() => import("@/screens/MyEvent"));
const Navbar = React.lazy(() => import("@/components/navbar/Navbar"));
const ProfileScreen = React.lazy(() => import("@/screens/ProfileScreen"));
const UserProfileScreen = React.lazy(() =>
  import("@/screens/UserProfileScreen")
);
const TestScreen = React.lazy(() => import("@/screens/TestScreen"));
const EventsScreen = React.lazy(() => import("@/screens/EventsScreen"));
const DetailsScreen = React.lazy(() => import("@/screens/DetailsScreen"));
const EditProfileScreen = React.lazy(() =>
  import("@/screens/EditProfileScreen")
);

const AppRoutes = () => {
  const navigate = useNavigate();

  // const {user} = useSelector((state) => state.user)

  useEffect(() => {
    const user = localStorage.getItem("user") || null;
    const idToken = localStorage.getItem("idToken") || null;
    if (!idToken || user === JSON.stringify({}) || !user) {
      navigate(ROUTE.LOGIN);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path={ROUTE.ONBOARDING} element={<OnboardingScreen />} />
          <Route path={ROUTE.HOME} element={<HomeScreen />} />
          <Route path={ROUTE.LOGIN} element={<LoginScreen />} />
          <Route path={ROUTE.VERIFY} element={<VerifyScreen />} />
          <Route path={ROUTE.PROFILE} element={<ProfileScreen />} />
          <Route path={"/location/edit/:id"} element={<EditLocationScreen />} />

          <Route path="/plan-event" element={<PlanEventScreen />} />
          <Route path="/my-event" element={<MyEvent />} />
          <Route path="/my-route" element={<MyRouteScreen />} />

          <Route path="/atc" element={<AutoCompleteScreen />} />
          <Route path={ROUTE.TEST} element={<TestScreen />} />
          <Route path={ROUTE.EVENTS} element={<AllEventsScreen />} />
          <Route
            path={ROUTE.DETAILS_EVENT}
            element={<DetailsScreen event="true" />}
          />
          <Route path="/location/details/:id" element={<DetailsScreen />} />
          <Route
            path={ROUTE.CREATE_LOCATION}
            element={<CreateLocationScreen />}
          />
          <Route path={ROUTE.NOT_FOUND} element={<NotFoundScreen />} />
          <Route path={ROUTE.EDIT_PROFILE} element={<EditProfileScreen />} />
          <Route path="/error/:message" element={<ErrorScreen />} />
          <Route path="/event/create" element={<CreateEventScreen />} />
          <Route path="/event/update/:id" element={<UpdateEventScreen />} />

          <Route path="/user/:_id" element={<UserProfileScreen />} />
          <Route path="/event/:id" element={<EventDetailsScreen />} />

          <Route
            path={ROUTE.SEARCH_LOCATION}
            element={<SearchLocationScreen />}
          />
          <Route path={ROUTE.ITINERARIES} element={<ItinerariesScreen />} />
          <Route path={ROUTE.ITINERARY_DETAILS} element={<ItineraryDetailsScreen />} />
          <Route path={ROUTE.ITINERARY_LOCATION_DETAILS} element={<ItineraryLocationDetailsScreen />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
