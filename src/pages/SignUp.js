import React, { useContext, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'

import firebase from "firebase/compat/app"
import { UserContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import { Navigate} from 'react-router-dom'

import thalipic from "../images/signupthali.png"
import logo from "../images/logo.png"
import {FcGoogle} from "react-icons/fc"
import {Link} from "react-router-dom"

const SignUp = () => {
  const context = useContext(UserContext);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
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

  const handleSubmit = e => {
    e.preventDefault()
    handleSignup()
  }

  if(context.user?.uid) {
    return <Navigate to="/" />
  }
  else{
    return (

      <div className='darkbg p-2'>
      
      <Container className='text-left outfitfont p-5'>
        <Row className='darkbg'>
          <Col lg={6} >
            <img className='img-fluid mt-5' src={thalipic} />

          </Col>
          <Col lg={6} className='mt-4'>
            <Card className='border border-0'>
              <Form className='darkbg' onSubmit={handleSubmit}>
              <div className='p-3'>
          <img width={300} src={logo} />
          </div>
                
                <CardBody className='darkbg'>
                  
                <h1 className='text-white text-left'>Create your account for tasty Indian Food.</h1>

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
                  <button type='submit' block className='rounded-0 border-0 text-dark loginbtn mt-3'>
                    Sign Up
                  </button>
                  </FormGroup>
                 
                  <FormGroup>
                  <p className='text-white text-center'>
                  Already have an account yet ?
                  <Link className='ml-2 primaryTextColor' to='/signin'>Signin</Link></p>
                  </FormGroup>
                </CardBody>
               
              </Form>
            </Card>
          </Col>

        </Row>
      </Container>
      
      
      </div>

    );
  }
}

export default SignUp