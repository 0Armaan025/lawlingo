"use client";
import TypingTest from '@/components/typingtest/Typingtest';
import { User, Book, Keyboard, LogOut, ChevronRight, Home, Settings, Moon } from 'lucide-react';
import React, { useState } from 'react';

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleSectionClick = (section: any) => {
        setActiveSection(section);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            {/* Left sidebar */}
            <div className={`w-72 ${isDarkMode ? 'bg-gray-800' : 'bg-amber-200/30'} border-r ${isDarkMode ? 'border-r-gray-700' : 'border-r-amber-500'} flex flex-col`}>
                {/* App Title */}
                <div className={`p-6 ${isDarkMode ? 'text-gray-200' : 'text-amber-800'} font-bold text-2xl flex items-center justify-between`}>
                    <span>TypeMaster</span>
                    <Moon
                        onClick={toggleDarkMode}
                        className={`cursor-pointer ${isDarkMode ? 'text-yellow-400' : 'text-gray-600'}`}
                        size={20}
                    />
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-4 py-6">
                    <div className="space-y-4">


                        <NavItem
                            icon={<User size={22} />}
                            title="Profile"
                            active={activeSection === 'profile'}
                            onClick={() => handleSectionClick('profile')}
                            isDarkMode={isDarkMode}
                        />

                        <NavItem
                            icon={<Book size={22} />}
                            title="Modules"
                            active={activeSection === 'modules'}
                            onClick={() => handleSectionClick('modules')}
                            isDarkMode={isDarkMode}
                        />

                        <NavItem
                            icon={<Keyboard size={22} />}
                            title="Typing Test"
                            active={activeSection === 'typing-test'}
                            onClick={() => handleSectionClick('typing-test')}
                            isDarkMode={isDarkMode}
                        />

                        <NavItem
                            icon={<Settings size={22} />}
                            title="Settings"
                            active={activeSection === 'settings'}
                            onClick={() => handleSectionClick('settings')}
                            isDarkMode={isDarkMode}
                        />
                    </div>
                </nav>

                {/* Logout Button */}
                <div className="p-4">
                    <button
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-lg ${isDarkMode
                            ? 'bg-red-900/30 text-red-300 hover:bg-red-800/50'
                            : 'bg-red-500/10 text-red-600 hover:bg-red-500/20'
                            } transition-colors duration-200`}
                    >
                        <div className="flex items-center">
                            <LogOut size={20} className="mr-3" />
                            <span className="font-medium">Logout</span>
                        </div>
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {activeSection === 'profile' && <ProfileSection isDarkMode={isDarkMode} />}
                {activeSection === 'modules' && <ModulesSection isDarkMode={isDarkMode} />}
                {activeSection === 'typing-test' && <TypingTestSection isDarkMode={isDarkMode} />}
                {activeSection === 'dashboard' && <DashboardSection isDarkMode={isDarkMode} />}
                {activeSection === 'settings' && <SettingsSection isDarkMode={isDarkMode} />}
            </div>
        </div>
    );
};

// Navigation Item Component
const NavItem = ({ icon, title, active, onClick, isDarkMode }: any) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors duration-200 ${active
                ? isDarkMode
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-amber-500/30 text-amber-800'
                : isDarkMode
                    ? 'text-gray-400 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-amber-400/20'
                }`}
        >
            <div className="flex items-center">
                <span className="mr-3">{icon}</span>
                <span className="font-medium">{title}</span>
            </div>
            <ChevronRight size={16} className={active ? 'opacity-100' : 'opacity-0'} />
        </button>
    );
};

