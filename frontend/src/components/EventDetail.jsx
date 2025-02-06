import React from "react";
import { Calendar } from "lucide-react";
import { MapPin } from "lucide-react";
import { Heart } from "lucide-react";
import { Tag } from "lucide-react";
import { useParams } from "react-router-dom";
import { use } from "react";
import { getEventById } from "../services/events.service";
import { useEffect, useState } from "react";
import moment from "moment";
import { getUserById } from "../services/auth.service";
import Loading from "./Loading";
import { motion } from "framer-motion";
import { likeEvent, unlikeEvent } from "../services/events.service";

export default function EventDetail({
  user,
  eventsLiked,
  handleLikeEvent,
  handleUnlikeEvent,
}) {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [creator, setCreator] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventById(id).then((event) => {
      setEvent(event);
    });
  }, []);

  useEffect(() => {
    console.log("Event:", event);
  }, [event]);

  const [isLiked, setIsLiked] = useState(
    eventsLiked.some((e) => e._id === event._id)
  );

  useEffect(() => {
    setIsLiked(eventsLiked.some((e) => e._id === event._id));
  }, [eventsLiked]);

  useEffect(() => {
    if (event?.creator) {
      getUserById(event.creator)
        .then((user) => {
          setCreator(user);
        })
        .catch((error) => {
          console.error("Error getting user by id:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [event]);

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

  const date = new Date(event?.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = moment(date).format("h:mm A");

  return (
    <div>
      <div className="bg-white  rounded-lg p-8">
        <img className="w-full" src={`http://localhost:4000${event.image}`} />

        <div className="text-left ml-5">
          <h1 className="text-xl font-bold   mb-1">{event.title}</h1>

          <div className="flex gap-4 ">
            <div className="flex gap-2 items-center">
              <Calendar className="w-3 h-3" />
              <p className="">{formattedDate}</p>
            </div>
            <div className="flex gap-2 items-center">
              <MapPin className="w-3 h-3" />
              <p className="">{event.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-2/3">
          <div className="mt-4 bg-white text-slate-900 px-4 py-5 rounded-lg shadow-lg">
            <p className="font-bold text-2xl">About the event</p>
            <p className="mt-3 text-gray-500 font-semibold">
              {event.description}
            </p>
            <div className="flex mt-4 gap-4">
              {creator.image ? (
                <img
                  className="w-13 h-13 mb-3 rounded-full shadow-lg"
                  src={`http://localhost:4000${creator.image}`}
                  alt="Bonnie image"
                />
              ) : (
                <img
                  className="w-13 h-13 mb-3 rounded-full shadow-lg"
                  src="/me.jpeg"
                  alt="Bonnie image"
                />
              )}
              <div>
                <p className="font-bold">Organized by</p>
                <p className="font-semibold text-gray-500">
                  {creator.firstName} {creator.lastName}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/3">
          <div className="flex flex-col mt-4 bg-white text-slate-900 px-6 py-5 rounded-lg shadow-lg">
            <motion.button
              className="flex items-center justify-center gap-2 border border-gray-300 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
              onClick={handleHeartClick}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Heart
                className={`w-6 h-6 hover:scale-110 transition-colors duration-300 ${
                  isLiked ? "text-red-500" : "text-gray-400"
                }`}
                fill={isLiked ? "red" : "none"}
              />
              <span className="text-center">Save event</span>
            </motion.button>
          </div>

          <div className="flex flex-col mt-4 bg-white text-slate-900 px-6 py-5 rounded-lg shadow-lg">
            <span className="font-bold text-xl">Event details</span>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex gap-2">
                <Calendar className="w-4 h-4 mt-2 text-blue-600" />
                <div className="flex flex-col">
                  <span className="font-semibold">Date and time</span>
                  <span>{formattedDate}</span>
                  <span>{formattedTime}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 mt-2 text-blue-600" />
                <div className="flex flex-col">
                  <span className="font-semibold">Location</span>
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
