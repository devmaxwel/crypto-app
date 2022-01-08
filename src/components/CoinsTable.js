import {
  ThemeProvider,
  createTheme,
  Typography,
  Container,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CoinList } from "../api/API";
import { UsecryptoState } from "../context/CryptoContext";
import { numberWithComas } from "./banner/Corousel";


const useStyles = makeStyles(() => ({
          
}));


const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const history = useHistory("")

  const { currency, symbol } = UsecryptoState();

  const fetchCoinList = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setLoading(false);
    setCoins(data);

    console.log(coins);
  };

  useEffect(() => {
      
    fetchCoinList();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch =() => {
      return coins.filter((coin) => ( 
         
          coin.name.toLowerCase().includes(search) ||  coin.symbol.toLowerCase().includes(search)
          ))
  }

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        style={{
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices By market-Cap
        </Typography>
        <TextField
          label="Search Crypto"
          variant="outlined"
          style={{
            marginBottom: 20,
            width: "100%",
          }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress
              style={{
                background: "gold",
              }}
            />
          ) : (
            <Table>  
              <TableHead
                style={{
                  backgroundColor: "#EEBC1D",
                }}
              >
                <TableRow>
                  {["Coin", "Price", "24h_Change", "Market_Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "coin"? "": "right"}
                   
                    >
                      {head}
                    </TableCell>
                  ))}

                </TableRow>
              </TableHead>
              <TableBody >
                   {handleSearch().map((row) => {
                       const profit = row.price_change_percentage_24h>0;

                       return (
                           <TableRow 
                           onClick={() => history.push(`/coins/${row.id}`)}
                           className={classes.row}
                           key={row.name}>

                               <TableCell component="th" scope="row"
                               styles={{
                                   display:"flex",
                                   gap:15,    

                               }} >
                                   
                                <img 
                                src={row.image} 
                                alt={row.name}
                                height= "50"
                                style={
                                    {
                                    marginBottom:10
                                }} />

                                <div 
                                style={{
                                    display:"flex",
                                    flexDirection:"column"
                                }} > 

                                  <span 
                                  style={{
                                      textTransform:"uppercase",
                                      fontSize:22,
                                  }}>
                                        {row.symbol}

                                  </span>
                                  <span styles={{
                                      color: "darkgrey"
                                  }} >
                                      {row.name}
                                  </span>
                               
                                </div>

                               </TableCell>
                               <TableCell
                               align="right">
                                   {symbol} {" "}
                                   {numberWithComas(row.current_price.toFixed(2))}

                               </TableCell>
                               <TableCell
                               align="right"
                               style={{
                                   color: profit > 0 ?"green" : "red"
                               }} >
                                   {profit && "+"}
                                   {row.price_change_percentage_24h.toFixed()}%

                               </TableCell>
                               
                           </TableRow>
                       )
                   })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
