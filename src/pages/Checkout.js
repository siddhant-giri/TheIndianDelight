import { getDatabase, ref, set } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react'
import StripeCheckoutButton from 'react-stripe-checkout';
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { CartContext } from '../context/CartContext'
import { UserContext } from '../context/UserContext';
import { v4 } from 'uuid'
import instance from '../apis/instance'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import {MdDelete} from "react-icons/md"
import {FaStar, FaEdit, FaStripe} from "react-icons/fa"
import {motion} from "framer-motion"

import { containerleftvariants, containerrightvariants } from '../components/Animation';







const Checkout = () => {

    const contextCart = useContext(CartContext);
    const context = useContext(UserContext);
    const [address, setAddress] = useState([]);
    const history = useNavigate();


    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(contextCart.cartItem))
    },[contextCart.cartItem])
  
        

  

    let amount  = 0;

    contextCart.cartItem.forEach(item => {
        amount = parseFloat(amount) + parseFloat(item.price)
    })
    

    const fetchDetails = async () => {
        const {data} = await instance.get('/users.json')
        
        const fetchedResults = [];
      for(let key in data){
        fetchedResults.unshift(
          {
            ...data[key],
            id:key
          }
          
        )
      }

      const finalresult = fetchedResults.filter(result => result.id === context.user.uid).map(
        result => result.address
      )

      setAddress(finalresult)


        }


        useEffect(()=>{
            fetchDetails();
            
        })



    const buyNow = () => {

        try{
            const db = getDatabase();
            set(ref(db, 'ordersummary/'+ v4()),{
                
                orders : contextCart.cartItem,
                uid : context.user.uid

            })
            
            
            
        }

        catch(e){
            console.log(e);
        }



        contextCart.setCartItem([])


        toast("Purchase complete", {type : "success"})
        history('/')
    }

    const removeItem = item => {
        contextCart.setCartItem(contextCart.cartItem.filter(singleItem => singleItem.id !== item.id))
    }

    if(!context.user?.uid){
        return <Navigate to="/signin" />
      }


           
            


  return (
    <div className='darkbg homebody outfitfont text-white'>
        <Header /> 
<Row className='px-5 mt-5'>
    <Col className='mt-5'>

        <h1 className='montezfont primaryTextColor mt-5'> Your Cart </h1></Col>
        </Row>

        <Row className='px-5  '>
            
            <Col lg={5}>
            <motion.div
            variants = {containerleftvariants}
            initial="hidden"
            animate="visible"
            > 
        <ListGroup >
                {
                    
                    contextCart.cartItem.map(
                        item => (
                            <ListGroupItem key={item.id} className="mt-2 p-4" style={{background : '#181818'}} >
                                <Row >
                                    <Col lg={3}>
                                        <img height={100} src={item.picture} className="rounded-circle" />
                                    </Col>
                                    <Col lg={6} className="text-left ">
                                        <div className='primaryTextColor mt-2'>
                                            <h4>{item.name}</h4>
                                        </div>
                                        <Row>
                <Col><p className='greyfontcolor'><FaStar /> {item.rating}</p></Col>
               
                <Col><p className='greyfontcolor'>Rs. {item.price}</p></Col>
                </Row>
                                    </Col>
                                    <Col className=''>
                                    <Button onClick={()=>removeItem(item)} className="border-0 cardhover text-dark mt-3" style={{background:"#DCCA87"}}><MdDelete /></Button>
                                    
                                    </Col>
                                    
                                </Row>
                            </ListGroupItem>
                        )
                    )
                }
        </ListGroup>
       
                </motion.div>
            
            </Col>



            <Col lg={7}>
            <motion.div
            variants = {containerrightvariants}
            initial="hidden"
            animate="visible"
            > 
            {
            contextCart.cartItem.length >= 1 ? (
                <Card className='text-left mt-2' style={{background : '#2F2F2F'}}>
                    
                    <CardHeader className='darkbg '>
                        Billing Details
                    </CardHeader>
                    <CardBody style={{background : '#2F2F2F'}} className="greyfontcolor">
                        <Row>
                       <Col lg={8}> Your amount for {contextCart.cartItem.length} food item</Col> <Col lg={4}>Rs. {amount}</Col>
                        </Row>
                        </CardBody>
                    
                    <CardFooter style={{background : '#2F2F2F'}}>
                        
                        <StripeCheckoutButton
                        stripeKey='pk_test_51IAUiJIyZuCYkP3XctPVShj2uFTTGpeEmzDz3g65OUUGboXJtOlF8Gr7igvvCPwK2TphoI4UWVLATQNtoeKn7o3S00DHzy9PzW'
                        amount={amount * 100}
                        token={buyNow}
                        name="Buy Food"
                        currency='INR'
                        shippingAddress
                        billingAddress
                        email={context.user.email}
                        >
                        <button className='loginbtn' >
                             Pay with <FaStripe className='ml-1' style={{fontSize : "34px"}}/></button>
                        </StripeCheckoutButton>
                        
                        </CardFooter>
                </Card>
            ) : (
                <h1 className='primaryTextColor mt-5'>Cart is Empty :(</h1>
            ) 
        }
            
            <Card className='darkbg mt-4'>
            <CardBody className='darkbg'>
                <Row>
                    <Col lg={8} className="mt-2">
                <span className='primaryTextColor'>Delivery Address</span> : {address}
                </Col>
                <Col lg={4} className='mt-2'> 
                    <Link to="/address" className='loginbtn px-3 rounded '>Edit Address <FaEdit className='ml-2'/></Link>
                </Col>
                </Row>
            </CardBody>
        </Card>
        </motion.div>
            
            </Col>

        </Row>
        

<div className='mt-5 p-5'><br/></div>



        <Footer />


        
       
    </div>
  )
}

export default Checkout