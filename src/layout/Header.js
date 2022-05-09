import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink, Row } from 'reactstrap'
import { UserContext } from '../context/UserContext'
import firebase from "firebase/compat/app"
import instance from '../apis/instance'
import {FaMapMarkerAlt} from "react-icons/fa"
import { CartContext } from '../context/CartContext'
import logoicon from "../images/logoicon.png"

import {FaPowerOff, FaCartArrowDown, FaUser} from "react-icons/fa"
import { motion } from 'framer-motion'


//Navbar Component

const Header = () => {

    const context = useContext(UserContext);
    const contextCart = useContext(CartContext);

    const [isOpen, setIsOpen] = useState(false);

    const [results, setResults] = useState([]);

    let count  = 0;


    contextCart.cartItem.forEach(f => {
        count = count +1
        console.log(f);
    })
    

    // while(contextCart.cartItem){
    //     count = count + 1

    // }

    const toggle = () => setIsOpen(!isOpen);

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
      
    fetchDetails();
    
     
    },[])


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
            
            duration : 1
          }
        },
      }

      
    

    // NAVBAR FOR ADMIN USE

    if(context.user?.email === "sidgiri2000@gmail.com"){
        return (
            <motion.div
            variants = {containervariants}
      initial="hidden"
      animate="visible"
            className='outfitfont darkbg container'>
                <Navbar className='darkbg ' light expand="md">
        <NavbarBrand><Link to="/" className='text-white'>
                <img src={logoicon} height={50} width={50} />
            </Link></NavbarBrand>
        <NavbarText className='outfitfont text-white '><h1>Admin's Area</h1></NavbarText>
        <NavbarToggler onClick={toggle} style={{backgroundColor : "#DCCA87"}}/>
        <Collapse isOpen={isOpen} navbar>
            <Nav className="container justify-content-end" navbar>
                {
                    context.user ? (
                        <>
                       
                        <NavItem className=''>
                        <NavbarText className='text-white ' ><span className='font-weight-light'>
                        <FaUser className='mr-2 primaryTextColor' style={{fontSize : "20px"}} />
                            Hi, </span>{
            
            context.user?.email ? context.user.email : "" 
        }</NavbarText>
                    <button onClick={() => {
                        
                        firebase.auth().signOut().then(()=> {
                            context.setUser(null);
                            localStorage.removeItem("authUser")
                            console.log('logged out')
                          }).catch((error) => {
                            console.log(error.message)
                          })
                    }} className='logoutbtn ml-5 '>
                        <FaPowerOff className='mr-2' />Logout
                    </button>
                </NavItem>
                
               
                </>
                
                    ) : (
                        <>
                       
                            <NavItem>
                                  <NavLink tag={Link} to="/signup" className='text-white'>
                                      SignUp
                                  </NavLink>
                              </NavItem>
                              <NavItem>
                                      <NavLink tag={Link} to="/signin" className='text-white'>
                                          SignIn
                                      </NavLink>
                                  </NavItem>
                        </>
                    )
                }
                
                
            </Nav>
        </Collapse>
    </Navbar>
            </motion.div>
        )
    }


   


  // NAVBAR FOR CUSTOMER USE

  return (
    
    <Navbar className='darkbg px-4' light expand="md" fixed='top'>
        <NavbarBrand><Link to="/" className='text-white'>
        <img src={logoicon} height={50} width={50} />
            </Link></NavbarBrand>
        
        <NavbarText className='m-2 text-white'>
                
               <Link to='/address' className='addresslink'>
                   <Row>
                        <Col>
                        
                        <p className='lightfont primaryTextColor'>Delivery Address<FaMapMarkerAlt className='ml-2' size={16} />  </p>
                        
                        </Col>


                   </Row>
                   <Row className='navlink'>
                       <Col><span >{ String(results).substring(0,30) }</span></Col>
                   </Row>
                   
                   
               </Link>
        </NavbarText>
        
        <NavbarToggler onClick={toggle}  style={{backgroundColor : "#DCCA87"}}/>
        <Collapse isOpen={isOpen} navbar >
        
            <Nav className="container justify-content-end" navbar>
                {
                    context.user ? (
                        <>
                        
                <NavItem className='ml-5 '><Link to='/checkout' className='addresslink navlink'>
                <Row><Col className='ml-2 '>{count}</Col></Row>
                <Row><Col className=''><FaCartArrowDown className='mr-2 primaryTextColor' style={{fontSize : "20px"}} /> My Cart</Col></Row>

                </Link></NavItem>
                
                <NavItem className='text-white ml-5 mt-4 greyfontcolor'><Link to='/myaccount' className='navlink'><span className='font-weight-light'>
                    
                    <FaUser className='mr-2 primaryTextColor' style={{fontSize : "20px"}} />Hi, </span>{
            context.user?.email ? context.user.email : "" 
        }</Link></NavItem>
                <button onClick={() => {
                        
                        firebase.auth().signOut().then(()=> {
                            context.setUser(null);
                            localStorage.removeItem("authUser")
                            console.log('logged out')
                          }).catch((error) => {
                            console.log(error.message)
                          })
                    }} className='logoutbtn ml-5 mt-4'>
                        <FaPowerOff className='mr-2' /> Logout
                    </button>
                </>
                    ) : (
                        <>
                        
                            <NavItem>
                                  <NavLink tag={Link} to="/signup" className='text-white'>
                                      SignUp
                                  </NavLink>
                              </NavItem>
                              <NavItem>
                                      <NavLink tag={Link} to="/signin" className='text-white'>
                                          SignIn
                                      </NavLink>
                                  </NavItem>
                        </>
                    )
                }
                
                
            </Nav>
        </Collapse>
    </Navbar>
    
  )
}

export default Header