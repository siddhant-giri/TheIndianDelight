import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
import card1 from "../images/card1.png"
import card2 from "../images/card2.png"
import card3 from "../images/card3.png"
import divider from "../images/divider.png"
import Footer from '../layout/Footer';
import SectionProduct from '../components/SectionProduct';



const Home = () => {

    const context = useContext(UserContext);


    
    // const [user, setUser] = useState(null)

    const [results, setResults] = useState([]);

    // const history = useNavigate();

    const fetchDetails = async () => {
      const {data} = await instance.get('/products.json')

      // console.log(data);

      const fetchedResults = [];
      for(let key in data){
        fetchedResults.unshift(
          {
            ...data[key],
            id:key
          }
          
        )
      }

      // console.log(fetchedResults);

      setResults(fetchedResults)
    

      
    }

    useEffect(() => {
      fetchDetails();
    }, [])
    


    


   
    

    
  

    if(!context.user?.uid){
      return <Navigate to="/signin" />
    }

if(context.user?.email === "sidgiri2000@gmail.com"){
  return(
    <div className='darkbg'>
      <Header />
      <Products />
    </div>
  )
}





  return (
    <div className='darkbg homebody outfitfont text-white'>
        <Header />
        {/* <button onClick={fetchDetails}>click me</button> */}

       
        <h1 className=' px-5 py-4 mt-4' style={{color : "transparent"}}>Categories for you</h1>


   


          <Row className='px-5 mb-4 text-left'>


            
            
              <Link to='/search/biryanis' className='tags  text-center px-5 py-2  m-2 '>Biryanis</Link>
              <Link to='/search/thalis' className='tags  text-center px-5 py-2  m-2 '>Thalis</Link>
              <Link to='/search/sweets' className='tags  text-center px-5 py-2  m-2'>Sweets</Link>
              <Link to='/search/maincourse' className='tags  text-center px-5 py-2 m-2'>Main Course</Link>
              <Link to='/search/salads' className='tags  text-center px-5 py-2 m-2'>Salads</Link>
              <Link to='/search/maincourse' className='tags  text-center px-5 py-2 m-2'>Heavy Meals</Link>
              <Link to='/search/sweets' className='tags  text-center px-5 py-2 m-2'>Desserts</Link>

            
              
             
   
          </Row>
       

        <h1 className='montezfont primaryTextColor px-5'>Popular Thalis</h1>
        
          <Row className='text-center'>
        {

            results.filter(result => result.type === "thalis").map(
              result => (

                <HomeProduct key={result.id} product={result} />

                
              )
            )
        }
        </Row >
        <Row className='text-center mt-4'>
          <Col lg={4} className=' cardhover '>
          <Link to='/search/biryanis' className='text-center'><img src={card1} width={420} />
          </Link>
          </Col>
          <Col lg={4} className=' cardhover '>
          <Link to='/search/salads' className='text-center '><img src={card2} width={420}/>
          </Link>
          </Col>
          <Col lg={4} className=' cardhover '>
          <Link to='/search/maincourse' className=' text-center'><img src={card3} width={420}/>
          </Link>
          </Col>

        </Row>

        <Row>
          <Col lg={12} className='text-center my-4'>
        <img src={divider} className="img-fluid" />
        </Col>
        </Row>

        <h1 className='montezfont primaryTextColor px-5 mt-4'>Delightful Recommendations</h1>

        <Row className='text-left ml-5'>
        {

            results.filter(result => result.type === "maincourse").map(
              result => (

                <SectionProduct  key={result.id} product={result} />

                
              )
            )
        }
        </Row >


        <Row>
          <Col lg={12} className='text-center my-3'>
        <img src={divider} className="img-fluid"/>
        </Col>
        </Row>


        <h1 className='montezfont primaryTextColor px-5 mt-2'>Mouthwatering Sweets</h1>



        <Row className='text-center'>
        {

results.filter(result => result.type === "sweets").map(
  result => (

    <HomeProduct key={result.id} product={result} />

    
  )
)


}
        </Row>
        <Footer />
        </div>
    
  )
}

export default Home