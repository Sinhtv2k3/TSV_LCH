// components/Loading.tsx
import React from "react";
import { Box, LinearProgress } from "@mui/material";

interface LoadingProps {
  isShow: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isShow }) => {
  if (!isShow) return null;
  
  return (
    <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0 }}>
      <LinearProgress />
    </Box>
  );
};

export default Loading;
