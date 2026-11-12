
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";

const emptyForm = {
  product_code: "",
  name: "",
  category_id: "",
  price: "",
  stock: "",
  description: "",
};

export default function ProductFormDialog({
  open,
  product,
  categories = [],
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(
        product
          ? {
              product_code: product.product_code ?? "",
              name: product.name ?? "",
              category_id: String(product.category_id ?? ""),
              price: String(product.price ?? ""),
              stock: String(product.stock ?? ""),
              description: product.description ?? "",
            }
          : { ...emptyForm }
      );

      setErrors({});
    }
  }, [open, product]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!form.product_code.trim()) {
      nextErrors.product_code = "Product code is required.";
    }

    if (!form.name.trim()) {
      nextErrors.name = "Product name is required.";
    }

    if (!form.category_id) {
      nextErrors.category_id = "Please select a category.";
    }

    if (
      form.price.trim() === "" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      nextErrors.price = "Enter a valid price of zero or more.";
    }

    if (
      form.stock.trim() === "" ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      nextErrors.stock = "Enter a whole number of zero or more.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave({
      product_code: form.product_code.trim(),
      name: form.name.trim(),
      category_id: Number(form.category_id),
      price,
      stock,
      description: form.description.trim(),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit} noValidate>
        <DialogTitle>
          {product ? "Edit Product" : "Add Product"}
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            fullWidth
            label="Product Code"
            name="product_code"
            value={form.product_code}
            onChange={handleChange}
            error={Boolean(errors.product_code)}
            helperText={errors.product_code}
            required
          />

          <TextField
            margin="normal"
            fullWidth
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
            required
          />

          <TextField
            select
            margin="normal"
            fullWidth
            label="Category"
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            error={Boolean(errors.category_id)}
            helperText={errors.category_id}
            required
          >
            {categories.map((category) => (
              <MenuItem
                key={category.id}
                value={String(category.id)}
              >
                {category.name} (ID: {category.id})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="normal"
            fullWidth
            label="Price (PHP)"
            name="price"
            type="number"
            slotProps={{
              htmlInput: { min: 0, step: "0.01" },
            }}
            value={form.price}
            onChange={handleChange}
            error={Boolean(errors.price)}
            helperText={errors.price}
            required
          />

          <TextField
            margin="normal"
            fullWidth
            label="Stock Quantity"
            name="stock"
            type="number"
            slotProps={{
              htmlInput: { min: 0, step: 1 },
            }}
            value={form.stock}
            onChange={handleChange}
            error={Boolean(errors.stock)}
            helperText={errors.stock}
            required
          />

          <TextField
            margin="normal"
            fullWidth
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            minRows={3}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" variant="contained">
            {product ? "Save Changes" : "Add Product"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
