import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard"; // Assuming you have this component

const SearchResultsPage = async (props) => {
  // FIX: Await searchParams before using them
  const searchParams = await props.searchParams;
  const { location, propertyType } = searchParams;

  await connectDB();

  const locationPattern = new RegExp(location, "i");

  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertiesQueryResults);
  console.log(properties);
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <Link
          href="/properties"
          className="flex items-center text-blue-500 hover:underline mb-3"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i> Back To Properties
        </Link>
        <h1 className="text-2xl mb-4">Search Results</h1>
        {properties.length === 0 ? (
          <p>No search results found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default SearchResultsPage;
