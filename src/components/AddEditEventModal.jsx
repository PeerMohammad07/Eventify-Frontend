import React, { useEffect } from "react";
import Modal from "react-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AddEditEventModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  Modal.setAppElement("#root");

  const eventSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),
    date: z
      .string()
      .nonempty("Date is required")
      .refine((value) => new Date(value) > new Date(), {
        message: "Date must be in the future",
      }),
    location: z.string().min(5, "Location must be at least 5 characters long"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      date: "",
      location: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data); 
    reset({ title: null, description: null, date: null, location: null }); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Event" : "Add New Event"}
        </h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <Input
              type="text"
              placeholder="Event Title"
              {...register("title")}
              className="w-full border p-2 rounded-md"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Textarea
              placeholder="Event Description"
              {...register("description")}
              className="w-full border p-2 rounded-md"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <Input
              type="date"
              {...register("date")}
              className="w-full border p-2 rounded-md"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <Input
              type="text"
              placeholder="Event Location"
              {...register("location")}
              className="w-full border p-2 rounded-md"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-2">
            <Button type="submit" className="mr-2">
              {initialData ? "Update Event" : "Add Event"}
            </Button>
            <Button
              type="button" 
              onClick={(e) => {
                e.stopPropagation();
                reset({
                  title: "",
                  description: "",
                  date: "",
                  location: "",
                })                
                onClose();
              }}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddEditEventModal;
