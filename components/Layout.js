import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHome, FaTachometerAlt, FaSchool, FaUser, FaClipboardList } from 'react-icons/fa'; // Adding icons

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Detecting window width and setting sidebar state accordingly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Desktop size (md breakpoint)
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on component mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 ease-in-out bg-gray-800 text-white p-6 fixed h-full overflow-hidden md:w-64`}
      >
        {/* Hamburger Menu for Mobile - Background only applied to the button */}
        <div className="flex items-center justify-between md:hidden bg-gray-800 p-3 rounded-md">
          <button
            onClick={toggleSidebar}
            className="text-white text-2xl focus:outline-none"
          >
            {isSidebarOpen ? '×' : '≡'}
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="md:block">
          <div className="text-3xl font-bold text-center text-blue-500 mb-12">
            SchoolRank
          </div>
          <ul className="space-y-6">
            <li>
              <Link href="/">
                <span
                  className="flex items-center py-3 px-4 text-lg hover:bg-gray-700 rounded-md transition"
                >
                  <FaHome className="mr-3 text-xl" />
                  {/* Show text only if sidebar is open */}
                  {isSidebarOpen && <span>Home</span>}
                </span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard">
                <span
                  className="flex items-center py-3 px-4 text-lg hover:bg-gray-700 rounded-md transition"
                >
                  <FaTachometerAlt className="mr-3 text-xl" />
                  {isSidebarOpen && <span>Dashboard</span>}
                </span>
              </Link>
            </li>
            <li>
              <Link href="/schools">
                <span
                  className="flex items-center py-3 px-4 text-lg hover:bg-gray-700 rounded-md transition"
                >
                  <FaSchool className="mr-3 text-xl" />
                  {isSidebarOpen && <span>Schools</span>}
                </span>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <span
                  className="flex items-center py-3 px-4 text-lg hover:bg-gray-700 rounded-md transition"
                >
                  <FaUser className="mr-3 text-xl" />
                  {isSidebarOpen && <span>Profile</span>}
                </span>
              </Link>
            </li>
            {/* Add Questionnaire link */}
            <li>
              <Link href="/questionnaire">
                <span
                  className="flex items-center py-3 px-4 text-lg hover:bg-gray-700 rounded-md transition"
                >
                  <FaClipboardList className="mr-3 text-xl" />
                  {isSidebarOpen && <span>Questionnaire</span>}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 p-8 bg-gray-900 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        } md:ml-64`}
      >
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
