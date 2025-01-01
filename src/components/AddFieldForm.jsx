import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig"; // Import Firebase storage
import { v4 as uuidv4 } from "uuid"; // For unique file names
import headerImage from "../assets/add-venue-icon.png";

const AddFieldForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        price: "",
        type: "",
        images: [], // Store image files temporarily
    });

    const [errors, setErrors] = useState({}); // State for validation errors
    const [uploading, setUploading] = useState(false); // State to track upload progress

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on input change
    };

    const handleImageAdd = (file) => {
        if (file) {
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, file], // Add file to images array
            }));
        }
    };

    const handleImageRemove = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index), // Remove file by index
        }));
    };

    const uploadImages = async (files) => {
        const uploadedUrls = [];
        for (const file of files) {
            const storageRef = ref(storage, `fields/${uuidv4()}-${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            const url = await new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Upload is ${progress}% done`);
                        setUploading(true);
                    },
                    (error) => {
                        console.error("Upload failed:", error);
                        setUploading(false);
                        reject(error);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(downloadURL);
                    }
                );
            });
            uploadedUrls.push(url);
        }
        setUploading(false);
        return uploadedUrls;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        const newErrors = {};
        if (!formData.price.trim()) newErrors.price = "Price is required";
        if (!formData.type.trim()) newErrors.type = "Type is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setUploading(true);
            const uploadedUrls = await uploadImages(formData.images); // Upload all images
            const gallery = uploadedUrls.map((url) => ({ photo_url: url })); // Format for backend

            const payload = {
                price: parseInt(formData.price, 10),
                type: formData.type,
                gallery,
            };

            await onSubmit(payload); // Send to backend
        } catch (error) {
            console.error("Error uploading images or submitting form:", error);
        } finally {
            setUploading(false);
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
                        uploading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                    }`}
                >
                    {uploading ? "Uploading..." : "Save Field"}
                </button>
            </div>

            {/* Header */}
            <div className="flex items-start mb-6">
                <img src={headerImage} alt="Header" className="w-16 h-16 mr-4" />
                <div>
                    <h2 className="text-2xl font-bold">Add Field</h2>
                    <p className="text-gray-600">Fill in your field details</p>
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
                <div className="flex space-x-4 flex-wrap">
                    {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={URL.createObjectURL(image)} // Display local image preview
                                alt={`Field ${index}`}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                            <button
                                onClick={() => handleImageRemove(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            >
                                x
                            </button>
                        </div>
                    ))}
                    <label className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg cursor-pointer">
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

export default AddFieldForm;
