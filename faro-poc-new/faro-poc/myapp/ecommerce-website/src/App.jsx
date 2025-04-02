import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import { faro, logEvent } from "./faroConfig";  // ✅ Import your Faro logging functions 

// 🔹 Page Navigation Tracking Component
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logEvent("page_view", { page: location.pathname });
  }, [location]);

  return null;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <PageTracker />  {/* ✅ Page Views Track */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

