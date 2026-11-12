
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header />
      <Outlet />
    </Box>
  );
}
