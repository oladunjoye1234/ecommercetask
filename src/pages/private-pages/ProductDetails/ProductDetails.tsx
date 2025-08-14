import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';
import { ProductContext } from '../ProductContext/ProductContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = React.useContext(CartContext);
  const { products, loading, error } = React.useContext(ProductContext);

  const product = products.find((p) => p.id === parseInt(id || '0')) || {
    id: 0,
    name: "Product Not Found",
    title: "Product Not Found",
    price: 0,
    image: "https://via.placeholder.com/300x200",
    description: "Sorry, the product you are looking for is not available.",
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-gray-600">Loading product...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <Link
          to="/products"
          className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Back to Products
        </Link>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto object-contain rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
            <p className="text-2xl text-gray-700 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;