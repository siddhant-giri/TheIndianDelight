import React, { useContext, useEffect } from 'react'
import {Row, Col} from "reactstrap"

import { FaRupeeSign} from "react-icons/fa"


import {ProductContext} from "../context/ProductContext"
import {SET_SINGLE_PRODUCT} from "../context/action.types"


import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { containerleftvariants } from './Animation'


const HomeProduct = ({product}) => {

    const {dispatch} = useContext(ProductContext);
    const history = useNavigate()

    //Displaying single product at a time
    const viewSingleProduct = product => {
        dispatch({
          type : SET_SINGLE_PRODUCT,
          payload : product
        }) 
    

        history("/product/view")
      }

    return(
      
      //Component for displaying product for customer side

        <Col onClick={()=>viewSingleProduct(product)} >  
        <motion.div
        variants = {containerleftvariants}
        initial="hidden"
        animate="visible"
        >
                <img height={150} width={150} src={product.picture} className="rounded-circle imghover" />
                <p className='text-gray-100 text-6xl lightfont mt-2'>{product.name}</p>
                <Row>
               
                <Col><p><FaRupeeSign /> {product.price}</p></Col>
                </Row>
                </motion.div>
                </Col>
    )

}


export default HomeProduct