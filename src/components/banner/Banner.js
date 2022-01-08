import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Corousel from "./Corousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddignTop: 15,
    justifyContent: "space-around",
  },
  tagline:{
      display:"flex",
      height:"40%",
      flexDirection:"column",
      justifyContent:"center",
      textAlign:"center"
  }


}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Ninja
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "#fff",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get All the Info regarding Your Favourite Crypto-currency
          </Typography>
        </div>
        <Corousel />
      </Container>
     
    </div>
  );
};

export default Banner;
