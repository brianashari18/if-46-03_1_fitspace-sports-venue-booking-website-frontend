import React, { useState } from "react";
import Sidebar from "./Sidebar";
import UserManagement from "./UserManagement";
import VenueManagement from "./VenueManagement";

const Dashboard = () => {
    const [activePage, setActivePage] = useState("Dashboard");

    const token = localStorage.getItem("token");

    const renderContent = () => {
        switch (activePage) {
            case "User Management":
                return <UserManagement token={token} />;
            case "Venue Management":
                return <VenueManagement token={token} />;
            case "Field Management":
                return <div>Field Management Content</div>;
            default:
                return (
                    <div className="p-6">
                        <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
                        <p className="mt-4">Select an option from the sidebar to get started.</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <Sidebar setActivePage={setActivePage} activePage={activePage} />

            {/* Main Content */}
            <div className="flex-1 p-6">
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
