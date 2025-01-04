// UpdateFieldForm.jsx
import React, { useState, useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

const timeSlots = [
    { time: "06:00 - 07:00" },
    { time: "07:00 - 08:00" },
    { time: "08:00 - 09:00" },
    { time: "09:00 - 10:00" },
    { time: "10:00 - 11:00" },
    { time: "11:00 - 12:00" },
    { time: "12:00 - 13:00" },
    { time: "13:00 - 14:00" },
    { time: "14:00 - 15:00" },
    { time: "15:00 - 16:00" },
    { time: "16:00 - 17:00" },
    { time: "17:00 - 18:00" },
    { time: "18:00 - 19:00" },
    { time: "19:00 - 20:00" },
    { time: "20:00 - 21:00" },
    { time: "21:00 - 22:00" },
    { time: "22:00 - 23:00" },
    { time: "23:00 - 00:00" },
];

function getMonthName(monthIndex) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return monthNames[monthIndex];
}

const UpdateFieldForm = ({ field, venueId, token, onSubmit, onCancel }) => {
    const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10 MB

    const [removedImages, setRemovedImages] = useState([]);

    const [formData, setFormData] = useState({
        price: field.price || "",
        type: field.type || "",
        images: field.gallery ? field.gallery.map((item) => item.photo_url) : [], // Existing images
        newImages: [], // For newly added images
        fieldSchedules: field.fieldSchedules || [], // Existing schedules
    });

    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);

    // Group schedules by date
    const groupedSchedules = formData.fieldSchedules.reduce((acc, schedule) => {
        const date = schedule.schedule.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(schedule);
        return acc;
    }, {});

    // Generate weekly schedule based on existing schedules
    const generateWeeklySchedule = () => {
        const uniqueDates = Object.keys(groupedSchedules).sort();
        const schedule = uniqueDates.map((date) => {
            const day = new Date(date);
            const dayOfMonth = String(day.getDate()).padStart(2, '0');
            const month = String(day.getMonth() + 1).padStart(2, '0');
            const formattedDate = `${day.getFullYear()}-${month}-${dayOfMonth}`;
            const formattedDay = `${dayOfMonth} ${getMonthName(day.getMonth())}`;
            const dayName = day.toLocaleDateString('en-US', { weekday: 'long' });

            return {
                date: formattedDate,
                day: formattedDay,
                dayName: dayName,
            };
        });
        return schedule;
    };

    const scheduleData = generateWeeklySchedule();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
            newErrors.price = "Price must be a positive number";
        }
        if (!formData.type.trim()) newErrors.type = "Type is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setUploading(true);

            const updatedData = {
                price: parseInt(formData.price, 10),
                type: formData.type,
                gallery: formData.images,
                newImages: formData.newImages,
                removedImages,
                fieldSchedules: formData.fieldSchedules,
            };

            await onSubmit(updatedData);
        } catch (error) {
            console.error("Error updating field:", error);
            alert("Failed to update field.");
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleScheduleStatusChange = (scheduleId) => {
        const updatedSchedules = formData.fieldSchedules.map((schedule) => {
            if (schedule.id === scheduleId) {
                schedule.status = schedule.status === "Available" ? "Not Available" : "Available";
            }
            return schedule;
        });

        setFormData((prevData) => ({
            ...prevData,
            fieldSchedules: updatedSchedules,
        }));
    };

    const handleImageAdd = (file) => {
        if (file.size > MAX_UPLOAD_SIZE) {
            alert(`File size exceeds the maximum limit of ${MAX_UPLOAD_SIZE / (1024 * 1024)} MB.`);
            return;
        }
        setFormData((prev) => ({
            ...prev,
            newImages: [...prev.newImages, file],
        }));
    };

    const handleImageRemove = (index, isExisting) => {
        if (isExisting) {
            setFormData((prev) => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index),
            }));
            setRemovedImages((prev) => [...prev, formData.images[index]]);
        } else {
            setFormData((prev) => ({
                ...prev,
                newImages: prev.newImages.filter((_, i) => i !== index),
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-xl text-gray-600 hover:text-gray-800"
                >
                    <IoArrowBackOutline />
                </button>
                <button
                    type="submit"
                    disabled={uploading}
                    className={`p-2 text-white rounded-lg font-semibold ${
                        uploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {uploading ? "Updating..." : "Save Changes"}
                </button>
            </div>

            {/* Price and Type */}
            <div className="mb-8">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Type
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">Select a type</option>
                            <option value="Futsal">Futsal</option>
                            <option value="Basketball">Basketball</option>
                            <option value="Badminton">Badminton</option>
                            <option value="Volleyball">Volleyball</option>
                        </select>
                        {errors.type && (
                            <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Field Photos */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Field Photos</h3>
                <div className="flex flex-wrap gap-4">
                    {formData.images.map((image, index) => (
                        <div key={index} className="relative w-24 h-24">
                            <img
                                src={`http://localhost:8080${image}`}
                                alt={`Field ${index}`}
                                className="w-full h-full object-cover rounded-lg shadow"
                            />
                            <button
                                type="button"
                                onClick={() => handleImageRemove(index, true)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            >
                                x
                            </button>
                        </div>
                    ))}
                    {formData.newImages.map((image, index) => (
                        <div key={index} className="relative w-24 h-24">
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`New Field ${index}`}
                                className="w-full h-full object-cover rounded-lg shadow"
                            />
                            <button
                                type="button"
                                onClick={() => handleImageRemove(index, false)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            >
                                x
                            </button>
                        </div>
                    ))}
                    <label
                        className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg cursor-pointer shadow"
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files[0]) {
                                    handleImageAdd(e.target.files[0]);
                                }
                            }}
                            className="hidden"
                        />
                        Add Photo
                    </label>
                </div>
            </div>

            {/* Field Schedules */}
            <div className="mb-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                    Field Schedules
                </h3>
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        {/* Header: Days of the Week */}
                        <div className="grid grid-cols-9 gap-2 mb-4">
                            <div className="font-medium text-center">Time</div>
                            {scheduleData.map((day) => (
                                <div key={day.date} className="text-center bg-[#F5F5F5] p-4 rounded-lg">
                                    <div className="font-medium">{day.day}</div>
                                    <div className="text-sm text-gray-500">{day.dayName}</div>
                                </div>
                            ))}
                        </div>

                        {/* Body: Time Slots */}
                        {timeSlots.map((slot, idx) => (
                            <div key={idx} className="grid grid-cols-9 gap-2 mb-2">
                                {/* Time Slot Column */}
                                <div className="font-medium text-center">{slot.time}</div>
                                {/* Schedule Columns for Each Day */}
                                {scheduleData.map((day, i) => {
                                    // Find the schedule that matches both timeSlot and date
                                    const schedule = formData.fieldSchedules.find(
                                        (s) =>
                                            s.schedule.date === day.date &&
                                            s.schedule.time_slot === slot.time
                                    );

                                    // Determine availability based on status
                                    const isAvailable =
                                        schedule?.status.toLowerCase() === "available";

                                    return (
                                        <div
                                            key={i}
                                            className={`p-2 rounded-lg flex flex-col justify-center items-center transition-colors cursor-pointer ${
                                                isAvailable
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-900"
                                            }`}
                                            onClick={() =>
                                                schedule && handleScheduleStatusChange(schedule.id)
                                            }
                                            title={`Click to toggle status`}
                                        >
                                            {/* Status */}
                                            <span className="text-sm font-medium">
                        {schedule?.status || "Not Available"}
                      </span>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default UpdateFieldForm;
