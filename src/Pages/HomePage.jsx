import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {getUserList } from '../Services/UserApi';

export default function HomePage() {

  const [userData, setUserData] = useState([]);

  useEffect(()=> {
    getUserDetails();
  },[])

  const getUserDetails = async() =>{
    const userList = await getUserList(1, 8);
    setUserData(userList.data);
    console.log(userList.data);
  }
  return (
    <div className="main-page">
      <div className="banner-hero-img">
      <Container>
        <Row>
          <Col md={6}>
            <div className="banner_content">
              <h1>Online learning Platform</h1>
              <p>Build skills with courses, certificates, and degrees online from world-class universities and companies</p>
              <Link to={'/createpost/'}><Button className="btn banner-btn">Create Profile</Button></Link>
          </div>
          </Col>
        </Row>
       </Container>
      </div>
      <section className="divide-section">
      <Container>
            <Row>
                <div>
                <div className="section-tittle text-center">
                        <h2>Community experts</h2>
                </div>
                <div className="user-lists">
                    <Row>
                      {
                        userData && userData.map((users, index)=>(
                          <Col md={3}  key={index+1}>
                          <div className="userdetails">
                          <img src={users.picture} alt="user profile"/>
                          <h4>{users.firstName} {users.lastName}</h4>
                          <p>For every expert, there is an equal and opposite expert.</p>

                        </div>
                      </Col>
                        ))
                      }
                      
                  
                    </Row>
                </div>
                </div>
              </Row>
            </Container>
      </section>

    </div>
  

  )
}
