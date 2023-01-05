import Navbaar from './components/header/Navbaar';
import Newnav from './components/newnavbaar/Newnav';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';
import Signup from './components/signup_signin/SignUp';
import Signin from './components/signup_signin/Signin';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import './App.css';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, [])


  return (
    <>
      {
        data ? (
          <>
            <BrowserRouter>
              <Navbaar />
              <Newnav />
              <Routes>
                <Route path="/" element={<Maincomp/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Signin/>}/>
                <Route path="/getproductsone/:id" element={<Cart/>}/>
                <Route path="/buynow" element={<Buynow/>}/>
              </Routes>
              <Footer />
            </BrowserRouter>
          </>
        ) : (
          <div className="circle">
            <CircularProgress />
            <h2> Loading....</h2>
          </div>
        )

      }

    </>
  );
}

export default App;


//rafce