import React from 'react'
import { Col, Row } from 'reactstrap'


//Footer Component
const Footer = () => {
  return (
    <div className='darkTextColor p-4 mt-4'>
        <Row className='text-center'>
            
            <Col>
               <p className='outfitfont mt-2 greyfontcolor'>Copyright &#169; 2022 - All rights reserved<span className='montezfont primaryTextColor ml-2' style={{fontSize : "20px"}}>The Indian Delight</span></p>
            </Col>

        </Row>
    </div>
  )
}

export default Footer