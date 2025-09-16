import { Typography, Paper } from "@mui/material";

const InfoCard = ({ label, value }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#F3F6F4",
        padding: "12px 10px",
        borderRadius: "8px",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        {value}
      </Typography>
    </Paper>
  );
};

export default InfoCard;
