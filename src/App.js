import React, { useEffect, useReducer, useState } from 'react'



import "bootstrap/dist/css/bootstrap.min.css"

//react router
import {BrowserRouter as Router , Route, Routes} from "react-router-dom"

//toastify imports
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css"

//firebase imports
import { firebaseConfig } from './utils/config';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getDatabase, onValue, ref } from 'firebase/database';
import "firebase/storage";



//components import
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import PageNotFound from "./pages/PageNotFound"

//context api imports
import reducer from "./context/reducer"
import { UserContext } from './context/UserContext';
import { SET_LOADING, SET_PRODUCT } from './context/action.types';
import { ProductContext } from './context/ProductContext';
import Products from './pages/Products';
import AddProducts from './pages/AddProducts';
import ViewProduct from './pages/ViewProduct';
import { CartContext } from './context/CartContext';
import Checkout from './pages/Checkout';
import Address from './pages/Address';
import Account from './pages/Account';


//init firebase
firebase.initializeApp(firebaseConfig)


const initialState = {
  products : [],
  product : {},
  productToUpdate : null,
  productToUpdateKey : null,
  isLoading : false
}


const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart' || '[]'))

const App = () => {


  const [user,setUser] = useState(null);
  // const [address, setAddress] = useState("");
  const [state, dispatch] = useReducer(reducer,initialState);
  const [cartItem, setCartItem] = useState(cartFromLocalStorage);

  const getProducts = async () => {
    dispatch({
      type : SET_LOADING,
      payload : true
    });


    const db = getDatabase();

    const productsRef = await ref(db,"/products");
    onValue(productsRef, (snapshot) => {
      dispatch({
        type : SET_PRODUCT,
        payload : snapshot.val()
      });
      
      dispatch({
      type : SET_LOADING,
      payload : false
      }); 
    })


  }

  useEffect(() => {
    getProducts();
  },[]);

  
  useEffect(() => {
    const localTodos = localStorage.getItem("authUser")
    console.log({localStorage});
    if(localTodos){
      setUser(JSON.parse(localTodos))
    }
  },[])


  // useEffect(()=>{
  //   const localProducts = localStorage.getItem("products")
  //   console.log({localStorage});
  //   if(localProducts){
  //   setCartItem(JSON.parse(localProducts))
  // }
  // },[])

  

  return (
    <Router>
        <ToastContainer />
      <UserContext.Provider value={{user, setUser}}>
        <ProductContext.Provider value={{state, dispatch}}>
          <CartContext.Provider value={{cartItem, setCartItem}}>
            {/* <AddressContext.Provider value={{address,setAddress}}> */}
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/signin' element= {<SignIn />}/>
            <Route exact path='/signup' element={<SignUp />}/>
            <Route exact path='/products' element={<Products />}/>
            <Route exact path='/product/add' element={<AddProducts />}/>
            <Route exact path='/product/view' element={<ViewProduct />}/>
            <Route exact path='/checkout' element={<Checkout />} />
            <Route exact path='*' element={<PageNotFound />}/>
            <Route exact path='/address' element={<Address />}/>
            <Route exact path='/myaccount' element={<Account />} />
            {/* <Route exact path='/ordersummary' element={<OrderSummary />}/> */}

          </Routes>
          {/* </AddressContext.Provider> */}
          </CartContext.Provider>
          </ProductContext.Provider>
        </UserContext.Provider>
    </Router>
  )
}

export default App