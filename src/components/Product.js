import React, { useContext } from 'react'
import {Row, Col} from "reactstrap"

import {FaRegStar, FaStar} from "react-icons/fa"
import {MdDelete, MdEdit} from "react-icons/md"

import {ProductContext} from "../context/ProductContext"
import {UPDATE_PRODUCT, SET_SINGLE_PRODUCT} from "../context/action.types"

import { toast, Toast } from 'react-toastify'
import { getDatabase, ref, remove, update } from 'firebase/database'
import { useNavigate } from 'react-router-dom'


//Component for managing products in admin side

const Product = ({product, productKey}) => {


  const {dispatch} = useContext(ProductContext);

  const history = useNavigate();

  const db = getDatabase();

  //Deleting a product from admin side and from db

  const deleteProduct = () => {

    remove(ref(db, `/products/${productKey}`))
    .then(() => {
      toast("Deleted Successfully", {type : "warning"})
    })
    .catch(err => console.log(err));
  }


  //Updating a product from admin side and from db

  const updateImpProduct = () => {
    update(ref(db,`/products/${productKey}`),{
      star : !product.star
    },
    err => {
      console.log(err);
    }
    )
    .then(() => {
      toast("Product Updated", {type : "info"})
    })
    .catch(err => {console.log(err)})
  }

  const updateProduct = () => {
    dispatch({
      type : UPDATE_PRODUCT,
      payload : product,
      key : productKey
    });

    history("/product/add");

  }


  //Viewing a product 

  const viewSingleProduct = product => {
    dispatch({
      type : SET_SINGLE_PRODUCT,
      payload : product
    })

    history("/product/view")
  }


  return (
    <div className='darkbg outfitfont'>
    <Row className='darkbg'>
      <Col
        md="1"
        className="d-flex justify-content-center align-items-center"
      >
        <div className="icon" onClick={() => updateImpProduct()}>
          {product.star ? (
            <FaStar className="primaryTextColor" />
          ) : (
            <FaRegStar className=" primaryTextColor" />
          )}
        </div>
      </Col>
      <Col
        md="2"
        className="d-flex justify-content-center align-items-center"
      >
        <img height={100} width={100} src={product.picture} alt="" className="img-circle profile" />
      </Col>
      <Col md="8" onClick={() => viewSingleProduct(product)}>
        <div className="primaryTextColor">{product.name}</div>

        <div className="greyfontcolor">Category : {product.type}</div>
        <div className="greyfontcolor">Rs.{product.price}</div>
        <div className="greyfontcolor"><FaStar /> <span className=''>{product.rating}</span></div>


      </Col>
      <Col
        md="1"
        className="d-flex justify-content-center align-items-center"
      >
        <MdDelete
          onClick={() => deleteProduct()}
          color="danger"
          className="text-danger icon iconsize" 

        />
        <MdEdit
          className="icon primaryTextColor ml-2 iconsize"
          onClick={() => updateProduct()}
        />
      </Col>
    </Row>
  </div>
  )
}

export default Product