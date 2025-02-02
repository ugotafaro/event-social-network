import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import Event from "event/Event";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import EventDetail from "./components/EventDetail";
import LikedEvent from "./components/LikedEvent";
import Profile from "./components/profileSetting";
import { getUserAuthenticated } from "./services/auth.service";
import Loading from "./components/Loading";
import LikedEvents from "event/LikedEvents";
import { getEventById } from "./services/events.service";

function Layout({ user, loading }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [eventsLiked, setEventsLiked] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);

  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/signup";

  const eventsLikedIds = user ? user.likedEvents : [];

  useEffect(() => {
    eventsLikedIds.forEach(async (id) => {
      await getEventById(id).then((event) => {
        setEventsLiked((prev) => [...prev, event]);
      });
    });
  }, [user, eventsLikedIds]);

  const handleLikeEvent = (event) => {
    if (!eventsLiked.find((e) => e._id === event._id)) {
      setEventsLiked((prev) => [...prev, event]);
    }
  };
  const handleUnlikeEvent = (event) => {
    setEventsLiked((prev) => prev.filter((e) => e._id !== event._id));
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

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
      <div className={hideSidebar ? "w-full" : "sm:ml-64"}>
        <Routes>
          <Route
            path="/"
            element={
              <Event
                handleLikeEvent={handleLikeEvent}
                handleUnlikeEvent={handleUnlikeEvent}
                user={user}
                eventsLiked={eventsLiked}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/event/:id" element={<EventDetail />} />
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
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    getUserAuthenticated()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.error("Error getting authenticated user: ", error);
      })
      .finally(() => {
        setLoading(false); // Arrête le chargement après la tentative d'auth
      });
  }, []);

  return (
    <BrowserRouter>
      <Layout user={user} loading={loading} />
    </BrowserRouter>
  );
}

export default App;
