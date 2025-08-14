
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import { AnimatePresence, motion } from 'framer-motion';
import ProductDetails from './pages/private-pages/ProductDetails/ProductDetails';
import CartPage from './pages/private-pages/CartPage/CartPage';
import { CartProvider } from './pages/private-pages/CartContext/CartContext';
import { ProductProvider } from './pages/private-pages/ProductContext/ProductContext';
import { CartContext } from './pages/private-pages/CartContext/CartContext';
import { ProductContext, type Product } from './pages/private-pages/ProductContext/ProductContext'; 

const CartIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.915M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);

// Heroicons Hamburger Menu SVG
const HamburgerIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

// Heroicons Close Menu SVG
const CloseIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);


  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animation variants for mobile menu
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };


  const { cartItems } = React.useContext(CartContext);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gray-900 text-white p-4 sticky top-0 z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">CartMart</h1>
        <div className="flex items-center space-x-4">
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-4">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/products" className="hover:text-gray-300">Products</Link></li>
            <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
            <li>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/cart" className="hover:text-gray-300 flex items-center">
                  <CartIcon />
                   {itemCount > 0 && (
                <span className="absolute top-4 right-2 bg-red-600 text-white text-xs rounded-full px-1">
                  {itemCount}
                </span>
              )}
                </Link>
              </motion.div>
            </li>
          </ul>
          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-gray-800 mt-4 p-4 rounded-lg flex flex-col space-y-4"
          >
            <li>
              <Link
                to="/"
                className="hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </li>
            <li>
              <Link
                to="/cart"
                className="hover:text-gray-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <CartIcon />
                {itemCount > 0 && (
                  <span className="absolute left-14 bottom-11 bg-red-600 text-white text-xs rounded-full px-1">
                    {itemCount}
                  </span>
                )}
                {/* <span className="ml-2">Cart</span> */}
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero: React.FC = () => (
  <section
    id="home"
    className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] animate-gradient py-24 overflow-hidden"
  >
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      {/* Text Content */}
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4"
        >
          Shop the Future Today
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-200 mb-6"
        >
          Explore cutting-edge products at unbeatable prices. Start your shopping adventure now!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/products"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
      {/* Featured Product Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="md:w-1/2 flex justify-center"
      >
        <img
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"
          alt="Featured Product"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain rounded-lg shadow-lg"
        />
      </motion.div>
    </div>
  </section>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = React.useContext(CartContext);

  return (
    <Link to={`/products/${product.id}`} className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <button
        onClick={(e) => {
          e.preventDefault(); // Prevent Link navigation
          addToCart(product);
        }}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </Link>
  );
};

const ProductShowcase: React.FC = () => {
  const { products, loading, error, searchTerm, setSearchTerm } = React.useContext(ProductContext);
  const [currentPage, setCurrentPage] = React.useState(1);
  const productsPerPage = 4;

  // Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 transition"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 transition"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer id="contact" className="bg-gray-900 text-white py-8">
    <div className="container mx-auto text-center">
      <p className="mb-4">© 2025 CartMart. All rights reserved.</p>
      <div className="flex justify-center space-x-4">
        <a href="#" className="hover:text-gray-300">Privacy Policy</a>
        <a href="#" className="hover:text-gray-300">Terms of Service</a>
        <a href="#" className="hover:text-gray-300">Contact Us</a>
      </div>
    </div>
  </footer>
);

const Home: React.FC = () => (
  <div>
    <Hero />
    <ProductShowcase />
  </div>
);

const App: React.FC = () => (
  <CartProvider>
    <ProductProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </Router>
    </ProductProvider>
  </CartProvider>
);

export default App;


// const productForCart = {
//     ...product,
//     name: product.name ?? product.title, // Use 'title' as fallback for 'name'
//   };

//   return (
//     <Link to={`/products/${product.id}`} className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition">
//       <img
//         src={product.image}
//         alt={product.title}
//         className="w-full h-48 object-contain rounded-md mb-4"
//       />
//       <h3 className="text-lg font-semibold">{product.title}</h3>
//       <p className="text-gray-600">${product.price.toFixed(2)}</p>
//       <button
//         onClick={(e) => {
//           e.preventDefault(); // Prevent Link navigation
//           addToCart(productForCart);
//         }}
//         className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//       >
//         Add to Cart
//       </button>
//     </Link>
//   );
// };

//