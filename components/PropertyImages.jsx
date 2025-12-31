import React from "react";
import Image from "next/image";
const PropertyImages = ({ images }) => {
  return (
    <section className="b-blue-50 p-4">
      <div className="container mx-auto">
        {images.length <= 1 ? (
          <Image
            src={images[0]}
            alt=""
            width={1800}
            height={400}
            priority={true}
            className="object-cover h-[400px] w-full rounded-lg"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`${
                  images.length === 3 && index === 2
                    ? "col-span-2"
                    : "col-span-1"
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  width={1800}
                  height={400}
                  priority={true}
                  className="object-cover h-[400px] w-full rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
