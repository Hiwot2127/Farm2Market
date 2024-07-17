import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props {
  showButton?: boolean;
  link?: string;
  className?: string;
}

const LinkButton = ({ showButton, link, className }: Props) => {
  const newClassName = twMerge(
    "bg-[#004437] hover:bg-[#004437] text-whiteText py-2.5 px-6 rounded-full flex items-center gap-2 duration-200",
    className
  );
  return (
    <Link to={link ? link : "/products"} className={newClassName}>
      {showButton && <FaArrowLeft />} Get Started
    </Link>
  );
};

export default LinkButton;
