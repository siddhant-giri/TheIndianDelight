import { getDatabase, ref, set } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react'
import StripeCheckoutButton from 'react-stripe-checkout';
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { CartContext } from '../context/CartContext'
import { UserContext } from '../context/UserContext';
import { v4 } from 'uuid'
import instance from '../apis/instance'
import { Navigate, useNavigate } from 'react-router-dom';







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
            fetchDetails()
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
    <div>
        <h1> Your Cart </h1>
        <ListGroup>
                {
                    
                    contextCart.cartItem.map(
                        item => (
                            <ListGroupItem key={item.id}>
                                <Row>
                                    <Col>
                                        <img height={50} src={item.picture} />
                                    </Col>
                                    <Col className="text-center">
                                        <div className='text-primary'>
                                            {item.name}
                                        </div>
                                        <span>price :- {item.price}</span>
                                        <Button onClick={()=>removeItem(item)} color='danger'>Remove</Button>
                                    </Col>
                                    
                                </Row>
                            </ListGroupItem>
                        )
                    )
                }
        </ListGroup>
        <Card>
            <CardBody>
                Delivery Address : {address}
            </CardBody>
        </Card>
        {
            contextCart.cartItem.length >= 1 ? (
                <Card className='text-center mt-3'>
                    <CardHeader>
                        Grand Total
                    </CardHeader>
                    <CardBody>Your amount for {contextCart.cartItem.length} product is {amount}</CardBody>
                    
                    <CardFooter>
                        
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
                        <Button color='success'>Pay Here</Button>
                        </StripeCheckoutButton>
                        
                        </CardFooter>
                </Card>
            ) : (
                <h1 className='text-warning'>Cart is Empty</h1>
            ) 
        }
    </div>
  )
}

export default Checkout