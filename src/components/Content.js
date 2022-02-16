import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import ListAllFamilies from "./ListAllFamilies";
import "./style/Content.css";

function Content() {
  return (
    <Grid
      sx={{
        background:
          "linear-gradient(rgba(196, 102, 0, 0.6), rgba(155, 89, 182, 0.6))",
      }}
    >
      <Grid container mt={10}>
        <Grid
          mt={10}
          item
          xs={12}
          md={6}
          sx={{ padding: "10px", paddingLeft: "20px" }}
        >
          <Box className="content_headtag" component="h1">
            Share your nanny with another family
          </Box>
          <Box mt={2} className="content_headtag_text" component="h3">
            Split the cost of a nanny and enjoy flexible child care with a nanny
            share.
          </Box>
          <Link to="/families">
            <Button sx={{ margin: "20px" }} variant="outlined">
              search nanny share
            </Button>
          </Link>
        </Grid>
        <Grid className="content_card1_image" item xs={12} md={6}>
          <img src="https://images.saymedia-content.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:eco%2Cw_620/MTc0NTEzOTE3ODE5NzU4NTM3/how-to-pack-the-perfect-nanny-bag.jpg" />
        </Grid>
      </Grid>

      {/* card 2 */}

      <Grid
        mt={10}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid className="content_card2_image1" item xs={7} sm={4}>
          <img src="https://static.onecms.io/wp-content/uploads/sites/38/2015/03/12212608/550_102285872.jpg" />
        </Grid>

        <Grid item xs={7} sm={4} sx={{ padding: "10px", paddingLeft: "20px" }}>
          <Box className="content_card3_headtag" component="h1">
            What’s a nanny share?
          </Box>
          <Box component="h4" mt={2}>
            A nanny share consists of two families sharing one nanny that cares
            for both of their children.
          </Box>
        </Grid>
        <Grid className="content_card2_image2" item xs={6} md={4}>
          <img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F38%2F2014%2F04%2F13013446%2F550_102088425.jpg" />
        </Grid>
      </Grid>

      {/* card 3 */}

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt={10}
        sx={{ padding: "5rem" }}
      >
        {/* top heading */}
        <Grid mt={10} item xs={7}>
          <Box
            className="content_card3_headtag"
            component="h2"
            maxWidth="600px"
          >
            The most common ways to set up your nanny share
          </Box>
        </Grid>

        {/* card content */}
        <Grid item xs={12} md={6}>
          {/* card container */}
          <Grid
            mt={2}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ padding: "10px" }}
          >
            {/* left card */}
            <Grid item xs={12} md={5.5}>
              {/* left card container */}
              <Grid
                container
                direction="column"
                maxWidth="100%"
                sx={{ marginRight: "10px" }}
              >
                <Grid item>
                  <img src="https://cdn.nannylane.com/6b9a2bfb8e53b14672da.svg" />
                </Grid>

                <Grid item mt={2}>
                  <Box className="content_card3_cardHeading" component="h2">
                    Your nanny watches both families’ kids together
                  </Box>
                </Grid>

                <Grid item mt={1}>
                  <Box className="content_card3_cardText" component="h3">
                    You can have a nanny that watches both kids together at one
                    of your homes.
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* center */}

            <Grid mt={13} item xs={12} md={0.5} ml={2}>
              <Box className="content_card3_centerText" component="h1">
                OR
              </Box>
            </Grid>

            {/* right card */}
            <Grid item xs={12} md={5.5} ml={2} sx={{ marginLeft: "10px" }}>
              <Grid container direction="column">
                <Grid item>
                  <img src="https://cdn.nannylane.com/bb4d6085d50646d3b85c.svg" />
                </Grid>

                <Grid item mt={2}>
                  <Box className="content_card3_cardHeading" component="h2">
                    Your nanny splits time between two families
                  </Box>
                </Grid>

                <Grid item mt={1}>
                  <Box className="content_card3_cardText" component="h3">
                    You can split your nanny’s hours with another family to fit
                    around your schedule.
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Content;
