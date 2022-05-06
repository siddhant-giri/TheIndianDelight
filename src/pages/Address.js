import { getDatabase, ref, set } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import instance from '../apis/instance';
import { UserContext } from '../context/UserContext'
import Header from '../layout/Header';
import thalipic from "../images/thalipic2.png"
import {FaMapMarkerAlt, FaArrowLeft} from "react-icons/fa"



const Address = () => {

    const context = useContext(UserContext);

    const [address, setAddress] = useState("");

    const history = useNavigate();

    const [results, setResults] = useState([])
    
    

    const handleAddressSubmit = async () =>{

        try{
            const db = getDatabase();
            set(ref(db, 'users/'+ context.user.uid),{
                address,
                uid : context.user.uid

            })
            
            
            
        }

        catch(e){
            console.log(e);
        }

    }

    


    const handleSubmit = e => {
            e.preventDefault();  
            handleAddressSubmit();
            history("/")
          

    }

    // if(handleSubmit){
    //     return(
    //         <Navigate to='/'/>
    //     )
    // }

    const fetchDetails = async () => {
        const {data} = await instance.get('/users.json')
        
        const fetchedResults = [];
      for(let key in data){
        fetchedResults.unshift(
          {
            ...data[key],
            id:key
          }
          
        )
      }

      const finalresult = fetchedResults.filter(result => result.uid === context.user.uid).map(
        result => (                  
            result.address
    )
      )

      
      

      setResults(finalresult)


    }    

    useEffect(() => {
        fetchDetails()
      }, [])
      
    

      if(!context.user?.uid){
        return <Navigate to="/signin" />
      }

  
    

  return (
    <div className='darkbg'>
      {/* <Header /> */}
       <Container className='text-left outfitfont p-5'>
           <Row>
               <Col lg={6}>
                 <h2><Link to="/"><FaArrowLeft className='primaryTextColor'/></Link></h2>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <h1><FaMapMarkerAlt className='primaryTextColor mt-5'/></h1>
                <h1 className='text-white text-left mt-4'>Set up your Delivery Address for your cravings.</h1>

                        <Input
                            type="textarea"
                            name="address"
                            className='mt-4'
                            id="address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            placeholder={results}
                        />
                        </FormGroup>
                        <button
                             type="submit"
                             className='p-2 rounded-0  mt-2 loginbtn'
                             block
                            
                         >
                                Submit
                        </button>
                    </Form>
               </Col>
               <Col lg={6} className="mt-5">
            <img className='img-fluid' src={thalipic} />
                  
               </Col>
           </Row>
       </Container>
    </div>
  )
}

export default Address