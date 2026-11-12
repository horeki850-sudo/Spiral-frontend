import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(Number(price));

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        height="190"
        image={product.image || "https://placehold.co/600x400?text=Product"}
        alt={product.name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Chip
          label={product.category || "Uncategorized"}
          size="small"
          sx={{ mb: 1 }}
        />

        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>

        <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
          {formatPrice(product.price)}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {product.description}
        </Typography>
      </CardContent>

      
      <CardActions sx={{ px: 2, pb: 2, flexWrap: "wrap", gap: 1 }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<VisibilityIcon />}
          component={RouterLink}
          to={`/products/${product.id}`}
        >
          Details
        </Button>

        <Button
          size="small"
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => onEdit(product)}
        >
          Edit
        </Button>

        <Button
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(product)}
        >
          Delete
        </Button>
      </CardActions>

    </Card>
  );
}