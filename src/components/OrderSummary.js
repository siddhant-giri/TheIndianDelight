import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import instance from '../apis/instance';
import { SET_SINGLE_PRODUCT } from '../context/action.types';
import { ProductContext } from '../context/ProductContext';
import { UserContext } from '../context/UserContext'


//Component for showing Customer's past orders

const OrderSummary = () => {

    const context = useContext(UserContext);
    const [results,setResults] = useState([]);


    const {dispatch} = useContext(ProductContext);
    const history = useNavigate()
    
    const viewSingleProduct = product => {
        dispatch({
          type : SET_SINGLE_PRODUCT,
          payload : product
        })
    

        history("/product/view")
      }


    const fetchDetails = async () => {
        const {data} = await instance.get('/ordersummary.json');
        const fetchedResults = []

        for(let key in data){
            fetchedResults.unshift(
                {
                    ...data[key],
                    id : key
                }
            )
        }

        setResults(fetchedResults);
    }

    useEffect(()=>{
        fetchDetails()
    })


  if(!results){
        return(
        <div>
            <h1>No Past orders found</h1>
        </div>
        )
    }

  return (
    <div >
        <ListGroup >
        {
            
            results.filter(result => result.uid === context.user.uid).map(
                result => result.orders.map(
                    item => (
                        
                        <ListGroupItem key={item.id} className='mt-2 p-4' style={{background : '#181818'}}  >
                                <Row className='blackbg'>
                                    <Col lg={2}>
                                        <img height={50} src={item.picture} className="rounded-circle" />
                                    </Col>
                                    <Col lg={6} className="text-left">
                                        <div className='primaryTextColor'>
                                            {item.name}
                                        </div>
                                        <span className='greyfontcolor'>Rs. {item.price}</span>
                                    </Col>
                                    <Col >
                                    <button className='loginbtn' onClick={() => viewSingleProduct(item)}>Reorder</button>
                                    </Col>
                                    
                                </Row>
                            </ListGroupItem>
                    )
                )
            )
            
        }
        </ListGroup>
       
    </div>
  )
}

export default OrderSummary