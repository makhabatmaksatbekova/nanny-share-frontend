import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import "./style/Content.css";
function Content() {
  return (
    <Grid container spacing={2}>
      <Grid item mt={10}>
        <Box component="h1">Finding a nanny, made easy</Box>
        <Box component="h4">
          Connect with nannies near you and find the one that's right for your
          family.
        </Box>

        <Box component="h2">How often do you need a nanny?</Box>

        <Button variant="outlined">Part-time</Button>
        <Button variant="outlined">Full-time</Button>
        <Button variant="outlined">Not-sure</Button>
      </Grid>
      <Grid item>
        <img src="https://perfectfitnanny.com/blog/wp-content/uploads/2020/07/lovely-multiethnic-mother-holding-baby-8N8SAAW-814x571.jpg" />
      </Grid>
    </Grid>
  );
}

export default Content;
