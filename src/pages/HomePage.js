import React from "react";
import Banner from "../components/banner/Banner";
import CoinsTable from "../components/CoinsTable";
import AdSense from "react-adsense";

const HomePage = () => {
  return (
    <div>
      <AdSense.Google 
      client={process.env.REACT_APP_KEY} 
      slot={process.env.ID} 
      style={{ display: 'block' }}
      layout='in-article'
      format='fluid' />
      <Banner />
      <CoinsTable />
    </div>
  );
};

export default HomePage;
