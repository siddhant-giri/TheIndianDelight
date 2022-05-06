import React, { useContext } from 'react'
import {Row, Col} from "reactstrap"

import {FaRegStar, FaStar, FaRupeeSign} from "react-icons/fa"
import {MdDelete, MdEdit} from "react-icons/md"

import firebase from "firebase/compat/app"

import {ProductContext} from "../context/ProductContext"
import {UPDATE_PRODUCT, SET_SINGLE_PRODUCT} from "../context/action.types"

import { toast, Toast } from 'react-toastify'
import { getDatabase, ref, remove, update } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

const SectionProduct = ({product}) => {

    const {dispatch} = useContext(ProductContext);
    const history = useNavigate()
    
    const viewSingleProduct = product => {
        dispatch({
          type : SET_SINGLE_PRODUCT,
          payload : product
        }) 
    

        history("/product/view")
      }

    return(
      
        <Col  lg={3} onClick={()=>viewSingleProduct(product)} className='p-2 mt-5 cardhover' >  
                <img src={product.picture} height={150} width={250} style={{borderRadius : "8px"}}/>
                <h4 className='text-gray-100 text-6xl mt-2'>{product.name}</h4>
                <Row>
                <Col><p className='greyfontcolor'><FaStar /> {product.rating}</p></Col>
               
                <Col><p className='greyfontcolor'><FaRupeeSign /> {product.price}</p></Col>
                </Row>
                </Col>
    )

}


export default SectionProduct