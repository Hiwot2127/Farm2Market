import React from "react";
import { payment } from "../assets";

const Footer = () => {
  return (
    <footer className="bg-[#004437] text-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Farm2Table</h3>
            <p className="text-gray-400">Bridging Farmers and Merchants directly.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Our Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">About us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-400">farm2table@gmail.com</p>
            <p className="text-gray-400">+251-946-98-78-21</p>
          </div>
          <div className="flex items-center justify-end">
            <img src={payment} alt="payment-img" className="w-auto h-8 object-cover" />
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          &copy; 2024 Farm2Table. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
