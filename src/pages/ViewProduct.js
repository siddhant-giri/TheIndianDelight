import React, { useContext, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";


const ViewProduct = () => {

  const {state} = useContext(ProductContext);

  const context = useContext(UserContext);

  const contextCart = useContext(CartContext);

  const history = useNavigate();

  const {product} = state

  if(context.user?.email === "sidgiri2000@gmail.com"){
    return(
    <Container>
      <Row className="mt-5 mb-5">
        <Col md="5" className="offset-md-3">
          <Card className="pt-3 pb-5">
            <CardBody>
              <img 
              height="150"
              width="150"
              className="cardImg profile border-danger"
              src={product?.picture}
              />
              <CardTitle className="text-primary mt-3">
                <h1>{product?.name}</h1>
              </CardTitle>
              <CardSubtitle>
                <h3>
                  
                  {product?.type}
                </h3>
              </CardSubtitle>
              <CardSubtitle>
                <h3>
                  
                  {product?.price}
                </h3>
              </CardSubtitle>
              <CardSubtitle>
                <p>
                  
                  {product?.consistOf}
                </p>
              </CardSubtitle>
              <CardSubtitle>
                <p>
                 
                  {product?.benefits}
                </p>
              </CardSubtitle>
            </CardBody>
          </Card>
        </Col>

      </Row>
    </Container>
    )
  }

  


  const addInCart = item => {
    const isAlreadyAdded = contextCart.cartItem.findIndex(array => {
        return array.id === item.id;
    })

    if(isAlreadyAdded !== -1) {
        toast("already added in cart", {type : "error"});
        return;
    }

    contextCart.setCartItem([...contextCart.cartItem,item])
    
    



    history("/checkout")
}

// useEffect(()=>{
//   localStorage.setItem("products",JSON.stringify(contextCart.cartItem));
// },[])

  
    

  return (
    <Container>
      <Row className="mt-5 mb-5">
        <Col md="5" className="offset-md-3">
          <Card className="pt-3 pb-5">
            <CardBody>
              <img 
              height="150"
              width="150"
              className="cardImg profile border-danger"
              src={product?.picture}
              />
              <CardTitle className="text-primary mt-3">
                <h1>{product?.name}</h1>
              </CardTitle>
              <CardSubtitle>
                <h3>
                  
                  {product?.type}
                </h3>
              </CardSubtitle>
              <CardSubtitle>
                <h3>
                  
                  {product?.price}
                </h3>
              </CardSubtitle>
              <CardSubtitle>
                <p>
                  
                  {product?.consistOf}
                </p>
              </CardSubtitle>
              <CardSubtitle>
                <p>
                 
                  {product?.benefits}
                </p>
              </CardSubtitle>
              <button onClick={()=>addInCart(product)}>Add To Cart</button>
            </CardBody>
          </Card>
        </Col>

      </Row>
    </Container>

  )
}

export default ViewProduct