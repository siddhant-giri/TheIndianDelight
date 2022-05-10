import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Col,  Row } from 'reactstrap'
import {UserContext} from "../context/UserContext"
import OrderSummary from "../components/OrderSummary"
import Header from '../layout/Header'
import {FaArrowRight } from "react-icons/fa"
import greydivider from "../images/greydivider.png"
import Footer from '../layout/Footer'
import { motion } from 'framer-motion'
import { containerrightvariants, containerleftvariants } from '../components/Animation'



//My account page - displays imp links and past orders
const Account = () => {

    
    const context = useContext(UserContext)


//If user not present in context  
if(!context.user?.uid){
    return <Navigate to="/signin" />
  }

//If user is present in context
  return (
    <div className='darkbg homebody outfitfont text-white'>
        <Header />
        {/* <div className='container-fluid'> */}
        <Row className='px-5 py-5 mt-5'>
            <Col lg={6}>
            <motion.div 
            variants = {containerleftvariants}
            initial="hidden"
            animate="visible"
            >
                <h1 className='text-uppercase mt-5' style={{
                    fontWeight: "900",
                    color : "#797979",
                    fontSize : "40px"
                }}>Hi, {context.user?.displayName ? context.user.displayName : context.user.email}</h1>

                <h4></h4>

               
                        <Row className='mt-5' >
                            
                           
                            <Col lg={8}>
                            <Link to="/address" className='addresslink '>
                                <h3 className='text-white'>Manage Address</h3>
                                <p className='greyfontcolor'>Edit your Delivery address</p>
                                </Link>
                            </Col>
                            <Col lg={4} className="mt-4">
                            <Link to="/address">
                                <FaArrowRight className='greyfontcolor arrowright'/>
                                </Link>
                            </Col>
                           

                        </Row>
                        <Row>
                            <Col lg={12}>
                                <img src={greydivider} className="img-fluid" />
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                           
                            <Col lg={8}>
                            <Link to="/" className='addresslink'>
                                <h3 className='text-white'>FAQ'S and Links</h3>
                                <p className='greyfontcolor'>any doubts regarding our service ?</p>
                                </Link>
                            </Col>
                            <Col lg={4} className="mt-4">
                            <Link to="/">
                                <FaArrowRight className='greyfontcolor arrowright'/>
                                </Link>
                            </Col>
                           

                        </Row>
                        <Row>
                            <Col lg={12}>
                                <img src={greydivider} className="img-fluid" />
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                           
                            <Col lg={8}>
                            <Link to="/" className='addresslink'>
                                <h3 className='text-white'>Your Favourites</h3>
                                <p className='greyfontcolor'>Check out your favourite cuisine's</p>
                                </Link>
                            </Col>
                            <Col lg={4} className="mt-4">
                            <Link to="/">
                                <FaArrowRight className='greyfontcolor arrowright'/>
                                </Link>
                            </Col>
                           

                        </Row>
                        </motion.div>
                   
            </Col>
            <Col lg={6}>
            <motion.div 
            variants = {containerrightvariants}
            initial="hidden"
            animate="visible"
            >
                <h1 className='montezfont primaryTextColor mt-5'>Past Orders</h1>
                <OrderSummary />
                </motion.div>
            </Col>

        </Row>
        {/* </div> */}
        <Footer />
    </div>
  )
}

export default Account