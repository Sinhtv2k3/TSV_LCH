import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          Webcuatoi.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {'© '}
          Admin Website 
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
