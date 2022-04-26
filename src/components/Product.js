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

const Product = ({product, productKey}) => {


  const {dispatch} = useContext(ProductContext);

  const history = useNavigate();

  const db = getDatabase();

  const deleteProduct = () => {

    remove(ref(db, `/products/${productKey}`))
    .then(() => {
      toast("Deleted Successfully", {type : "warning"})
    })
    .catch(err => console.log(err));
  }

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

  const viewSingleProduct = product => {
    dispatch({
      type : SET_SINGLE_PRODUCT,
      payload : product
    })

    history("/product/view")
  }


  return (
    <>
    <Row>
      <Col
        md="1"
        className="d-flex justify-content-center align-items-center"
      >
        <div className="icon" onClick={() => updateImpProduct()}>
          {product.star ? (
            <FaStar className=" text-primary" />
          ) : (
            <FaRegStar className=" text-info" />
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
        <div className="text-primary">{product.name}</div>

        <div className="text-secondary">{product.type}</div>
        <div className="text-secondary">{product.price}</div>

      </Col>
      <Col
        md="1"
        className="d-flex justify-content-center align-items-center"
      >
        <MdDelete
          onClick={() => deleteProduct()}
          color="danger"
          className="text-danger icon"
        />
        <MdEdit
          className="icon text-info ml-2"
          onClick={() => updateProduct()}
        />
      </Col>
    </Row>
  </>
  )
}

export default Product