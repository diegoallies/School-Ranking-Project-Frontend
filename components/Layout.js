// src/components/Layout.js
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6 fixed h-full">
        <div className="text-2xl font-semibold mb-8">SchoolRank</div>
        <ul className="space-y-4">
          <li>
            <Link href="/">
              <span className="block py-2 px-4 text-lg hover:bg-blue-700 rounded-md transition">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <span className="block py-2 px-4 text-lg hover:bg-blue-700 rounded-md transition">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/schools">
              <span className="block py-2 px-4 text-lg hover:bg-blue-700 rounded-md transition">Schools</span>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <span className="block py-2 px-4 text-lg hover:bg-blue-700 rounded-md transition">Profile</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-8 bg-gray-50">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome to the Admin Dashboard</h1>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-md">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
