
import { useState } from "react";

import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import ProductCard from "../components/ProductCard";
import ProductFormDialog from "../components/ProductFormDialog";
import DeleteProductDialog from "../components/DeleteProductDialog";

export default function ProductListPage({
  products = [],
  categories: availableCategories = [],
  loading,
  loadError,
  onCreate,
  onUpdate,
  onRemove,
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [notice, setNotice] = useState("");

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  // GET CATEGORY NAMES
  const categoryNames = [
    "All",
    ...new Set(
      products.map(
        (product) => product.category || "Uncategorized"
      )
    ),
  ];

  // SEARCH AND FILTER PRODUCTS
  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase().trim();
    const productName = (product.name || "").toLowerCase();
    const productCategory = (
      product.category || "Uncategorized"
    ).toLowerCase();

    const matchesSearch =
      productName.includes(searchText) ||
      productCategory.includes(searchText);

    const matchesCategory =
      categoryFilter === "All" ||
      (product.category || "Uncategorized") === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // SORT PRODUCTS
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);

      case "name-desc":
        return b.name.localeCompare(a.name);

      case "price-asc":
        return Number(a.price) - Number(b.price);

      case "price-desc":
        return Number(b.price) - Number(a.price);

      default:
        return 0;
    }
  });

  // OPEN ADD PRODUCT FORM
  const openAdd = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  // OPEN EDIT PRODUCT FORM
  const openEdit = (product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  // CREATE OR UPDATE PRODUCT
  const handleSave = async (values) => {
    try {
      if (editingProduct) {
        await onUpdate(editingProduct.id, values);
        setNotice("Product updated successfully.");
      } else {
        await onCreate(values);
        setNotice("Product added successfully.");
      }

      setFormOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Product save failed:", error);

      setNotice(
        error.response?.data?.message ||
          "Failed to save product. Please try again."
      );
    }
  };

  // DELETE PRODUCT
  const handleDelete = async () => {
    if (!deletingProduct) return;

    try {
      await onRemove(deletingProduct.id);

      setDeletingProduct(null);
      setNotice("Product deleted successfully.");
    } catch (error) {
      console.error("Product deletion failed:", error);

      setNotice(
        error.response?.data?.message ||
          "Failed to delete product. Please try again."
      );
    }
  };

  return (
    <main className="page-container">
      {/* PAGE HEADER */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <div>
          <Typography variant="h4" component="h1">
            Product Catalog
          </Typography>

          <Typography color="text.secondary">
            Browse and manage the store's products.
          </Typography>
        </div>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAdd}
        >
          Add Product
        </Button>
      </Stack>

      {/* SEARCH */}
      <TextField
        fullWidth
        placeholder="Search products by name or category..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        sx={{ mb: 3, bgcolor: "white", borderRadius: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* CATEGORY FILTER */}
      <FormControl fullWidth sx={{ mb: 3, bgcolor: "white" }}>
        <InputLabel id="category-filter-label">
          Category
        </InputLabel>

        <Select
          labelId="category-filter-label"
          value={categoryFilter}
          label="Category"
          onChange={(event) =>
            setCategoryFilter(event.target.value)
          }
        >
          {categoryNames.map((category) => (
            <MenuItem key={category} value={category}>
              {category === "All" ? "All Categories" : category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* SORT PRODUCTS */}
      <FormControl fullWidth sx={{ mb: 3, bgcolor: "white" }}>
        <InputLabel id="sort-products-label">
          Sort Products
        </InputLabel>

        <Select
          labelId="sort-products-label"
          value={sortOption}
          label="Sort Products"
          onChange={(event) =>
            setSortOption(event.target.value)
          }
        >
          <MenuItem value="default">Default Order</MenuItem>
          <MenuItem value="name-asc">Name: A–Z</MenuItem>
          <MenuItem value="name-desc">Name: Z–A</MenuItem>
          <MenuItem value="price-asc">Price: Low to High</MenuItem>
          <MenuItem value="price-desc">Price: High to Low</MenuItem>
        </Select>
      </FormControl>

      {/* PRODUCT DISPLAY STATES */}
      {loading ? (
        <Stack
          alignItems="center"
          spacing={2}
          sx={{ py: 6 }}
        >
          <CircularProgress />

          <Typography color="text.secondary">
            Loading products...
          </Typography>
        </Stack>
      ) : loadError ? (
        <Alert severity="error">
          {loadError}
        </Alert>
      ) : products.length === 0 ? (
        <Alert severity="info">
          There are no products yet. Add your first product.
        </Alert>
      ) : filteredProducts.length === 0 ? (
        <Alert severity="info">
          No products match "{search}".
        </Alert>
      ) : (
        <div className="product-grid">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={openEdit}
              onDelete={setDeletingProduct}
            />
          ))}
        </div>
      )}

      {/* ADD AND EDIT PRODUCT DIALOG */}
      <ProductFormDialog
        open={formOpen}
        product={editingProduct}
        categories={availableCategories}
        onClose={() => {
          setFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSave}
      />

      {/* DELETE CONFIRMATION DIALOG */}
      <DeleteProductDialog
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDelete}
      />

      {/* SUCCESS AND ERROR NOTIFICATIONS */}
      <Snackbar
        open={Boolean(notice)}
        autoHideDuration={3000}
        onClose={() => setNotice("")}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setNotice("")}
          severity={
            notice.includes("successfully") ? "success" : "error"
          }
          variant="filled"
        >
          {notice}
        </Alert>
      </Snackbar>
    </main>
  );
}
