import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect, lazy } from "react";
import Sidebar from "./components/sidebar";

import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import EventDetail from "./components/EventDetail";
import Profile from "./components/profileSetting";
import { getUserAuthenticated } from "./services/auth.service";
import Loading from "./components/Loading";

import { getEventById, getEvents } from "./services/events.service";
import ProtectedRoutes from "./protectedRoutes";
import Event from "event/Event";
import LikedEvents from "event/LikedEvents";
import CreatedEvents from "event/CreatedEvents";

function Layout({ user, loading, setUser, events, setEvents }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [eventsLiked, setEventsLiked] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);

  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/signup";

  const eventsLikedIds = user?.likedEvents ?? [];
  const createdEventsIds = user?.createdEvents ?? [];

  useEffect(() => {
    const fetchCreatedEvents = async () => {
      const events = await Promise.all(
        createdEventsIds.map((id) => getEventById(id))
      );
      setCreatedEvents(events);
    };

    if (createdEventsIds.length > 0) {
      fetchCreatedEvents();
    }
  }, [user]);

  useEffect(() => {
    const fetchLikedEvents = async () => {
      const events = await Promise.all(
        eventsLikedIds.map((id) => getEventById(id))
      );
      setEventsLiked(events);
    };

    if (eventsLikedIds.length > 0) {
      fetchLikedEvents();
    }
  }, [user]);

  const handleLikeEvent = (event) => {
    if (!eventsLiked.find((e) => e._id === event._id)) {
      setEventsLiked((prev) => [...prev, event]);
    }
  };
  const handleUnlikeEvent = (event) => {
    setEventsLiked((prev) => prev.filter((e) => e._id !== event._id));
  };

  useEffect(() => {
    console.log("Liked events:", eventsLiked);
    console.log("Created events:", createdEvents);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex">
      {!hideSidebar && <Sidebar user={user} />}
      <div className={hideSidebar ? "w-full" : "sm:ml-64 w-full h-screen"}>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<SignUp setUser={setUser} />} />

          <Route element={<ProtectedRoutes user={user} loading={loading} />}>
            <Route
              path="/"
              element={
                <Event
                  events={events}
                  setEvents={setEvents}
                  handleLikeEvent={handleLikeEvent}
                  handleUnlikeEvent={handleUnlikeEvent}
                  user={user}
                  eventsLiked={eventsLiked}
                  setCreatedEvents={setCreatedEvents}
                />
              }
            />
            <Route
              path="/event/:id"
              element={
                <EventDetail
                  user={user}
                  eventsLiked={eventsLiked}
                  handleLikeEvent={handleLikeEvent}
                  handleUnlikeEvent={handleUnlikeEvent}
                />
              }
            />
            <Route
              path="/liked-event"
              element={
                <LikedEvents
                  eventsLiked={eventsLiked}
                  user={user}
                  handleLikeEvent={handleLikeEvent}
                  handleUnlikeEvent={handleUnlikeEvent}
                />
              }
            />
            <Route
              path="/created-event"
              element={
                <CreatedEvents
                  user={user}
                  createdEvents={createdEvents}
                  setCreatedEvents={setCreatedEvents}
                  handleLikeEvent={handleLikeEvent}
                  handleUnlikeEvent={handleUnlikeEvent}
                  eventsLiked={eventsLiked}
                  events={events}
                  setEvents={setEvents}
                />
              }
            />
            <Route
              path="/profile"
              element={<Profile user={user} setUser={setUser} />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initial loading state
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then((fetchedEvents) => {
        setEvents(fetchedEvents);
      })
      .catch((error) => console.error("Error fetching events:", error))
      .finally(() => setLoading(false));
  }, [user]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setLoading(true);
  //     getUserAuthenticated()
  //       .then((fetchedUser) => {
  //         setUser(fetchedUser);
  //         localStorage.setItem("user", JSON.stringify(fetchedUser)); // Sauvegarde user
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user:", error);
  //         setUser(null);
  //         localStorage.removeItem("user"); // Supprime si erreur
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Recharge user depuis localStorage
    }
  }, []);

  return (
    <BrowserRouter>
      <Layout
        user={user}
        loading={loading}
        setUser={setUser}
        events={events}
        setEvents={setEvents}
      />
    </BrowserRouter>
  );
}

export default App;
