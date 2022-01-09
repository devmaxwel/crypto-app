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
import {Pagination} from '@material-ui/lab'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CoinList } from "../api/API";
import { UsecryptoState } from "../context/CryptoContext";
import { numberWithComas } from "./banner/Corousel";


const useStyles = makeStyles(() => ({
    row:{
        backgroundColor:"#16171",
        cursor:"pointer",
        "&:hover":{
            backgroundColor:"#131111",
        },
        fontFamily:"Montserrat"
    },
    pagination:{
        "& .MuiPaginationItem-root":{
            color:"#1070FD",
        },
    }
          
}));


const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const history = useHistory("")

  const { currency, symbol } = UsecryptoState();

  const fetchCoinList = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setLoading(false);
    setCoins(data);

    console.log(coins);
  };

  // eslint-disable-next-line

  useEffect(() => {
      
    fetchCoinList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency,]);

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
          style={{ color:"#0D6EFD", margin: 18, fontFamily: "Montserrat" }}
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
                background: "#1070FD",
              }}
            />
          ) : (
            <Table>  
              <TableHead
                style={{
                  backgroundColor: "#0D6EFD",
                }}
              >
                <TableRow>
                  {["Coin", "Price", "24h_Change", "Market_Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "#fff",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "coin"? "": "right"}
                     className={classes.row}
                    >
                      {head}
                    </TableCell>
                  ))}

                </TableRow>
              </TableHead>
              <TableBody >
                   {handleSearch()
                   .slice((page-1)*10, (page-1)* 10 + 10)
                   .map((row) => {
                       const profit = row.price_change_percentage_24h>0;

                       return (
                           <TableRow 
                           onClick={() => history.push(`/coins/${row.id}`)}
                           className={classes.row}
                           key={row.name}>

                               <TableCell component="th" scope="row"
                               style={{
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
                               <TableCell
                               align="right" >
                                   {symbol}{" "}
                                   {numberWithComas(row.market_cap).toString().slice(0,-6)}M

                               </TableCell>
                               
                           </TableRow>
                       )
                   })}
              </TableBody>
            </Table>
          )}
          <Pagination 
          style={{
              padding:20,
              width:"100%",
              display:"flex",
              justifyContent:"center",
             
          }}
          onChange={(_,value) => {
              setPage(value);
              window.scroll(0,450);
          }}
          classes={{ul: classes.pagination}}
          count={(handleSearch().length/10).toFixed(0)} />
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
