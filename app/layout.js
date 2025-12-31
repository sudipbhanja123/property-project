import "../assets/styles/globals.css";
import Footer from "@/components/Footer";
import NavBar from "../components/NavBar";
import AuthProvider from "@/components/AuthProvider";
import ToastProvider from "@/components/ToastProvider"; // Import the new wrapper

export const metadata = {
  title: "Property Pulse",
  keywords: "real estate, property, buy, sell, rent",
  description: "Find your dream property with Property Pulse",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <NavBar />
          <main>{children}</main>
          <Footer />
          {/* Use the client wrapper here */}
          <ToastProvider />
        </body>
      </html>
    </AuthProvider>
  );
}
