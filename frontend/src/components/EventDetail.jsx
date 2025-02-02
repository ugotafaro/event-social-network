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

export default function EventDetail() {
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
    if (event?.creator) {
      // Vérifiez si l'ID du créateur est défini
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

  const date = new Date(event?.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = moment(date).format("h:mm A");

  if (loading) {
    return <div></div>;
  }

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
              <img
                className="w-13 h-13 mb-3 rounded-full shadow-lg"
                src="/me.jpeg"
                alt="Bonnie image"
              />
              <div>
                <p className="font-bold">Organized by</p>
                <p className="font-semibold text-gray-500">{creator.email}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-4 bg-white text-slate-900 px-6 py-5 rounded-lg shadow-lg">
            <span className="text-2xl font-bold">Comments</span>
            <div className="flex gap-4 mt-4">
              <img
                className="w-10 h-10 mb-3 rounded-full shadow-lg"
                src="/me.jpeg"
                alt="Bonnie image"
              />
              <textarea
                name="share_comment"
                id="share_comment"
                placeholder="Share your thoughts"
                className="w-full h-20 p-2 rounded-lg border border-gray-300 outline-none focus:ring-0 focus:outline-none"
              ></textarea>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="justify-end bg-blue-600 text-white px-4 py-3 rounded-lg">
                Post Comment
              </button>
            </div>

            <div className="mt-4">
              <div className="flex gap-4">
                <img
                  className="w-10 h-10 mb-3 rounded-full shadow-lg"
                  src="/me.jpeg"
                  alt="Bonnie image"
                />
                <div className="flex flex-col bg-slate-100 px-4 py-3 rounded-lg">
                  <span className="font-semibold text-xl">Emma Wilson</span>
                  <span className="text-gray-500 font-semibold">
                    5 hours ago
                  </span>
                  <p className="mt-2">
                    Will there be virtual attendance options available?
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex gap-4">
                <img
                  className="w-10 h-10 mb-3 rounded-full shadow-lg"
                  src="/me.jpeg"
                  alt="Bonnie image"
                />
                <div className="flex flex-col bg-slate-100 px-4 py-3 rounded-lg">
                  <span className="font-semibold text-xl">Michel Chen</span>
                  <span className="text-gray-500 font-semibold">
                    2 hours ago
                  </span>
                  <p className="mt-2">
                    Looking forward to this event! The speaker lineup looks
                    amazing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/3">
          <div className="flex flex-col mt-4 bg-white text-slate-900 px-6 py-5 rounded-lg shadow-lg">
            <button className="flex items-center justify-center gap-2 border border-gray-300 p-2 rounded-lg">
              <Heart className="w-5 h-5" />
              <span className="text-center">Save event</span>
            </button>
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

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex gap-2">
                <Tag className="w-4 h-4 mt-2 text-blue-600" />
                <div className="flex flex-col">
                  <span className="font-semibold">Price</span>
                  <span>$299 - Early Bird</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
