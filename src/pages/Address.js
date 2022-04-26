import { getDatabase, ref, set } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import instance from '../apis/instance';
import { UserContext } from '../context/UserContext'

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
    <div>
       <Container>
           <Row>
               <Col>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                        <Input
                            type="textarea"
                            name="address"
                            id="address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            placeholder={results}
                        />
                        </FormGroup>
                        <Button
                             type="submit"
                             color="primary"
                             block
                             className="text-uppercase"
                         >
                                Submit
                        </Button>
                    </Form>
               </Col>
           </Row>
       </Container>
    </div>
  )
}

export default Address