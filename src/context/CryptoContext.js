import React, { createContext, useContext, useState, useEffect } from 'react'

const cryptoState = createContext();


const CryptoContext = ( {children} ) => {
    const [currency, setCurrency] = useState("EUR");
    const [symbol, setSymbol] = useState("€");

    useEffect(() => {
        if (currency === "EUR"){
            setSymbol("€");
        }else if(currency === "USD"){
            setSymbol("$");
        }
    },[currency]);


    return (
        <cryptoState.Provider value={{symbol, currency, setCurrency }}>
                {children}
        </cryptoState.Provider>
    )
}

export default CryptoContext;

export const UsecryptoState =() =>{

    return useContext(cryptoState);
}
