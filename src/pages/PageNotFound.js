import React from 'react'
import Footer from '../layout/Footer'
import Header from '../layout/Header'
import error404 from "../images/404.png"

const PageNotFound = () => {
  return (
    <div className='darkbg text-center'>
     

      <img src={error404} className="img-fluid mt-5"/>

      <Footer />
    </div>
  )
}

export default PageNotFound