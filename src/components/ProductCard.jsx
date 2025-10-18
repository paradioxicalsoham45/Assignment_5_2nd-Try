import React, { useEffect } from "react";
import useFetch from "../hooks/usefetch";
import { useState } from "react";

const ProductCard = () => {
  const { data, loading, error, setLoading } = useFetch(
    "https://api.escuelajs.co/api/v1/products"
  );
  const [online, setOnline] = useState(window.navigator);

  useEffect(() => {
    const DeviceOffline = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setOnline(!online)
        }, 2000);
    };
    // const DeviceOnline = () => setOnline(true);
    const DeviceOnline = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setOnline(true)
        }, 2000);
    }

    window.addEventListener("offline", DeviceOffline);
    window.addEventListener("online", DeviceOnline);

    return () => {
      window.removeEventListener("offline", DeviceOffline);
      window.removeEventListener("online", DeviceOnline);
    };
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        Loading ...
      </div>
    );
  }

  if (!online) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        No Internet ...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <h1>Error:- Failed to fetch</h1>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pb-10 overflow-x-hidden">
      <div className="bg-black p-4 mb-6 border-b border-b-white">
        <h1 className="text-yellow-500 text-3xl font-bold mb-8 text-center w-full">
          Products
        </h1>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {data.map((product, index) => (
          <div
            key={index}
            className="bg-black border-white border rounded-xl shadow-md hover:scale-[1.02] transition duration-300 cursor-pointer overflow-hidden"
          >
            <img
              src={product.images}
              alt={product.title}
              className="border object-cover cursor-pointer border-white rounded-lg"
            />
            <div className="p-4 text-orange-600 gap-1">
              <p className="font-bold text-4xl">${product.price}</p>
              <p className="font-medium text-lg truncate">{product.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
