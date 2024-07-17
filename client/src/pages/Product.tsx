import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../config";
import { ProductProps } from "../../type";
import { getData } from "../lib";
import Loading from "../ui/Loading";
import Container from "../ui/Container";
import _, { divide } from "lodash";
import PriceTag from "../ui/PriceTag";
import { MdOutlineStarOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import FormattedPrice from "../ui/FormattedPrice";
import { IoClose } from "react-icons/io5";
import AddToCartBtn from "../ui/AddToCartBtn";
import { productPayment } from "../assets";
import { farmer3 } from "../assets";
import { product2 } from "../assets";
import ProductCard from "../ui/ProductCard";
import CategoryFilters from "../ui/CategoryFilters";

// Sample JSON data
const sampleProductData: ProductProps[] = [
  {
    _id: "1",
    name: "Product 1",
    images: [ farmer3 ,],
    colors: ["#FF0000", "#00FF00", "#0000FF"],
    regularPrice: 100,
    discountedPrice: 80,
    reviews: 50,
    brand: "Brand A",
    category: "Category X",
  },
  {
    _id: "2",
    name: "Product 2",
    images: [product2,],
    colors: ["#FFFF00", "#00FFFF", "#FF00FF"],
    regularPrice: 120,
    discountedPrice: 100,
    reviews: 30,
    brand: "Brand B",
    category: "Category Y",
  },
  {
    _id: "3",
    name: "Product 1",
    images: [ farmer3 ,],
    colors: ["#FF0000", "#00FF00", "#0000FF"],
    regularPrice: 100,
    discountedPrice: 80,
    reviews: 50,
    brand: "Brand A",
    category: "Category X",
  },
  {
    _id: "4",
    name: "Product 2",
    images: [product2,],
    colors: ["#FFFF00", "#00FFFF", "#FF00FF"],
    regularPrice: 120,
    discountedPrice: 100,
    reviews: 30,
    brand: "Brand B",
    category: "Category Y",
  },
  // Add more sample products as needed
];

const Product = () => {
  const [productData, setProductData] = useState<ProductProps | null>(null);
  const [allProducts, setAllProducts] = useState<ProductProps[]>(sampleProductData);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [color, setColor] = useState("");
  const { id } = useParams();

  const endpoint = id
    ? `${config?.baseUrl}/products/${id}`
    : `${config?.baseUrl}/products/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(endpoint);
        if (id) {
          setProductData(data);
          setAllProducts([]);
        } else {
          setAllProducts(data);
          setProductData(null);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, endpoint]);

  useEffect(() => {
    if (productData) {
      setImgUrl(productData?.images[0]);
      setColor(productData?.colors[0]);
    }
  }, [productData]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {!!id && productData && _.isEmpty(allProducts) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Product details */}
            </div>
          ) : (
            <div className="flex items-start gap-10">
              <CategoryFilters id={id} />
              <div>
                <p className="text-4xl font-semibold mb-5 text-center">
                  Products Collection
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {allProducts?.map((item: ProductProps) => (
                    <ProductCard item={item} key={item?._id} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default Product;
