import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { FiShoppingBag, FiStar, FiUser } from "react-icons/fi";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import Container from "./Container";
import { config } from "../../config";
import { getData } from "../lib";
import { CategoryProps, ProductProps } from "../../type";
import ProductCard from "./ProductCard";
import { store } from "../lib/store";

const bottomNavigation = [
  { title: "Home", link: "/" },
  { title: "About Us", link: "/about" },
  { title: "Contact Us", link: "/contact" },
];

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { cartProduct, favoriteProduct, currentUser } = store();

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/products`;
      try {
        const data = await getData(endpoint);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/categories`;
      try {
        const data = await getData(endpoint);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((item: ProductProps) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText]);

  return (
    <div className="w-full bg-[#004437] md:sticky md:top-0 z-50">
      <div className="max-w-screen-xl mx-auto h-20 flex items-center justify-between px-4 lg:px-0">
        {/* Logo */}
        <Link to={"/"}>
        {/* <div className="p-6 h-full flex flex-col justify-center bg-[#005B49]"> */}
            <h1 className="text-white text-3xl font-bold">Farm2Table</h1>
          {/* </div> */}
        </Link>
        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          {bottomNavigation.map(({ title, link }) => (
            <Link
              to={link}
              key={title}
              className="text-whiteText text-lg font-medium hover:text-gray-300"
            >
              {title}
            </Link>
          ))}
        </div>
        {/* Sign Up Button */}
        <Link
          to={"/signup"}
          className="bg-[#00704A] text-whiteText px-4 py-2 rounded-md hover:bg-[#005B49] duration-200"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Header;
