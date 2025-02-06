import React, { useEffect, useState } from "react";
import moment from "moment";
import { createEvent, updateEvent } from "../../events.service";

export default function ModifyEventModal({
  isOpen,
  eventToModify,
  handleModalModify,
  onEventUpdated,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [time, setTime] = useState("12:00");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (eventToModify) {
      setTitle(eventToModify.title);
      setDescription(eventToModify.description);
      setLocation(eventToModify.location);
      setDate(moment(eventToModify.date).format("YYYY-MM-DD"));
      setTime(moment(eventToModify.date).format("HH:mm"));
    }
  }, [eventToModify]);

  const converttoISO = (date, time) => {
    if (!date || !time) return null;

    const dateTimeString = `${date}T${time}:00.000Z`;

    const dateObj = new Date(dateTimeString);

    return dateObj.toISOString();
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data.imageUrl;
    } else {
      throw new Error("Error uploading image");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const onChangeDate = (e) => {
    const newDate = moment(new Date(e.target.value)).format("YYYY-MM-DD");
    setDate(newDate);
  };

  const onSubmit = () => {
    return async (e) => {
      e.preventDefault();
      try {
        const dateTime = converttoISO(date, time);

        const updatedEvent = {
          ...eventToModify,
          title,
          description,
          location,
          date: dateTime,
        };

        // Si une nouvelle image est sélectionnée, on l'upload
        if (image) {
          const imageUrl = await uploadImage(image);
          updatedEvent.image = imageUrl;
        }

        // Appeler la fonction updateEvent pour mettre à jour l'événement
        await updateEvent(updatedEvent)
          .then((updatedEventData) => {
            onEventUpdated(updatedEventData);
            handleModalModify(e, null);
          })
          .catch((error) => {
            console.error("Error updating event: ", error);
          });
      } catch (error) {
        console.error("Unexpected error: ", error);
      }
    };
  };

  return (
    <div
      id="crud-modal"
      tabindex="-1"
      aria-hidden="true"
      className={`${
        !isOpen ? "hidden" : ""
      } overflow-y-auto overflow-x-hidden fixed ml-96 mt-10 top-0 left-56 right-0  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-[80vh]`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Modify Event
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-toggle="crud-modal"
              onClick={(e) => handleModalModify(e, null)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form className="p-4 md:p-5" onSubmit={onSubmit()}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Title of the event"
                  required=""
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Write event description here"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* Location  */}
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  for="location"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Type location"
                  required=""
                />
              </div>
            </div>

            {/* Date and time */}
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  for="date"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required=""
                  value={date}
                  onChange={onChangeDate}
                />
              </div>

              <div className="col-span-2">
                <label
                  for="time"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required=""
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              {/* Upload image */}
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
            </div>

            <button
              type="submit"
              className=" text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Create the event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
