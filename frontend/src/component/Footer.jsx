import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10 px-4 sm:px-6 lg:px-8 mt-auto w-full">
      <div className="max-w-7xl mx-auto flex flex-col items-center md:items-start gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-indigo-400">MeetMint</h2>
          <p className="mt-3 text-sm text-gray-400 max-w-md">
            Connecting people through unforgettable events and experiences across the globe.
          </p>
        </div>

        <div className="border-t border-gray-700 pt-6 text-sm text-gray-400 text-center w-full">
          <p>© {new Date().getFullYear()} MeetMint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;