import React from 'react';
import { Link } from 'react-router-dom';
import { farmer3 } from "../assets";

const SectionLayout: React.FC = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-gray-700 mb-6">
              Farm2Table is a Business to Business (B2B) platform that directly connects farmers with merchants, eliminating intermediaries to ensure fair compensation for farmers, lower costs for merchants, and alleviating the high inflation of agricultural goods in the market.
            </p>
            <Link
              to="#"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#004437] hover:bg-[#004437]"
            >
              Get Started
            </Link>
          </div>
          <div>
            <img
              className="rounded-lg shadow-lg w-full h-[80%]"
              src={ farmer3 }
              alt="Farm2Table"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Categories: React.FC = () => {
  return (
    <div>
      <SectionLayout />
    </div>
  );
};

export default Categories;