// Profile Section
const ProfileSection = ({ isDarkMode }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        username: "johndoe123",
        location: "San Francisco, CA"
    });

    const [editableData, setEditableData] = useState({ ...profileData });

    const handleInputChange = (field: string, value: string) => {
        setEditableData({
            ...editableData,
            [field]: value
        });
    };

    const saveChanges = () => {
        setProfileData({ ...editableData });
        setIsEditing(false);
    };

    const cancelEdit = () => {
        setEditableData({ ...profileData });
        setIsEditing(false);
    };

    // Sample data for modules and cases
    const modulesFinished = [
        { name: "Speed Building I", date: "Apr 8, 2025", score: "95%" },
        { name: "Accuracy Training", date: "Apr 5, 2025", score: "98%" },
        { name: "Programming Syntax", date: "Mar 28, 2025", score: "92%" },
        { name: "Legal Terminology", date: "Mar 15, 2025", score: "89%" }
    ];

    const casesWon = [
        { name: "Speed vs. Accuracy Championship", date: "Apr 3, 2025", reward: "Gold Badge" },
        { name: "Weekly Challenge - Code Typing", date: "Mar 27, 2025", reward: "50 XP" },
        { name: "Team Competition", date: "Mar 20, 2025", reward: "Silver Badge" }
    ];

    return (
        <div className={`p-8 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Profile</h1>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-amber-600 hover:bg-amber-700' : 'bg-amber-500 hover:bg-amber-600'} text-white transition-colors`}
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className="space-x-3">
                        <button
                            onClick={cancelEdit}
                            className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={saveChanges}
                            className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors`}
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>

            <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-md'}`}>
                <div className="flex items-center mb-6">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-amber-600' : 'bg-amber-500'} text-white text-2xl font-bold`}>
                        {profileData.name.split(' ').map(name => name[0]).join('')}
                    </div>
                    <div className="ml-4">
                        {isEditing ? (
                            <input
                                type="text"
                                value={editableData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className={`text-xl font-bold mb-1 px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                            />
                        ) : (
                            <h2 className="text-xl font-bold">{profileData.name}</h2>
                        )}
                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Joined April 2025</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>Personal Information</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</span>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={editableData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className={`w-3/5 px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                                    />
                                ) : (
                                    <span>{profileData.email}</span>
                                )}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Username</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editableData.username}
                                        onChange={(e) => handleInputChange('username', e.target.value)}
                                        className={`w-3/5 px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                                    />
                                ) : (
                                    <span>{profileData.username}</span>
                                )}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Location</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editableData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        className={`w-3/5 px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                                    />
                                ) : (
                                    <span>{profileData.location}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>Typing Statistics</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Average WPM</span>
                                <span>75</span>
                            </div>
                            <div className="flex justify-between">
                                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Highest WPM</span>
                                <span>92</span>
                            </div>
                            <div className="flex justify-between">
                                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Accuracy</span>
                                <span>98.2%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modules Finished Section */}
            <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-md'}`}>
                <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>Modules Finished</h3>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <th className="text-left py-3 px-4">Module Name</th>
                                <th className="text-left py-3 px-4">Completion Date</th>
                                <th className="text-left py-3 px-4">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modulesFinished.map((module, index) => (
                                <tr key={index} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                                    <td className="py-3 px-4">{module.name}</td>
                                    <td className="py-3 px-4">{module.date}</td>
                                    <td className="py-3 px-4">{module.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Cases Won Section */}
            <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-md'}`}>
                <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>Cases Won</h3>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <th className="text-left py-3 px-4">Case</th>
                                <th className="text-left py-3 px-4">Date</th>

                            </tr>
                        </thead>
                        <tbody>
                            {casesWon.map((challenge, index) => (
                                <tr key={index} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                                    <td className="py-3 px-4">{challenge.name}</td>
                                    <td className="py-3 px-4">{challenge.date}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};
const ModulesSection = ({ isDarkMode }: any) => (
    <div className={`p-8 min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
        <h1 className="text-5xl font-bold mb-12 text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
            📚 Learning Modules
        </h1>
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <CourseComponent
                moduleName="Frontend Wizardry"
                moduleDescription="Master React, Tailwind, and make UIs that don’t look like your school website."
            />
            <CourseComponent
                moduleName="Backend Alchemy"
                moduleDescription="Cook APIs like Gordon Ramsay with Node, Express, and Mongo."
            />
            <CourseComponent
                moduleName="AI Shenanigans"
                moduleDescription="Build tools smarter than your math teacher."
            />
        </div>
    </div>
);

const CourseComponent = ({ moduleName, moduleDescription }: any) => (
    <div className="rounded-2xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.2)] p-6 bg-white hover:shadow-[0_20px_50px_-5px_rgba(0,0,0,0.3)] transition-all duration-300 border-t-4 border-amber-400">
        <h2 className="text-2xl font-bold mb-2 text-amber-600">{moduleName}</h2>
        <p className="text-sm text-gray-700">{moduleDescription}</p>
    </div>
);


const TypingTestSection = ({ isDarkMode }: any) => (
    <div className={`p-8 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        <TypingTest isDarkMode={isDarkMode} />
    </div>
);

const DashboardSection = ({ isDarkMode }: any) => (
    <div className={`p-8 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p>Welcome to your typing dashboard. Here you can see your progress and statistics.</p>
    </div>
);

const SettingsSection = ({ isDarkMode }: any) => (
    <div className={`p-8 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <p>Customize your typing test experience here.</p>
    </div>
);

export default Dashboard;