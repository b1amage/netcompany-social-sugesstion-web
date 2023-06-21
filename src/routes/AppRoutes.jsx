import React, { Suspense } from "react";
import ROUTE from "@/constants/routes";
import { Routes, Route } from "react-router-dom";

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
const EditLocationScreen = React.lazy(() => import("@/screens/EditLocationScreen"));
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
          <Route path={ROUTE.EVENTS} element={<EventsScreen />} />
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

          <Route path="/user/:_id" element={<UserProfileScreen />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
