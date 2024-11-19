import React, { useState } from "react";
import toast from "react-hot-toast";

const FilterSection = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  const applyFilter = () => {
    if(endDate<startDate){
      toast.error("please add the valid filter")
    }
    onFilterChange(startDate,endDate);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Filter by Date
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-gray-600"
          >
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            name="startDate"
            value={startDate}
            onChange={handleDateChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="end-date"
            className="block text-sm font-medium text-gray-600"
          >
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            name="endDate"
            value={endDate}
            onChange={handleDateChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        onClick={applyFilter}
        className="w-full py-2 bg-blue-600 text-white rounded-md text-sm font-medium mt-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default FilterSection;
