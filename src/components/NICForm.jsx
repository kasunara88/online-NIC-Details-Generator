// import InfoCard from "./InfoCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NIC from "lanka-nic";
import nicImage from "../assets/card.jpg";
import CloseIcon from "@mui/icons-material/Close";
import InfoCard from "./InfoCard";
import "../App.css";
import {
  TextField,
  Button,
  Box,
  IconButton,
  Stack,
  CardMedia,
} from "@mui/material";

function NICForm() {
  const [nic, setNic] = useState("");
  const [nicDetails, setNicDetails] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setNicDetails(null);

    try {
      const details = NIC.getNicInfo(nic);
      setNicDetails(details);
    } catch (err) {
      setError("Invalid NIC Number. Please check and try again.");
    }
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", mt: 4, pb: 4 }}>
      <Box
        sx={{
          position: "relative",
          mb: 3,
          width: "600px",
          margin: "auto",
          backgroundColor: "#BDE3C3",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={nicImage}
          alt="NIC Form"
          sx={{
            borderRadius: "16px",
            width: "70%",
            backgroundColor: "#62c262e8",
          }}
        />
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255,255,255,0.7)",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          label="Enter NIC No"
          variant="outlined"
          fullWidth
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          error={!!error}
          helperText={error}
          sx={{ mt: 5, borderRadius: "8px", width: "33%", color: "#62c262e8" }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            p: 1.5,
            backgroundColor: "#38761d",
            "&:hover": { backgroundColor: "#2a5a14" },
            fontWeight: "bold",
            borderRadius: "8px",
            width: "33%",
          }}
        >
          Submit
        </Button>
      </Box>
      <Box>
        {nicDetails && (
          <Stack spacing={2} sx={{ mt: 4 }}>
            <InfoCard label="NIC No" value={nicDetails.nic} />
            <InfoCard
              label="Birthday"
              value={nicDetails.birthday.toLocaleDateString("en-CA")}
            />
            <InfoCard label="Gender" value={nicDetails.gender} />
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default NICForm;
