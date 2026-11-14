import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email.trim().toLowerCase(), password);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 450,
        mx: "auto",
        mt: { xs: 4, sm: 8 },
        mb: 4,
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          gutterBottom
        >
          Welcome Back
        </Typography>

        <Typography
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 3 }}
        >
          Login to your Spiral Store account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            required
            margin="normal"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.3,
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>
        </Box>

        <Typography textAlign="center" sx={{ mt: 3 }}>
          Don't have an account?{" "}
          <Link to="/register">Register here</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
