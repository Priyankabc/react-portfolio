import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getIndividualUserDeatils } from '../Services/UserApi';
import { Col, Container, Row } from 'react-bootstrap';

export default function UserDetails() {
  const {userid} = useParams();
  const[postDeatils, setPostDeatils] = useState({});
  const[loading, setLoading] = useState(true);
  useEffect(()=>{
    getPostResponse();
  },[])

  const getPostResponse = async() => {
    try{
      const postResponse = await getIndividualUserDeatils(userid);
      console.log(postResponse);
      setPostDeatils(postResponse)
    }catch(error){
      throw error;
    }finally{
      setLoading(false);
    }
  }
  if(loading){
    return <h3>Loading</h3>
  }
  return (
    <div className="main-page">
       <Container>
        <Row>
       
        <Col md={3}></Col>
        <Col md={6}>
        <h1 className="main-title"> User Deatails</h1>
          <div className="create-user-form user-detail-pg">
           <div className="users-profile"> 
            <div>
            <img src={postDeatils.picture} alt='profile'/>
            </div>
            <div className="user-content">
                <p><span>Name:</span>{postDeatils.title} {postDeatils.firstName}</p>
                <p><span>LastName: </span>{postDeatils.lastName}</p>
                <p><span>Email: </span>{postDeatils.email}</p>
                <p><span>Phone Number: </span>{postDeatils.phone}</p>
                <p><span>Country: </span>{postDeatils.location.country}</p>
                <p><span>State: </span>{postDeatils.location.state}</p>
                <p><span>City: </span>{postDeatils.location.city}</p>
              
            </div>
           

           </div>
           
          </div>
       
        </Col>
        </Row>
        </Container>
       
       
      
      
        
    </div>
  )
}
