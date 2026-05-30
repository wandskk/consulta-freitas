"use client";

import { useEffect, useState } from "react";

import type { Product } from "@/types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch("/api/products");
      const result = (await response.json()) as { data: Product[] };

      setProducts(result.data);
      setIsLoading(false);
    }

    loadProducts();
  }, []);

  return { products, isLoading };
}
