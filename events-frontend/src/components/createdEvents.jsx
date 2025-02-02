export default function CreatedEvents({
  user,
  createdEvents,
  eventsLiked,
  handleLikeEvent,
  handleUnlikeEvent,
}) {
  return (
    <div>
      <h1 className="font-bold text-2xl">Created Events</h1>
      <span className="font-semibold text-gray-500">Events you've created</span>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {createdEvents.map((event, index) => (
          <EventCard
            key={index}
            user={user}
            event={event}
            handleLikeEvent={handleLikeEvent}
            handleUnlikeEvent={handleUnlikeEvent}
            eventsLiked={eventsLiked}
          />
        ))}
      </div>
    </div>
  );
}
