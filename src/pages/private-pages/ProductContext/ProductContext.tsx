import React, { createContext, useState, useEffect } from 'react';

export interface Product {
  name: string;
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  error: null,
  searchTerm: '',
  setSearchTerm: () => {},
});

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error, searchTerm, setSearchTerm }}>
      {children}
    </ProductContext.Provider>
  );
};