import React, { useContext, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap'
import {UserContext} from "../context/UserContext"
import OrderSummary from "../components/OrderSummary"
import Header from '../layout/Header'
import {FaArrowRight, FaMapMarkerAlt} from "react-icons/fa"
import greydivider from "../images/greydivider.png"
import Footer from '../layout/Footer'

const Account = () => {

    
    const context = useContext(UserContext)


    
if(!context.user?.uid){
    return <Navigate to="/signin" />
  }

  return (
    <div className='darkbg homebody outfitfont text-white'>
        <Header />
        <Row className='px-5 py-5 mt-5'>
            <Col lg={6}>
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
                                <FaArrowRight className='greyfontcolor'/>
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
                                <FaArrowRight className='greyfontcolor'/>
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
                                <FaArrowRight className='greyfontcolor'/>
                                </Link>
                            </Col>
                           

                        </Row>
                   
            </Col>
            <Col lg={6}>
                <h1 className='montezfont primaryTextColor mt-5'>Past Orders</h1>
                <OrderSummary />
            </Col>

        </Row>
        <Footer />
    </div>
  )
}

export default Account