import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import instance from '../apis/instance';
import { SET_SINGLE_PRODUCT } from '../context/action.types';
import { ProductContext } from '../context/ProductContext';
import { UserContext } from '../context/UserContext'



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

        // const finalresult = results.filter(result => result.uid === context.user.uid).map(
        //     result => result.id
        // )



        

        setResults(fetchedResults);
       
        

        // setResults(finalresult)

    


    }

    useEffect(()=>{
        fetchDetails()
    })


  return (
    <div>
        <ListGroup>
        {
            
            results.filter(result => result.uid === context.user.uid).map(
                result => result.orders.map(
                    item => (
                        
                        <ListGroupItem key={item.id} onClick={() => viewSingleProduct(item)}>
                                <Row>
                                    <Col>
                                        <img height={50} src={item.picture} />
                                    </Col>
                                    <Col className="text-center">
                                        <div className='text-primary'>
                                            {item.name}
                                        </div>
                                        <span>price :- {item.price}</span>
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