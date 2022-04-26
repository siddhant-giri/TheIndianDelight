import React, { useContext } from 'react'
import {Row, Col} from "reactstrap"

import {FaRegStar, FaStar} from "react-icons/fa"
import {MdDelete, MdEdit} from "react-icons/md"

import firebase from "firebase/compat/app"

import {ProductContext} from "../context/ProductContext"
import {UPDATE_PRODUCT, SET_SINGLE_PRODUCT} from "../context/action.types"

import { toast, Toast } from 'react-toastify'
import { getDatabase, ref, remove, update } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

const HomeProduct = ({product}) => {

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
        <Col onClick={()=>viewSingleProduct(product)} md="2" >  
                <img height={150} width={150} src={product.picture} />
                <h3 className='text-gray-100 text-6xl font-semibold'>{product.name}</h3>
                <h3>{product.type}</h3>
                <h3>{product.price}</h3>
                </Col>
    )

}


export default HomeProduct