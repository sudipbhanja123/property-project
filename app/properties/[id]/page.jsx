// import { connectDB } from "@/config/database";
// import Property from "@/models/Property";
// import Link from "next/link";
// import { FaArrowLeft } from "react-icons/fa";
// import PropertyHeaderImage from "@/components/PropertyHeaderImage";
// import PropertyDetails from "@/components/PropertyDetails";
// const PropertyPage = async ({ params }) => {
//   // 1. Await the params object (Required for Next.js 15+)
//   const { id } = await params;

//   await connectDB();

//   // 2. Use the 'id' variable we extracted above
//   const property = await Property.findById(id).lean();

//   if (!property) {
//     return (
//       <h1 className="text-center text-2xl font-bold mt-10">
//         Property Not Found
//       </h1>
//     );
//   }

//   return (
//     <>
//       <PropertyHeaderImage image={property.images[0]} />
//       <section>
//         <div className="container m-auto py-6 px-6">
//           <Link
//             href="/properties"
//             className="text-blue-500 hover:text-blue-600 flex items-center"
//           >
//             <FaArrowLeft /> Back to Properties
//           </Link>
//         </div>
//       </section>
//       <section className="bg-blue-50">
//         <div className="container m-auto py-10 px-6">
//           <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
//             {/* Main Content */}
//             <PropertyDetails property={property} />
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default PropertyPage;

import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails"; // Ensure this is imported
// 1. Import mongoose to check validity
import ShareButtons from "@/components/ShareButtons";
import BookmarkButton from "@/components/BookmarkButton";
import PropertyContactForm from "@/components/PropertyContactForm";
import mongoose from "mongoose";
import PropertyImages from "@/components/PropertyImages";
import { convertToSerializableObject } from "@/utils/convertToObject";
const PropertyPage = async ({ params }) => {
  const { id } = await params;

  await connectDB();

  // 2. Add this check to prevent the "CastError"
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  const propertyDoc = await Property.findById(id).lean();
  const property = convertToSerializableObject(propertyDoc);
  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-b lue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>

      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_30%] w-full gap-6">
            <PropertyDetails property={property} />
            {/* Sidebar would go here */}
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
