import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NIC from "lanka-nic";
import nicImage from "../assets/card.jpg";
import CloseIcon from "@mui/icons-material/Close";
import InfoCard from "./InfoCard";
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateNIC = (nicValue) => {
    if (!nicValue) {
      return "Please enter a NIC number";
    }

    // Basic format validation for Sri Lankan NIC
    const oldNICPattern = /^[0-9]{9}[vVxX]$/;
    const newNICPattern = /^[0-9]{12}$/;

    if (!oldNICPattern.test(nicValue) && !newNICPattern.test(nicValue)) {
      return "Please enter a valid NIC format (9 digits + V/X or 12 digits)";
    }

    return null;
  };

  const handleInputChange = (event) => {
    const value = event.target.value.toUpperCase();
    setNic(value);

    if (error) {
      setError("");
    }

    if (nicDetails) {
      setNicDetails(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setNicDetails(null);

    try {
      const validationError = validateNIC(nic);
      if (validationError) {
        setError(validationError);
        return;
      }

      const details = NIC.getInfoFromNIC(nic);
      console.log(details);

      if (!details || !details.dateOfBirth) {
        throw new Error("Unable to extract valid information from NIC");
      }

      setNicDetails(details);
    } catch (err) {
      console.error("NIC processing error:", err);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", mt: 2, pb: 4 }}>
      <Box
        sx={{
          maxWidth: 700,
          margin: "auto",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            mb: 4,
            width: "100%",
            backgroundColor: "#BDE3C3",
            borderRadius: "16px",
            overflow: "hidden",
            minHeight: "200px",
          }}
        >
          <CardMedia
            component="img"
            image={nicImage}
            alt="NIC Form"
            sx={{
              width: "70%",
              height: "auto",
              minHeight: "200px",
              objectFit: "cover",
              backgroundColor: "#BDE3C3",
            }}
          />
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(255,255,255,0.7)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form Section */}
        <Box sx={{ mb: 3, p: 3 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Enter NIC Number"
              variant="outlined"
              fullWidth
              value={nic}
              onChange={handleInputChange}
              error={!!error}
              helperText={
                error ||
                "Enter your 10-digit old NIC (123456789V) or 12-digit new NIC"
              }
              placeholder="123456789V or 123456789012"
              disabled={isLoading}
              slotProps={{
                maxLength: 12,
                style: { textTransform: "uppercase" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#62c262e8",
                  },
                  color: "#38761d",
                  "&.Mui-focused fieldset": {
                    borderColor: "#38761d",
                  },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                p: 1.5,
                backgroundColor: "#38761d",
                "&:hover": {
                  backgroundColor: "#2a5a14",
                },
                fontWeight: "bold",
                borderRadius: "8px",
              }}
            >
              {isLoading ? "Processing..." : "Submit"}
            </Button>
          </Box>
        </Box>

        {nicDetails && (
          <Box>
            <Stack spacing={2} sx={{ mt: 4 }}>
              <InfoCard label="NIC No" value={nic} />
              <InfoCard
                label="Birthday"
                value={nicDetails.dateOfBirth.toLocaleDateString("en-CA")}
              />
              <InfoCard label="Gender" value={nicDetails.gender} />
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default NICForm;
