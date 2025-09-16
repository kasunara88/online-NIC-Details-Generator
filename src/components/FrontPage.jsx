import img from "../assets/nic.jpg";
import "../App.css";
import { Card, CardActionArea, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  const navigate = useNavigate();

  return (
    <Card sx={{ mt: 4, boxShadow: "none" }}>
      <h1>Check NIC Details</h1>
      <CardActionArea onClick={() => navigate("/form")}>
        <CardMedia
          component="img"
          image={img}
          alt="Click to validate NIC"
          sx={{
            maxWidth: 350,
            margin: "auto",
          }}
        />
      </CardActionArea>
    </Card>
  );
}

export default FrontPage;
