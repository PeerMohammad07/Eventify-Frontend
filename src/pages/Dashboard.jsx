import React, { useEffect, useState } from "react";
import Navbar from "@/components/layouts/Navbar.jsx";
import ListingTable from "@/components/Table";
import AddEditEventModal from "@/components/AddEditEventModal";
import { createEvent, editEvent } from "@/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { PlusCircle } from "lucide-react";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [edit, setEdit] = useState(null);
  const user = useSelector((data) => data.user.userData);

  const onClose = () => {
    if(edit){
      setEdit(null)
    }else{
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (edit) {
      setIsModalOpen(true);
    } else {
      setEdit(null)
      setIsModalOpen(false);
    }
  }, [edit]);

  const formatDate = (isoDate)=> {
    if (!isoDate) return null;
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return null; 
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  const onSubmit = async (data) => {
    try {
      data["userId"] = user._id;
      data["date"] = formatDate(data.date)
      const response = await createEvent(data);
      if (response.data.message == "Event created successfully") {
        setEvents((events) => [...events, response.data.data]);
        toast.success(response.data.message);
        onClose();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onEdit = async (data) => {
    try {
      data["userId"] = user._id;
      data["eventId"] = edit._id;
      data["date"] = formatDate(data.date)
      const response = await editEvent(data);
      if (response.data.message == "Event updated successfully") {
        setEdit(null);
        setEvents((events) =>
          events.map((event) =>
            event._id === edit._id ? { ...event, ...response.data.data } : event
          )
        );
        toast.success(response.data.message);
      }
    } catch (error) {
      setEdit(null);
      toast.error(error.response.data.message);
    }
  };

  const addEdit = edit ? onEdit : onSubmit;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <AddEditEventModal
        initialData={edit}
        isOpen={isModalOpen}
        onClose={onClose}
        onSubmit={addEdit}
      />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Your Events
          </h1>
          
          <button
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <PlusCircle className="mr-2" /> Add Event
          </button>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ListingTable 
            setEdit={setEdit} 
            events={events} 
            setEvents={setEvents} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;