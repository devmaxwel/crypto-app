import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../api/API";
import { UsecryptoState } from "../context/CryptoContext";

const CoinInfo = ({ coin}) => {
  const [historicalChart, setHistoricalChart] = useState();
  const [days, setDays] = useState(1);

  const { currency } = UsecryptoState();

  const fetchHistoricalData = async () => {

    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    console.log(data)    
    setHistoricalChart(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicalChart ? (
          <CircularProgress
            style={{
              color: "#0D6EFD",
            }}
            size={350}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicalChart.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}: ${date.getMinutes()}PM`
                      : `${date.getHours()}: ${date.getMinutes()}AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
               
                datasets: [{data: historicalChart.map((coin) =>  coin[1]) }]
              }}
            
            >

            </Line>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
