import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import { UserContext } from '../context/UserContext'
import firebase from "firebase/compat/app"
import instance from '../apis/instance'
import {FaMapMarkerAlt} from "react-icons/fa"
import { CartContext } from '../context/CartContext'
import logoicon from "../images/logoicon.png"



const Header = () => {

    const context = useContext(UserContext);
    const contextCart = useContext(CartContext);

    const [isOpen, setIsOpen] = useState(false);

    const [results, setResults] = useState([]);

    let count  = 0;

    contextCart.cartItem.forEach(item => {
        count = count + 1
    })


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
        // addressContext.setAddress(result.address)
    )
      )
      

      setResults(finalresult)

     

        


    }

    useEffect(() => {
      
    fetchDetails()
     
    })

    

    //ADMIN NAVBAR

    if(context.user?.email === "sidgiri2000@gmail.com"){
        return (
            <div className='outfitfont'>
                <Navbar className='darkbg p-2' light expand="md">
        <NavbarBrand><Link to="/" className='text-white'>
                <img src={logoicon} />
            </Link></NavbarBrand>
        <NavbarText className='text-white'>{
            context.user?.email ? context.user.email : "" 
        }</NavbarText>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>
            <Nav className="mx-auto" navbar>
                {
                    context.user ? (
                        <>
                        <NavItem>
                    <button onClick={() => {
                        
                        firebase.auth().signOut().then(()=> {
                            context.setUser(null);
                            localStorage.removeItem("authUser")
                            console.log('logged out')
                          }).catch((error) => {
                            console.log(error.message)
                          })
                    }} className='text-white'>
                        Logout
                    </button>
                </NavItem>
                
                {/* <NavItem>
                                  <NavLink tag={Link} to="/products" className='text-white'>
                                      All Products
                                  </NavLink>
                              </NavItem> */}
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
            </div>
        )
    }


   


    //CUSTOMER NAVBAR

  return (
    <Navbar color='info' light expand="md">
        <NavbarBrand><Link to="/" className='text-white'>The Indian Delight</Link></NavbarBrand>
        <NavbarText className='text-white'>{
            context.user?.email ? context.user.email : "" 
        }</NavbarText>
        <NavbarText className='m-2 text-white'>
               <Link to='/address'><FaMapMarkerAlt size={26} /> { results }</Link>
        </NavbarText>
        
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>
            <Nav className="mx-auto" navbar>
                {
                    context.user ? (
                        <>
                        <NavItem>
                    <button onClick={() => {
                        
                        firebase.auth().signOut().then(()=> {
                            context.setUser(null);
                            localStorage.removeItem("authUser")
                            console.log('logged out')
                          }).catch((error) => {
                            console.log(error.message)
                          })
                    }} className='text-white'>
                        Logout
                    </button>
                </NavItem>
                <NavItem><Link to='/checkout'>Cart : {count}</Link></NavItem>
                <NavItem><Link to='/myaccount'>My Account</Link></NavItem>
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