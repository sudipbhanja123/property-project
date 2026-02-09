import React from "react";
import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
const PropertiesPage = async ({ searchParams }) => {
  await connectDB();

  // 2. Await searchParams first
  const { page = 1, pageSize = 3 } = await searchParams;

  // 3. Ensure they are numbers (searchParams values are strings)
  const pageNum = parseInt(page);
  const pageSizeNum = parseInt(pageSize);

  const skip = (pageNum - 1) * pageSizeNum;
  const totalProperties = await Property.countDocuments({});
  const Properties = await Property.find({}).skip(skip).limit(pageSizeNum);
  const shouldShowPagination = totalProperties > pageSizeNum;
  return (
    <section className=" px-4 py-6">
      <div className=" container-xl lg:container m-auto px-4 py-6">
        {Properties.length === 0 ? (
          <p className="text-center text-gray-500">No properties available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {shouldShowPagination && (
          <Pagination
            page={pageNum}
            pageSize={pageSizeNum}
            totalItems={totalProperties}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
