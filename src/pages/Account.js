import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import {UserContext} from "../context/UserContext"
import OrderSummary from "../components/OrderSummary"

const Account = () => {

    
    const context = useContext(UserContext)


    
if(!context.user?.uid){
    return <Navigate to="/signin" />
  }

  return (
    <div>
        <Row>
            <Col>
                <h1>Email : {context.user?.displayName ? context.user.displayName : context.user.email}</h1>
                <h1></h1>
            </Col>
            <Col>
                <h1>Your Past Orders</h1>
                <OrderSummary />
            </Col>

        </Row>
    </div>
  )
}

export default Account