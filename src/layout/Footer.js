import React from 'react'
import { Col, Row } from 'reactstrap'


//Footer Component
const Footer = () => {
  return (
    <div className='darkTextColor p-4 mt-4'>
        <Row>
            <Col lg={8}>
                <h2 className='montezfont primaryTextColor'>The Indian Delight</h2>
            </Col>
            <Col lg={4}>
                <h5 className='outfitfont mt-2 greyfontcolor'>Copyright 2022 - All rights reserved</h5>
            </Col>

        </Row>
    </div>
  )
}

export default Footer