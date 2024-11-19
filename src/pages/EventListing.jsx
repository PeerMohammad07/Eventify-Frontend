import React from "react";
import { Calendar, MapPin } from "lucide-react";

const EventListings = ({ events }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            {/* Event Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {event.title}
            </h3>

            {/* Event Description */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {event.description || "No description available."}
            </p>

            {/* Event Location and Date */}
            <div className="flex justify-between text-xs text-gray-500">
              {/* Location */}
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>{event.location || "Not specified"}</span>
              </div>

              {/* Date */}
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventListings;
