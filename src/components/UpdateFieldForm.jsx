import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

const UpdateFieldForm = ({ field, onSubmit, onCancel }) => {
    const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

    const [removedImages, setRemovedImages] = useState([]);

    const [formData, setFormData] = useState({
        price: field.price || "",
        type: field.type || "",
        images: field.gallery ? field.gallery.map((item) => item.photo_url) : [], // Existing images
        newImages: [], // For newly added images
    });

    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);

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
            };


            await onSubmit(updatedData);
        } catch (error) {
            console.error("Error updating field:", error);
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
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
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={onCancel}
                    className="text-xl text-gray-600 hover:text-gray-800"
                >
                    <IoArrowBackOutline />
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={uploading}
                    className={`p-2 text-white rounded-lg font-semibold ${
                        uploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {uploading ? "Updating..." : "Save Changes"}
                </button>
            </div>

            <div className="flex items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Update Field</h2>
                    <p className="text-gray-600">Modify your field details</p>
                </div>
            </div>

            {/* Field Details */}
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

            {/* Images Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Field Photos</h3>
                <p className="text-sm text-gray-500 mb-2">
                    Maximum upload size: {MAX_UPLOAD_SIZE / (1024 * 1024)} MB per file.
                </p>
                <div className="flex flex-wrap gap-4">
                    {formData.images.map((image, index) => (
                        <div key={index} className="relative w-24 h-24">
                            <img
                                src={`http://localhost:8080${image}`}
                                alt={`Field ${index}`}
                                className="w-full h-full object-cover rounded-lg shadow"
                            />
                            <button
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
                                onClick={() => handleImageRemove(index, false)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            >
                                x
                            </button>
                        </div>
                    ))}
                    <label
                        className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg cursor-pointer shadow">
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

        </div>
    );
};

export default UpdateFieldForm;
