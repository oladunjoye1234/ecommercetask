import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../CartContext/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = React.useContext(CartContext);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Animation variants for cart items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.3 },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  // Animation variants for the total section
  const totalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.3 } },
  };

  // Animation variants for empty cart and order completed messages
  const messageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const handleCheckout = () => {
    clearCart();
    setOrderCompleted(true);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>
        <AnimatePresence>
          {orderCompleted ? (
            <motion.div
              key="order-completed"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <p className="text-2xl font-semibold text-green-600 mb-4">Order Completed!</p>
              <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
              <Link
                to="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Continue Shopping
              </Link>
            </motion.div>
          ) : cartItems.length === 0 ? (
            <motion.div
              key="empty-cart"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <p className="text-gray-600 mb-4">Your cart is empty.</p>
              <Link
                to="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Shop Now
              </Link>
            </motion.div>
          ) : (
            <div>
              <div className="grid gap-6">
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={index}
                      className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-lg p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-24 h-24 object-contain rounded-md mb-4 sm:mb-0 sm:mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-gray-700 font-semibold">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <motion.button
                        onClick={() => removeFromCart(item.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 sm:mt-0 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                      >
                        Remove
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <motion.div
                variants={totalVariants}
                initial="hidden"
                animate="visible"
                className="mt-8 flex flex-col sm:flex-row justify-between items-center"
              >
                <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
                <div className="flex space-x-4 mt-4 sm:mt-0">
                  <motion.button
                    onClick={clearCart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
                  >
                    Clear Cart
                  </motion.button>
                  <motion.button
                    onClick={handleCheckout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={cartItems.length === 0}
                    className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 disabled:bg-gray-400 transition"
                  >
                    Checkout
                  </motion.button>
                  <Link
                    to="/products"
                    className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CartPage;