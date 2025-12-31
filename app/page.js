import Link from "next/link";
import { Suspense } from "react";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import LoadingPage from "./loading";
import { connectDB } from "@/config/database";
const HomePage = () => {
  connectDB();
  // console.log("URL", process.env.MONGODB_URL);
  return (
    <>
      <Hero />
      <InfoBoxes />
      <Suspense fallback={<LoadingPage />}>
        <HomeProperties />
      </Suspense>
    </>
  );
};

export default HomePage;
