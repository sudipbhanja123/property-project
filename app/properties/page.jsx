import React from "react";
import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import PropertyCard from "@/components/PropertyCard";
const PropertiesPage = async () => {
  await connectDB();

  const Properties = await Property.find({}).lean();
  // Simulate a fetch delay to show the loader
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <section className=" px-4 py-6">
      <div className=" container-xl lg:container m-auto px-4 py-6">
        {Properties.length === 0 ? (
          <p className="text-center text-gray-500">No properties available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
