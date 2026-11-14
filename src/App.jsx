
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import api from "./api/axios";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isAuthenticated, token } = useAuth();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const formatProduct = (product, categoryList = categories) => {
    const category = categoryList.find(
      (item) => Number(item.id) === Number(product.category_id)
    );

    return {
      ...product,
      category: category?.name || "Uncategorized",
      image: "https://placehold.co/600x400?text=Product",
    };
  };

  // LOAD PRODUCTS AFTER LOGIN
  useEffect(() => {
    if (!isAuthenticated || !token) {
      setProducts([]);
      setCategories([]);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setLoadError("");

        const [productsResponse, categoriesResponse] =
          await Promise.all([
            api.get("/products"),
            api.get("/categories"),
          ]);

        const categoryData = categoriesResponse.data.data;
        const productData = productsResponse.data.data;

        setCategories(categoryData);

        setProducts(
          productData.map((product) =>
            formatProduct(product, categoryData)
          )
        );
      } catch (error) {
        console.error("Failed to load products:", error);
        setLoadError(
          "Unable to load products. Please check your Laravel server."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isAuthenticated, token]);

  // CREATE PRODUCT
  const createProduct = async (values) => {
    const response = await api.post("/products", values);
    const newProduct = formatProduct(response.data.data);

    setProducts((current) => [...current, newProduct]);

    return newProduct;
  };

  // UPDATE PRODUCT
  const updateProduct = async (id, values) => {
    const response = await api.put(`/products/${id}`, values);
    const updatedProduct = formatProduct(response.data.data);

    setProducts((current) =>
      current.map((product) =>
        Number(product.id) === Number(id) ? updatedProduct : product
      )
    );

    return updatedProduct;
  };

  // DELETE PRODUCT
  const removeProduct = async (id) => {
    await api.delete(`/products/${id}`);

    setProducts((current) =>
      current.filter((product) => Number(product.id) !== Number(id))
    );
  };

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <ProductListPage
                products={products}
                categories={categories}
                loading={loading}
                loadError={loadError}
                onCreate={createProduct}
                onUpdate={updateProduct}
                onRemove={removeProduct}
              />
            }
          />

          <Route
            path="/products/:id"
            element={<ProductDetailsPage products={products} />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
