import { Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import CoinsPage from "./pages/CoinsPage";
import { makeStyles } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import Header from './components/Header'
import 'react-alice-carousel/lib/alice-carousel.css';

function App() {
  const useStyle = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "#fff",
      minHeight: "100vh",
    },
  }));

  const classes = useStyle();

  return (
      <BrowserRouter>
        <div className={classes.App}>
        <Header />
        
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/coins/:id">
            <CoinsPage />
          </Route>
        </div>
      </BrowserRouter>
  );
}

export default App;
