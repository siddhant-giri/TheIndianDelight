import React, { useContext, useEffect } from 'react'
import {Row, Col} from "reactstrap"

import { FaStar, FaRupeeSign} from "react-icons/fa"
import { motion, useAnimation} from 'framer-motion';


import {ProductContext} from "../context/ProductContext"
import { SET_SINGLE_PRODUCT} from "../context/action.types"

import { useNavigate } from 'react-router-dom'
import { containerbottomvariants } from '../components/Animation';
import { useInView } from 'react-intersection-observer';


const SectionProduct = ({product}) => {

    const {dispatch} = useContext(ProductContext);
    const history = useNavigate()

    const controls = useAnimation();
  const [ref, inView] = useInView();
    
    const viewSingleProduct = product => {
        dispatch({
          type : SET_SINGLE_PRODUCT,
          payload : product
        }) 
    

        history("/product/view")
      }

      useEffect(() => {
        if (inView) {
          controls.start("visible");
        }
      }, [controls, inView]);

    //Component for displaying product for customer side

    return(
      
        <Col  lg={3} onClick={()=>viewSingleProduct(product)} className='p-2 mt-5 cardhover' > 
        <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        transition={{ duration: 0.3 }}
        variants = {containerbottomvariants}
        
        >
                <img src={product.picture} height={150} width={250} style={{borderRadius : "8px"}}/>
                <h4 className='text-gray-100 text-6xl mt-2'>{product.name}</h4>
                <Row>
                <Col><p className='greyfontcolor'><FaStar /> {product.rating}</p></Col>
               
                <Col><p className='greyfontcolor'><FaRupeeSign /> {product.price}</p></Col>
                </Row>
                </motion.div> 
                </Col>
    )

}


export default SectionProduct