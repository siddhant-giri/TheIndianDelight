import React, { useContext, useEffect, useState } from 'react'

import {  Col, Container, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'

//Image related imports
import {readAndCompressImage} from "browser-image-resizer"
import {imageConfig} from "../utils/config"

import Header from '../layout/Header'

import { v4 } from 'uuid'

//context related imports
import { UserContext } from '../context/UserContext'
import { ProductContext } from '../context/ProductContext'
import { UPDATE_PRODUCT } from '../context/action.types'

import { Navigate, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

//firebase related imports
import { getDownloadURL, getStorage,  uploadBytesResumable } from 'firebase/storage'
import { getDatabase, ref as sref, set } from 'firebase/database'
import { ref } from 'firebase/storage'
import { motion } from 'framer-motion'






const AddProducts = () => {

  const {state, dispatch} = useContext(ProductContext);

  const {productToUpdate, productToUpdateKey} = state;
  const context = useContext(UserContext);

  const history = useNavigate();

  //Initializing all the attributes required for uploading a product
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [consistOf, setConsistOf] = useState("");
  const [benefits, setBenefits] = useState("");
  const [rating, setRating] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [star, setStar] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);


  //checking if product needs to be updated or a new product is getting added
  useEffect(() => {
    if(productToUpdate){
    setName(productToUpdate.name);
    setType(productToUpdate.type);
    setPrice(productToUpdate.price);
    setConsistOf(productToUpdate.consistOf);
    setBenefits(productToUpdate.benefits);
    setRating(productToUpdate.rating);
    setStar(productToUpdate.star);
    setDownloadUrl(productToUpdate.picture);

    setIsUpdate(true);
    }

  }, [productToUpdate])


  //Uploading Image to firebase storage db
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
 
  //Adding a product 
  const addProduct = async () => {
    try{
      const db = getDatabase();
      set(sref(db, 'products/' + v4()),{
        name,
        type,
        price,
        consistOf,
        benefits,
        rating,
        picture : downloadUrl,
        star
      })
    }
    catch(err){
      console.log(err);
    }
  }

  //Updating a product
  const updateProduct = async () => {
    try {
      const db = getDatabase();
      set(sref(db, 'products/' + productToUpdateKey),{
        name,
        type,
        price,
        consistOf,
        benefits,
        rating,
        picture : downloadUrl,
        star
      })
    } catch (error) {
      console.log(error);
    }
  }

  //Submitting or adding product in db
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

  //category array
  const options = [
    { label: 'Choose Category ', value: '' },
    { label: 'Thalis', value: 'thalis' },
    { label: 'Biryanis', value: 'biryanis' },
    { label: 'Sweets', value: 'sweets' },
    { label: 'Main Course', value: 'maincourse' },
    { label: 'Starters', value: 'starters' },
    { label: 'Desserts', value: 'desserts' },
    { label: 'Salads', value: 'salads' },
    { label: 'Drinks', value: 'drinks' },
    { label: 'Others', value: 'others' },  
  ];

  //dummy ratings array
  const ratings = [
    { label: 'Choose Rating ', value: '' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' }    
  ];

  
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const containervariants = {
    hidden : {
      x:'0vw',
      opacity : 0
    },
    visible : {
      opacity : 1,
      x : 0,
      transition : {
        ease  : "easeInOut",
        
        duration : 0.8
      }
    },
  }



  //Admin Authentication
  if(context.user?.email !== "sidgiri2000@gmail.com"){
    return <Navigate to="/" />
  }

  return (
    <div className='darkbg text-white outfitfont'>
    <Header />
    <Container fluid >
      
      <Row>
        <Col md="6" className="offset-md-3 p-5">
          <motion.div
          variants = {containervariants}
          initial="hidden"
          animate="visible"
          >
          <Form onSubmit={handleSubmit}>
            <div className="text-center">
              {isUploading ? (
                <Spinner type="grow" color="primary" />
              ) : (
                <div>
                  <label htmlFor="imagepicker" className="text-center">
                    <img src={downloadUrl} alt="" height={220} width={220} className="profile" />
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
            
       
       <Row>
                <Col>
                <select value={type} onChange={handleChange} className="darkbg inputfield">
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
                </Col>
                <Col>
                <select value={rating} onChange={handleRatingChange} className="darkbg inputfield">
          {ratings.map((rate) => (
            <option value={rate.value}>{rate.label}</option>
          ))}
        </select>
                </Col>


       </Row>

        
     
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
            <button
              type="submit"
              
              block
              className="text-uppercase loginbtn rounded"
            >
              {isUpdate ? "Update Product" : "Add Product"}
            </button>
          </Form>
          </motion.div>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default AddProducts