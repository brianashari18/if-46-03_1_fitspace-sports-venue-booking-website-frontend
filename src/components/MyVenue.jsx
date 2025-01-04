import {useState, useEffect} from "react";
import SideBar from "./SideBar.jsx";
import AddVenueForm from "./AddVenueForm";
import AddFieldForm from "./AddFieldForm";
import VenueService from "../services/venue-service.js";
import UpdateFieldForm from "./UpdateFieldForm.jsx";
import {addField, deleteField, updateField} from "../services/field-service.js";

const ProgressBar = ({value, color}) => {
    const progressBarStyle = {
        width: `${value}%`,
        height: "10px",
        backgroundColor: color,
        borderRadius: "5px",
    };

    return (
        <div className="relative w-full bg-gray-200 rounded-full h-2.5">
            <div style={progressBarStyle}></div>
        </div>
    );
};

const ITEMS_PER_PAGE = 2;

const MyVenue = ({onLogout, user}) => {
    const [venueData, setVenueData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
    const [currentVenueId, setCurrentVenueId] = useState(null);
    const [isUpdateFieldModalOpen, setIsUpdateFieldModalOpen] = useState(false);
    const [currentField, setCurrentField] = useState(null);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                const response = await VenueService.getVenueFromAllOwner(token);
                console.log(`DATA: ${JSON.stringify(response.data)}`);
                setVenueData(response.data);
            } catch (err) {
                setError(err.message || "Failed to load venues.");
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, [user]);

    const totalPages = Math.ceil(venueData.length / ITEMS_PER_PAGE);

    const paginatedData = venueData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleOpenUpdateFieldModal = (venue, field) => {
        setCurrentField(field);
        setCurrentVenueId(venue.id);
        setIsUpdateFieldModalOpen(true);
    };

    const handleCloseUpdateFieldModal = () => {
        setIsUpdateFieldModalOpen(false);
        setCurrentField(null);
    };


    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenFieldModal = (venueId) => {
        setCurrentVenueId(venueId);
        setIsFieldModalOpen(true);
    };

    const handleCloseFieldModal = () => {
        setIsFieldModalOpen(false);
        setCurrentVenueId(null);
    };

    const handleDeleteField = async (venueId, fieldId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this field?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            await deleteField(token, venueId, fieldId); // Tambahkan API untuk deleteField di `VenueService`
            alert("Field deleted successfully.");
            await fetchVenues(); // Refresh data venue
        } catch (error) {
            console.error("Error deleting field:", error);
            alert(error.message || "Failed to delete field.");
        }
    };


    const fetchVenues = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await VenueService.getVenueFromAllOwner(token);
            setVenueData(response.data);
        } catch (err) {
            setError(err.message || "Failed to load venues.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddVenue = async (formData) => {
        try {
            const token = localStorage.getItem("token");
            await VenueService.addVenue(token, formData);
            alert("Venue added successfully.");
            handleCloseModal(); // Tutup modal setelah berhasil
            await fetchVenues(); // Refresh data venue
        } catch (error) {
            console.error("Error adding venue:", error);
            alert(error.message || "Failed to add venue.");
        }
    };


    const handleAddField = async (formData) => {
        console.log("New Field Data for Venue ID", currentVenueId, ":", formData);
        const token = localStorage.getItem("token");
        const result = await addField(token, currentVenueId, formData);
        console.log(JSON.stringify(result));
        handleCloseFieldModal();
    };

    const handleDeleteVenue = async (venueId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this venue?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            await VenueService.deleteVenue(token, venueId);
            setVenueData((prevData) => prevData.filter((venue) => venue.id !== venueId));
            alert("Venue deleted successfully.");
        } catch (err) {
            console.error("Error deleting venue:", err);
            alert(err.message || "Failed to delete the venue.");
        }
    };

    const handleAddFieldSuccess = async () => {
        handleCloseFieldModal(); // Tutup modal
        await fetchVenues(); // Refresh data venue
    };


    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    if (venueData.length === 0) {
        return (
            <div className="flex min-h-screen bg-[#F5F5F5]">
                <div className="flex-shrink-0 w-64">
                    <SideBar onLogout={onLogout}/>
                </div>
                <div className="flex flex-grow items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-700 mb-4">No Venues Found</h1>
                        <p className="text-gray-500 mb-6">
                            You don’t have any venues yet. Start by adding one!
                        </p>
                        <button
                            type="button"
                            onClick={handleOpenModal}
                            className="p-3 rounded-lg bg-[#E6FDA3] text-[#738ffd] font-semibold hover:bg-[#F2FA5A] transition"
                        >
                            Add Venue
                        </button>
                    </div>
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white w-full max-w-4xl h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
                            <AddVenueForm
                                onSubmit={handleAddVenue}
                                onCancel={handleCloseModal}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex justify-start min-h-screen bg-[#F5F5F5]">
            <SideBar onLogout={onLogout}/>

            <div className="p-6 w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-black">Venue</h1>
                    <button
                        onClick={handleOpenModal}
                        type="button"
                        className="p-3 rounded-lg bg-[#E6FDA3] text-[#738ffd] font-semibold hover:bg-[#F2FA5A] transition"
                    >
                        Add Venue
                    </button>
                </div>

                {paginatedData.length === 0 ? (
                    <div className="flex justify-center items-center text-gray-500">
                        <p>No venues available on this page.</p>
                    </div>
                ) : (
                    paginatedData.map((venue) => (
                        <div key={venue.id} className="bg-white rounded-lg shadow-xl mb-6">
                            <div className="relative w-full h-96 rounded-lg overflow-hidden opacity-90">
                                <img
                                    src={venue.fields.length > 0 && venue.fields[0].gallery.length > 0 ? `http://localhost:8080${venue.fields[0].gallery[0].photo_url}` : "https://staticg.sportskeeda.com/editor/2022/11/a9ef8-16681658086025-1920.jpg"}
                                    alt={venue.name}
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center p-4">
                                    <h2 className="text-white text-4xl font-bold">{venue.name}</h2>
                                </div>
                            </div>

                            <div className="p-8 relative">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold">{venue.name}</h3>
                                        <p className="text-gray-500">{venue.city_or_regency}, {venue.province}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteVenue(venue.id)}
                                        className="p-2 text-white bg-red-500 rounded hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div
                                    className="flex items-center justify-between w-full max-w-4xl mx-auto mb-6 space-x-8">
                                    {(() => {
                                        const allReviews = venue.fields.flatMap((field) => field.reviews || []);
                                        const totalReviews = allReviews.length;
                                        const averageRating =
                                            totalReviews > 0
                                                ? allReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
                                                : 0;

                                        return (
                                            <>
                                                <div className="flex flex-col items-center space-y-2 w-1/3">
                                                    <span className="text-4xl font-bold text-black">
                                                        {averageRating.toFixed(1)}
                                                    </span>
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, index) => (
                                                            <span
                                                                key={index}
                                                                className={`text-xl ${
                                                                    index < Math.floor(averageRating)
                                                                        ? "text-yellow-500"
                                                                        : "text-gray-300"
                                                                }`}
                                                            >
                                                                ★
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <span className="text-gray-500 text-sm">
                                                        based on {totalReviews} reviews
                                                    </span>
                                                </div>

                                                <div className="flex flex-col w-2/3 space-y-4">
                                                    {venue.fields && venue.fields.length > 0 ? (
                                                        venue.fields.map((field) => {
                                                            const fieldReviews = field.reviews || [];
                                                            const fieldTotalReviews = fieldReviews.length;
                                                            const fieldAverageRating =
                                                                fieldTotalReviews > 0
                                                                    ? fieldReviews.reduce((sum, review) => sum + review.rating, 0) / fieldTotalReviews
                                                                    : 0;

                                                            const getProgressBarColor = (rating) => {
                                                                if (rating >= 4) return "#4caf50";
                                                                if (rating >= 3) return "#FFC107";
                                                                if (rating >= 2) return "#FF9800";
                                                                return "#F44336";
                                                            };

                                                            return (
                                                                <div
                                                                    key={field.id}
                                                                    className="flex items-center space-x-4"
                                                                >
                                                                    <span className="text-gray-700 text-sm w-24">
                                                                        {field.type}
                                                                    </span>
                                                                    <div className="flex-1">
                                                                        <ProgressBar
                                                                            value={fieldAverageRating * 20}
                                                                            color={getProgressBarColor(fieldAverageRating)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    ) : (
                                                        <div className="text-gray-500 text-sm text-center">
                                                            No fields added yet.
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>

                                <div
                                    className="flex justify-center w-full mt-6 p-3 rounded-lg bg-[#E6FDA3] text-[#738ffd] font-semibold">
                                    Available Fields
                                </div>

                                <div className="my-16 grid grid-cols-2 gap-4">
                                    {venue.fields && venue.fields.length > 0 ? (
                                        venue.fields.map((field) => (
                                            <div
                                                key={field.id}
                                                className="border rounded-lg shadow p-4 flex flex-col items-center relative cursor-pointer"
                                                onClick={() => handleOpenUpdateFieldModal(venue, field)} // Klik langsung untuk edit
                                            >
                                                {/* Tombol Delete */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Mencegah buka modal saat klik delete
                                                        handleDeleteField(venue.id, field.id);
                                                    }}
                                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none shadow-md transition"
                                                >
                                                    ✕
                                                </button>

                                                <img
                                                    src={`http://localhost:8080${field.gallery[0]?.photo_url}`}
                                                    alt={field.type}
                                                    className="w-full h-60 object-cover rounded mb-4"
                                                />
                                                <h3 className="font-bold text-lg mb-2">{field.type}</h3>
                                                <p className="text-gray-500">Rp {field.price.toLocaleString()}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-2 text-center text-gray-500">
                                            No fields available.
                                        </div>
                                    )}
                                </div>


                                <button
                                    onClick={() => handleOpenFieldModal(venue.id)}
                                    className="absolute bottom-4 right-4 p-3 rounded-lg bg-[#E6FDA3] text-[#738ffd] font-semibold shadow-lg hover:bg-[#F2FA5A] transition"
                                >
                                    Add Field
                                </button>
                            </div>
                        </div>

                    ))
                )}

                <div className="flex justify-between items-center mt-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={handlePrev}
                        className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={handleNext}
                        className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-4xl h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
                        <AddVenueForm
                            onSubmit={handleAddVenue}
                            onCancel={handleCloseModal}
                        />
                    </div>
                </div>
            )}

            {isFieldModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-4xl h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
                        <AddFieldForm
                            onSubmit={handleAddField}
                            onCancel={handleCloseFieldModal}
                            venueId={currentVenueId}
                            onSuccess={handleAddFieldSuccess} // Tambahkan ini
                        />
                    </div>
                </div>
            )}

            {isUpdateFieldModalOpen && currentField && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-4xl h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
                        <UpdateFieldForm
                            field={currentField}
                            venue={currentVenueId}
                            token={localStorage.getItem("token")}
                            onSubmit={async (formData) => {
                                if (!currentVenueId) {
                                    alert("Venue ID is missing. Cannot update field.");
                                    return;
                                }
                                try {
                                    const token = localStorage.getItem("token");
                                    await updateField(token, currentVenueId, currentField.id, formData); // Fungsi updateField di service
                                    alert("Field updated successfully.");
                                    await fetchVenues(); // Refresh data venue
                                    handleCloseUpdateFieldModal(); // Tutup modal
                                } catch (error) {
                                    console.error("Error updating field:", error);
                                    alert(error.message || "Failed to update field.");
                                }
                            }}
                            onCancel={handleCloseUpdateFieldModal}
                        />
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyVenue;
