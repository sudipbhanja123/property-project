import React from "react";
import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import PropertyCard from "./PropertyCard";
import Link from "next/link";

const HomeProperties = async () => {
  await connectDB();

  const Properties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();
  // Simulate a fetch delay to show the loader
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const recentProperties = Properties.slice(0, 4); // Show only the first 4 properties
  return (
    <>
      <section className=" px-4 py-6">
        <div className=" container-xl lg:container m-auto px-4 py-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>

          {Properties.length === 0 ? (
            <p className="text-center text-gray-500">
              No properties available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
