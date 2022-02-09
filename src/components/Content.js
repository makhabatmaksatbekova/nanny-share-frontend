import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import ListAllFamilies from "./ListAllFamilies";

import "./style/Content.css";
function Content() {
  return (
    <Grid container spacing={0}>
      <Grid item mt={10} xs={12} md={5}>
        <Box component="h1">Finding a nanny, made easy</Box>
        <Box component="h4">
          Connect with nannies near you and find the one that's right for your
          family.
        </Box>

        <Box component="h2">How often do you need a nanny?</Box>

        <Link to="/families">
          <Button variant="outlined">Part-time</Button>
        </Link>
        <Link to="/families">
          <Button variant="outlined">Full-time</Button>
        </Link>
        <Link to="/families">
          <Button variant="outlined">Not sure</Button>
        </Link>
      </Grid>
      <Grid className="content_image" item xs={12} md={7}>
        <img src="https://images.saymedia-content.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:eco%2Cw_620/MTc0NTEzOTE3ODE5NzU4NTM3/how-to-pack-the-perfect-nanny-bag.jpg" />
      </Grid>
    </Grid>
  );
}

export default Content;
