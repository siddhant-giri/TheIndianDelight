import React, { useContext } from 'react'

import { Container, ListGroup, ListGroupItem, Navbar, Spinner } from 'reactstrap'
import Product from '../components/Product'
import {MdAdd} from "react-icons/md"
import { Navigate, useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import { UPDATE_PRODUCT } from '../context/action.types'
import Header from '../layout/Header'
import { UserContext } from '../context/UserContext'
import { motion } from 'framer-motion'

import { containervariants, containerbottomvariants } from '../components/Animation'





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
      <div className='text-center'>
          <Spinner className='primaryTextColor' />
          <div className='primaryTextColor outfitfont'>Loading...</div>
      </div>
    )
  }

  if(context.user?.email !== "sidgiri2000@gmail.com"){
    return <Navigate to="/" />
  }

  return (
    <div className='darkbg'>

      
    
    <Container className=' darkbg'>
      <motion.div
      variants = {containervariants}
      initial="hidden"
      animate="visible"
      className='text-center rounded loginbtn' onClick={AddProduct}>
        <span className='outfitfont ' >
    <MdAdd className='fab icon'   />
    Add more Products
    </span>
    </motion.div> 

    <motion.div 
    variants = {containerbottomvariants}
    initial="hidden"
    animate="visible"
    > 
        {
          products.length === 0 && !isLoading ? (
              <div className='center text-large primaryTextColor darkbg'>
                No Products found in database
              </div>
          ) : (
              <ListGroup className='darkbg'>
                {
                  Object.entries(products).map(([key, value]) => (
                    
                    <ListGroupItem style={{background : '#222222'}} className='m-2 border-bottom border-top-0 border-right-0 border-left-0' key={key}>
                      <Product product={value} productKey={key} />
                    </ListGroupItem>
                    
          ))
                }
              </ListGroup>
          )
        }
        </motion.div>
    </Container>
    </div>
  )
      }
      


export default Products