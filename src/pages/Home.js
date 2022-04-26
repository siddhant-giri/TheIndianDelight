import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'
import Header from '../layout/Header';
import Products from './Products'
import Axios from 'axios';
import { toast } from 'react-toastify';
import instance from '../apis/instance';
import { Row,Col } from 'reactstrap';
import { SET_SINGLE_PRODUCT } from '../context/action.types';
import { ProductContext } from '../context/ProductContext';
import HomeProduct from '../components/HomeProduct';



const Home = () => {

    const context = useContext(UserContext);
    
    const [user, setUser] = useState(null)

    const [results, setResults] = useState([]);

    const history = useNavigate();

    const fetchDetails = async () => {
      const {data} = await instance.get('/products.json')

      console.log(data);

      const fetchedResults = [];
      for(let key in data){
        fetchedResults.unshift(
          {
            ...data[key],
            id:key
          }
          
        )
      }

      console.log(fetchedResults);

      setResults(fetchedResults)
    

      
    }

    useEffect(() => {
      fetchDetails();
    }, [])
    


    


    // useEffect(() => {
    //   instance.get('/products.json')
    //   .then(res => console.log(res.data))
    //   .catch(err => console.log(err))
    // }, [])
    

    
  

    if(!context.user?.uid){
      return <Navigate to="/signin" />
    }

if(context.user?.email === "sidgiri2000@gmail.com"){
  return(
    <div>
      <Header />
      <Products />
    </div>
  )
}



  return (
    <div className='darkbg'>
        <Header />
        {/* <button onClick={fetchDetails}>click me</button> */}

        <div className=''>
          <Row className=''>
        {

            results.filter(result => result.type === "biryanis").map(
              result => (

                <HomeProduct key={result.id} product={result} />

                
              )
            )

          // results.map(result => {
          //   result.type === "biryani" ? (
          //       <h1>result.picture</h1>
          //   ) : (
          //     <h1> Not present</h1>
          //   )
          // })
        }
        </Row >
        </div>
    </div>
  )
}

export default Home