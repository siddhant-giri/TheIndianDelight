import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Row } from 'reactstrap';
import instance from '../apis/instance';
import HomeProduct from '../components/HomeProduct';
import SectionProduct from '../components/SectionProduct';
import Footer from '../layout/Footer';
import Header from '../layout/Header';

const Search = () => {

    const [results, setResults] = useState([]);

    const fetchDetails = async () => {
        
        const {data} = await instance.get('/products.json')

  
        console.log(data);
  
        const fetchedResults = [];
        for(let key in data){
          fetchedResults.unshift(
            {
              ...data[key],
              id:key
            }
            
          )
        }
  
        console.log(fetchedResults);
  
        setResults(fetchedResults)
      
  
        
      }
  
      useEffect(() => {
          
        fetchDetails();
        
      }, [])

      
      const { id } = useParams()



  return (
    <div className='darkbg homebody outfitfont text-white'>
      <Header />
          <Row className='p-5 mt-5'>
        
        {

            results.filter(result => result.type === id).map(
              result => (

                <SectionProduct key={result.id} product={result} />

                
              )
            )

        
        }
        
        </Row >
        <Footer />
        </div>
  )
}

export default Search