import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Heart,
  Trash2,
  Pencil,
  Search,
  Filter,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  likeEvent,
  unlikeEvent,
  deleteEvent,
} from "../../services/events.service";
import { useEffect } from "react";

const EventCard = ({
  user,
  event,
  handleLikeEvent,
  handleUnlikeEvent,
  eventsLiked,
  handleModalModify,
  fromCreatedEvents = false,
  onDeleteEvent,
}) => {
  const navigateToEvent = () => {
    window.location.href = `/event/${event._id}`;
  };

  const [isLiked, setIsLiked] = useState(
    eventsLiked.some((e) => e._id === event._id)
  );

  useEffect(() => {
    setIsLiked(eventsLiked.some((e) => e._id === event._id));
  }, [eventsLiked]);

  const handleHeartClick = async (e) => {
    e.stopPropagation();
    if (isLiked) {
      await unlikeEvent(user._id, event._id);
      handleUnlikeEvent(event);
    } else {
      await likeEvent(user._id, event._id);
      handleLikeEvent(event);
    }
    setIsLiked(!isLiked);
  };

  const date = new Date(event.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDeleteEvent = async (e, event) => {
    e.stopPropagation();
    await deleteEvent(event._id)
      .then(() => {
        onDeleteEvent(event);
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const formattedTime = moment(date).format("h:mm A");
  return (
    <div
      className="relative bg-slate-100 cursor-pointer rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
      onClick={navigateToEvent}
    >
      {fromCreatedEvents && (
        <div className="flex items-center gap-2 absolute top-2 right-2 ">
          <div
            className=" bg-white hover:bg-slate-200 rounded-full p-2"
            onClick={(e) => handleModalModify(e, event)}
          >
            <Pencil className="w-4 h-4" />
          </div>
          <div
            className=" bg-white hover:bg-slate-200 rounded-full p-2"
            onClick={(e) => handleDeleteEvent(e, event)}
          >
            <Trash2 className="w-4 h-4" />
          </div>
        </div>
      )}
      <img
        src={`http://localhost:4000${event.image}`}
        alt={event.title}
        className="w-full h-32 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-2">{event.title}</h2>
          <motion.div
            className="w-6 h-6 cursor-pointer"
            onClick={handleHeartClick}
            animate={{ scale: isLiked ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Heart
              className={`w-6 h-6 hover:scale-110 transition-colors duration-300 ${
                isLiked ? "text-red-500" : "text-gray-400"
              }`}
              fill={isLiked ? "red" : "none"}
            />
          </motion.div>
        </div>

        <p className="text-gray-700 mb-2">{event.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 ">
            <Calendar className="w-4 h-4" />
            <p className="text-gray-500">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <p className="text-gray-500">{formattedTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <p className="text-gray-500">{event.location}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
