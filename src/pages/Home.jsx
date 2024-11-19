import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar.jsx";
import FilterSection from "./Filter";
import EventListings from "./EventListing";
import { useSelector } from "react-redux";
import { getAllEvents } from "@/api/userApi.js";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const user = useSelector((data) => data.user?.userData);

  const fetch = async () => {
    if (user?._id) {
      const response = await getAllEvents(user._id, debouncedSearch, filter, page);
      setEvents(response.data.data);
      setTotalPages(Math.ceil(response.data.totalEvents / 6));  // Update total pages for pagination
      console.log(response);
    }
  };

  useEffect(() => {
    fetch();
  }, [user, filter, debouncedSearch, page]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const onFilterChange = (startDate, endDate) => {
    setFilter({
      startDate,
      endDate,
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <div className="bg-blue-100 pb-10">
        <Navbar />

        <div className="flex flex-col lg:flex-row justify-around items-center text-center lg:text-left px-4">
          <h1 className="font-bold text-xl lg:text-3xl mb-4 lg:mb-0">
            Welcome to <span className="text-blue-700">Eventify</span>, find
            your events
          </h1>
          <img
            src="home-image.png"
            className="h-24 w-36 lg:h-48 lg:w-60 object-cover"
            alt="Welcome Illustration"
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-center mt-6 px-4">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value); 
            }}
            type="text"
            className="bg-white text-gray-500 rounded-full py-3 px-6 w-full lg:w-3/4 mb-4 lg:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search based on the event title"
          />
          <button className="flex bg-blue-700 rounded-full text-white py-3 px-6 w-full lg:w-auto lg:ml-4">
            <Search className="me-3" />
            Search
          </button>
        </div>
      </div>

      {user ? (
        <div className="flex flex-col lg:flex-row mt-6">
          <div className="lg:w-1/4 p-4">
            <FilterSection onFilterChange={onFilterChange} />
          </div>
          <div className="lg:w-3/4 p-4">
            <EventListings events={events} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10 px-4 text-center">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-700">
            Please login to see your events.
          </h2>
          <img
            src="login.jpg"
            alt="Login to see events"
            className="h-32 w-32 lg:h-48 lg:w-48 mt-5"
          />
        </div>
      )}

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                />
              </PaginationItem>

              {/* Display page numbers dynamically */}
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={index + 1 === page}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default Home;
