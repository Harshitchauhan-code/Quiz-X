import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-300 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Quiz-X. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Terms of Service</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;