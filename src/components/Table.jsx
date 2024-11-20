import React, { useEffect, useState } from "react";
import { deleteEvent, editEvent, getAllEvents } from "@/api/userApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { SimpleDropdown } from "./DropDown";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function ListingTable({ events, setEvents, setEdit }) {
  const user = useSelector((data) => data.user.userData);

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        const response = await getAllEvents(user._id);
        setEvents(response.data.data);
      }
    };
    fetch();
  }, []);

  const truncateText = (text, maxLength = 30) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const onDelete = (id) => {
    try {
      Swal.fire({
        title: "Delete Event",
        text: "Are you sure you want to delete this event?",
        icon: "warning",
        confirmButtonText: "Yes, Delete",
        confirmButtonColor: "#d33",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "gray",
      })
        .then(async (response) => {
          if (response.isConfirmed) {
            const response = await deleteEvent(user._id, id);
            if (response.data.message == "Event deleted successfully") {
              setEvents((prevEvents) =>
                prevEvents.filter((event) => event._id !== id)
              );
              toast.success(response.data.message);
            }
          }
        })
        .catch(() => {
          // do nothing
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onEdit = async (data) => {
    setEdit(data);
  };

  return (
    <div className="w-full overflow-x-auto">
      {events.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">
            No events found. Please add some events.
          </p>
        </div>
      ) : (
        <Table className="min-w-full">
          <TableCaption>A list of your upcoming events</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] md:w-[250px]">Title</TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="hidden lg:table-cell">Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event._id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {truncateText(event.description)}
                </TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {event.location}
                </TableCell>
                <TableCell className="flex justify-end items-center">
                  <SimpleDropdown
                    onDelete={onDelete}
                    event={event}
                    onEdit={onEdit}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
