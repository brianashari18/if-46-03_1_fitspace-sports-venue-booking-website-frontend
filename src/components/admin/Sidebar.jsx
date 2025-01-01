import React from "react";

const Sidebar = ({ setActivePage, activePage }) => {
    return (
        <div className="w-64 bg-blue-800 text-white h-screen sticky top-0">
            {/* Sidebar Header */}
            <div className="py-4 text-center font-bold text-lg border-b border-blue-600">
                Admin Dashboard
            </div>

            {/* Sidebar Menu */}
            <ul className="mt-4">
                {/* User Management Section */}
                <li
                    className={`py-2 px-4 hover:bg-blue-600 cursor-pointer ${activePage === "User Management" ? "bg-blue-600" : ""}`}
                    onClick={() => setActivePage("User Management")}
                >
                    User Management
                </li>

                {/* Venue Management Section */}
                <li
                    className={`py-2 px-4 hover:bg-blue-600 cursor-pointer ${activePage === "Venue Management" ? "bg-blue-600" : ""}`}
                    onClick={() => setActivePage("Venue Management")}
                >
                    Venue Management
                </li>

                {/* Field Management Section */}
                <li
                    className={`py-2 px-4 hover:bg-blue-600 cursor-pointer ${activePage === "Field Management" ? "bg-blue-600" : ""}`}
                    onClick={() => setActivePage("Field Management")}
                >
                    Field Management
                </li>

                {/* Review Management Section */}
                <li
                    className={`py-2 px-4 hover:bg-blue-600 cursor-pointer ${activePage === "Review Management" ? "bg-blue-600" : ""}`}
                    onClick={() => setActivePage("Review Management")}
                >
                    Review Management
                </li>

                {/* Booking Management Section */}
                <li
                    className={`py-2 px-4 hover:bg-blue-600 cursor-pointer ${activePage === "Booking Management" ? "bg-blue-600" : ""}`}
                    onClick={() => setActivePage("Booking Management")}
                >
                    Booking Management
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
