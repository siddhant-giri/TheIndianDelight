import React, { useContext } from 'react'

import { Container, ListGroup, ListGroupItem, Navbar, Spinner } from 'reactstrap'
import Product from '../components/Product'
import {MdAdd} from "react-icons/md"
import { Navigate, useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import { UPDATE_PRODUCT } from '../context/action.types'
import Header from '../layout/Header'
import { UserContext } from '../context/UserContext'


const Products = () => {

  const {state, dispatch} = useContext(ProductContext);
  const context = useContext(UserContext);

  const {products, isLoading} = state;

  const history = useNavigate();

  const AddProduct = () => {
    dispatch({
      type : UPDATE_PRODUCT,
      payload : null,
      key : null
    })

    history("/product/add");
  }

  if(isLoading){
    return (
      <div className='center'>
          <Spinner color='primary' />
          <div className='text-primary'>Loading...</div>
      </div>
    )
  }

  if(context.user?.email !== "sidgiri2000@gmail.com"){
    return <Navigate to="/" />
  }

  return (
    <>
    
    <Container className='mt-4'>
      
        {
          products.length === 0 && !isLoading ? (
              <div className='center text-large text-primary'>
                No Products found in database
              </div>
          ) : (
              <ListGroup>
                {
                  Object.entries(products).map(([key, value]) => (
                    <ListGroupItem key={key}>
                      <Product product={value} productKey={key} />
                    </ListGroupItem>
          ))
                }
              </ListGroup>
          )
        }
        <MdAdd className='fab icon' onClick={AddProduct} />
    </Container>
    </>
  )
      }
      


export default Products