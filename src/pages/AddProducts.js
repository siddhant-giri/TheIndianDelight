import React, { useContext, useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'


import { Button, Col, Container, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'

import {readAndCompressImage} from "browser-image-resizer"

import {imageConfig} from "../utils/config"

import {MdAddCircleOutline} from "react-icons/md"

import { v4 } from 'uuid'
import { ProductContext } from '../context/ProductContext'

import { UPDATE_PRODUCT } from '../context/action.types'

import { Navigate, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import { getDownloadURL, getStorage, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { getDatabase, ref as sref, set } from 'firebase/database'
import { ref } from 'firebase/storage'
import Header from '../layout/Header'
import { UserContext } from '../context/UserContext'




const AddProducts = () => {

  const {state, dispatch} = useContext(ProductContext);

  const {productToUpdate, productToUpdateKey} = state;
  const context = useContext(UserContext);

  const history = useNavigate();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [consistOf, setConsistOf] = useState("");
  const [benefits, setBenefits] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [star, setStar] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if(productToUpdate){
    setName(productToUpdate.name);
    setType(productToUpdate.type);
    setPrice(productToUpdate.price);
    setConsistOf(productToUpdate.consistOf);
    setBenefits(productToUpdate.benefits);
    setStar(productToUpdate.star);
    setDownloadUrl(productToUpdate.picture);

    setIsUpdate(true);
    }

  }, [productToUpdate])

  const imagePicker = async e => {
    try{
      const file = e.target.files[0];

      var metadata = {
        contentType : file.type
      };

      let resizedImage = await readAndCompressImage(file, imageConfig);

      const storage = getStorage();
      const storageRef = await ref(storage, "images/" + file.name);
      var uploadTask = uploadBytesResumable(storageRef, resizedImage, metadata);

      uploadTask.on(
        'state_changed',
        snapshot => {
          setIsUploading(true);
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case 'paused':
              setIsUploading(false);
              console.log("Uploading is Paused");
              break;
            case 'running':
              console.log("Uploading is in progress...");  
              break;
            
          }
          if(progress == 100) {
            setIsUploading(false);
            toast("Uploaded", {type : "success"})
          }
        },
        error => {
          console.log(error);
          toast("something is wrong in state change", {type : "error"})
         
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
          .then(downloadURL => {setDownloadUrl(downloadURL);})
          .catch(err => console.log(err))
        }
      )

    }
    catch(error){
      console.error(error);
      toast("Something went wrong", {type : "error"})
    }
  }
 
  const addProduct = async () => {
    try{
      const db = getDatabase();
      set(sref(db, 'products/' + v4()),{
        name,
        type,
        price,
        consistOf,
        benefits,
        picture : downloadUrl,
        star
      })
    }
    catch(err){
      console.log(err);
    }
  }

  const updateProduct = async () => {
    try {
      const db = getDatabase();
      set(sref(db, 'products/' + productToUpdateKey),{
        name,
        type,
        price,
        consistOf,
        benefits,
        picture : downloadUrl,
        star
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    isUpdate ? updateProduct() : addProduct();

    toast("Success", {type : "success"})

    dispatch({
      type : UPDATE_PRODUCT,
      payload : null,
      key : null
    })

    history("/")
  }

  const options = [
    { label: 'Choose Option', value: '' },
    { label: 'Thalis', value: 'thalis' },
    { label: 'Biryanis', value: 'biryanis' },
    { label: 'Sweets', value: 'sweets' },
    { label: 'Main Course', value: 'main course' },
    { label: 'Starters', value: 'starters' },
    { label: 'Others', value: 'others' },
    { label: 'Desserts', value: 'desserts' },


    
  ];

  const handleChange = (event) => {
    setType(event.target.value);
  };

  if(context.user?.email !== "sidgiri2000@gmail.com"){
    return <Navigate to="/" />
  }

  return (
    <>
    <Header />
    <Container fluid className="mt-5">
      
      <Row>
        <Col md="6" className="offset-md-3 p-2">
          <Form onSubmit={handleSubmit}>
            <div className="text-center">
              {isUploading ? (
                <Spinner type="grow" color="primary" />
              ) : (
                <div>
                  <label htmlFor="imagepicker" className="">
                    <img src={downloadUrl} alt="" className="profile" />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="imagepicker"
                    accept="image/*"
                    multiple={false}
                    onChange={e => imagePicker(e)}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            <FormGroup>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
            <label>
        Select the type of food
        <select value={type} onChange={handleChange}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
            </FormGroup>
            <FormGroup>
              <Input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="textarea"
                name="consistof"
                id="consistof"
                value={consistOf}
                onChange={e => setConsistOf(e.target.value)}
                placeholder="Consist Of ?"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="textarea"
                name="benefits"
                id="benefits"
                value={benefits}
                onChange={e => setBenefits(e.target.value)}
                placeholder="Benefits ?"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  onChange={() => {
                    setStar(!star);
                  }}
                  checked={star}
                />{" "}
                <span className="text-right">Mark as Star</span>
              </Label>
            </FormGroup>
            <Button
              type="submit"
              color="primary"
              block
              className="text-uppercase"
            >
              {isUpdate ? "Update Product" : "Add Product"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default AddProducts