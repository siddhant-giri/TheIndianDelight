import React, { useContext, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'

import firebase from "firebase/compat/app"
import { UserContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'

import thalipic from "../images/thalipic2.png"
import logo from "../images/logo.png"
import {FaGoogle} from "react-icons/fa"
import {Link} from "react-router-dom"
import {motion} from "framer-motion"
import { containerrightvariants, containerleftvariants } from '../components/Animation'


const SignIn = () => {
  const context = useContext(UserContext);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  //Input based Authentication

  const handleSignin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        context.setUser({email : res.user.email, uid : res.user.uid})
        localStorage.setItem("authUser",JSON.stringify(res.user))
      })
      .catch(error => {
        console.log(error);
        toast(error.message, {type : 'error'})
      })
  }

  const handleEmailSubmit = e => {
    e.preventDefault()
    handleSignin()
  }



  //Google Authentication

  
  const googleProvider = new firebase.auth.GoogleAuthProvider()

  const handleGoogleLogin = () => {
    firebase.auth().signInWithPopup(googleProvider).then((res) => {
      console.log(res.user)
      firebase.auth().onAuthStateChanged(() =>{
      
        context.setUser({
          email : res.user.email,
          uid : res.user.uid
        })
        localStorage.setItem("authUser",JSON.stringify(res.user))

      })
    }).catch((error) => {
      console.log(error.message)
    })
  }

  const handleGoogleLoginSubmit = e => {
    e.preventDefault()
    handleGoogleLogin()
  }



 



  if(context.user?.uid) {
    return <Navigate to="/" />
  }
  else{
    return (


      <div className='darkbg'>
      
      <Container className='text-left outfitfont p-4'>
        <Row className='darkbg'>
          <Col lg={6} >
            <motion.div 
            variants = {containerleftvariants}
            initial="hidden"
            animate="visible"
            >
            <Card className='border border-0'>
              <Form className='darkbg'>
              <div className='p-3'>
          <img width={300} src={logo} className='align-left img-fluid'/>
          </div>
                
                <CardBody className='darkbg'>
                  
                <h1 className='text-white text-left'>Let's enjoy mouth watering Indian Dishes.</h1>

                  <FormGroup row className='mt-5'>
                    
                    <Col sm={12}>
                      <label className='text-white'>Email</label>
                      <input
                        className='darkbg inputfield'
                        type='email'
                        name='email'
                        id='email'
                        placeholder=''
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    
                    <Col sm={12}>
                    <label className='text-white'>Password</label>
                      <input
                        type='password'
                        name='password'
                        id='password'
                        className='darkbg inputfield'
                        placeholder=''
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </Col>

                  </FormGroup>
                  <FormGroup>
                  <button onClick={handleEmailSubmit} type='submit' block className='p-2 rounded-0 secondaryTextColor loginbtn mt-3'>
                    Sign In
                  </button>
                  </FormGroup>
                  <FormGroup>
                  <p className='text-white text-center'> or </p>
                  <button onClick={handleGoogleLoginSubmit}  type='submit' block className='p-2 rounded-0  secondaryTextColor loginbtn'>
                    <FaGoogle className='mr-2' /> Sign In with Google
                  </button>
                  </FormGroup>
                  <FormGroup>
                  <p className='text-white text-center'>
                  Don't have an account yet ?
                  <Link className='ml-2 linkhover' to='/signup'>Signup</Link></p>
                  </FormGroup>
                </CardBody>
               
              </Form>
            </Card>
            </motion.div>
          </Col>
          <Col lg={6} className='mt-4'>
            <motion.div
            variants = {containerrightvariants}
            initial="hidden"
            animate="visible"
            >
            <img className='img-fluid' src={thalipic} />
            </motion.div>
          </Col>

        </Row>
      </Container>
      
      
      </div>
    
    );
  }
}

export default SignIn