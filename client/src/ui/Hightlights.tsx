import React from "react";
import Container from "./Container";
import { farmer1 } from "../assets";
import { farmer2 } from "../assets";
import { farmer3 } from "../assets";
import { Link } from "react-router-dom";

const highlightsData = [
  {
    _id: "1",
    image: { farmer1 },
    title: "Set Your Own Selling Price As A Farmer",
    description: "Earn the compensation you deserve",
    buttonTitle: "Learn More",
    _base: "/service1",
  },
  {
    _id: "2",
    image: { farmer2 },
    title: "Set Your Own Selling Price As A Farmer",
    description: "Earn the compensation you deserve",
    buttonTitle: "Learn More",
    _base: "/service2",
  },
  {
    _id: "3",
    image:{ farmer3 },
    title: "Set Your Own Selling Price As A Farmer",
    description: "Earn the compensation you deserve",
    buttonTitle: "Learn More",
    _base: "/service3",
  },
];

const Highlights = () => {
  return (
    <div className="py-10 bg-white">
      <Container>
        <h2 className="text-3xl font-bold text-center text-green-900 mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlightsData.map((item) => (
            <div
              key={item?._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={ farmer1 }
                alt={item?.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 bg-green-900 text-white">
                <h3 className="text-xl font-bold mb-2">{item?.title}</h3>
                <p className="text-sm mb-4">{item?.description}</p>
                <Link
                  to={item?._base}
                  className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  {item?.buttonTitle}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Highlights;
