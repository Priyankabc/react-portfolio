import React, { useEffect, useState } from 'react'
import { createNewPost, editUserDetails, getIndividualPostDeatils } from '../Services/PostApi';
import { Button, Col, Container, Form, Row, Toast } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom'
import PostDetails from './PostDetails';
import { toast } from 'react-toastify';

export default function EditUserDetails() {
  const navigate = useNavigate();
    const {userid} = useParams();
    const[postDetailes, setPostDetails] = useState({});
    const[loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
      title: '',
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      dateOfBirth: '',
      phone: '',
      picture: '',
      location: {
        street: '',
        city: '',
        state: '',
        country: '',
      }
    });
    useEffect(()=>{
        getPostResponse();
      },[])
    const countryList = [
     { name: "Afghanistan"},
     { name: "Albania"},
     { name: "Algeria"},
     { name: "Argentina"},
     { name: "Australia"},
     { name: "India"},
    ]
 
  
    const getPostResponse = async() => {
      try{
        const postResponse = await getIndividualPostDeatils(userid);
        console.log(postResponse);
        setPostDetails(postResponse);
        setFormData(postResponse);
      }catch(error){
        throw error;
      }finally{
        setLoading(false);
      }
    }
    const onchangePostData = (e) => {
      const { name, value } = e.target;
      if (name.startsWith('location.')) {
        // Handle nested fields within location object
        const locationField = name.split('.')[1];
        setFormData((prevData) => ({
          ...prevData,
          location: {
            ...prevData.location,
            [locationField]: value,
          },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };
  
  
    const submitPostData = async (e) => {
      e.preventDefault();
      console.log('Form submitted', formData);
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length === 0) {
        await editUserDetails(userid,formData)
        toast.success('User Details Updated Successfully!');
        navigate('/postlist');
      } else {
        setErrors(validationErrors);
      }
  
  
    };


    const validateForm = (userData) => {
        let errors = {}
        if (!userData.firstName) {
          errors.firstName = "FirstName is required";
        } else if ((userData.firstName).length <= 4) {
          errors.firstName = "FirstName should be atleast of 4 letter";
        }
        if (!userData.lastName) {
          errors.lastName = "LastName is required";
        }
        if (!userData.title) {
          errors.title = "Title is required";
        }
        if (!userData.picture) {
          errors.picture = "Picture is required";
        }
        if (!userData.email) {
          errors.email = 'Email is required';
        } else if (!isValidEmail(userData.email)) {
          errors.email = 'Invalid email format';
        }
        if (!userData.phone) {
          errors.phone = 'Phone number is required';
        } else if (!/^\d+$/.test(userData.phone)) {
          errors.phone = 'Phone number must contain only digits';
        } else if (userData.phone.length <= 8) {
          errors.phone = 'Phone number must be at least 8 digits long';
        }
    
        return errors;
      }
    
      const isValidEmail = (email) => {
        const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return emailPattern.test(email);
      };

    if(loading){
      return (
        <Container>
        <Row>
        <h1 className="main-title">Loading</h1>
        </Row>
        </Container>
      )
    }
  return (
    <div>
     <Container>
        <Row>
        <h1 className="main-title">Update User Deatails</h1>
        </Row>
        <Row>
          <div>
            <Form onSubmit={submitPostData} className="create-user-form">
              <Row>
                <Col as={Col} md="6">
                  <Form.Group controlId="title">
                    <Form.Label>Title <span className="colorred">*</span></Form.Label>
                    <Form.Select aria-label="Default select example" value={formData.title}
                     name="title"
                     onChange={onchangePostData}>
                      <option value="default">Select Title</option>
                      <option value="ms">ms</option>
                      <option value="mr">mr</option>
                      <option value="mrs">mrs</option>
                      <option value="miss">miss</option>
                    </Form.Select>
                    {errors.title && <p className="error">{errors.title}</p>}
                  </Form.Group>
                </Col>
                <Col as={Col} md="6">
                  <Form.Group controlId="firstName" >
                    <Form.Label>First Name <span className="colorred">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.firstName}
                      name="firstName"
                      onChange={onchangePostData}
                    />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col as={Col} md="6">
                  <Form.Group controlId="lastName">
                    <Form.Label>Last Name <span className="colorred">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.lastName}
                      name="lastName"
                      onChange={onchangePostData}
                    />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                  </Form.Group>
                </Col>
                <Col as={Col} md="6">
                  <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select aria-label="Default select example" value={formData.gender}
                      name="gender"
                      onChange={onchangePostData}>
                        <option value="default">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col as={Col} md="6">
                  <Form.Group controlId="dateOfBirth">
                    <Form.Label>DateofBirth</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.dateOfBirth}
                      name="dateOfBirth"
                      onChange={onchangePostData}
                    />
                  </Form.Group>
                </Col>
                <Col as={Col} md="6">
                  <Form.Group controlId="picture">
                    <Form.Label>Picture <span className="colorred">*</span> </Form.Label>
                    {/* <Form.Control
                      type="file"
                      accept="image/*"
                      name="picture"
                      onChange={onchangePostData}
                    /> */}
                     <Form.Control
                      type="text"
                      name="picture"
                      value={formData.picture}
                      onChange={onchangePostData}
                    />
                    {errors.picture && <p className="error">{errors.picture}</p>}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col as={Col} md="6">
                  <Form.Group controlId="email">
                    <Form.Label>Email <span className="colorred">*</span> </Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      name="email"
                      onChange={onchangePostData}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </Form.Group>
                </Col>
                <Col as={Col} md="6">
                  <Form.Group controlId="phone">
                    <Form.Label>Phone <span className="colorred">*</span> </Form.Label>
                    <Form.Control
                      type="phone"
                      value={formData.phone}
                      name="phone"
                      onChange={onchangePostData}
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col as={Col} md="6">
                  <Form.Group controlId="location.state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="location.state"
                      value={formData.location.state}
                      onChange={onchangePostData}
                    />
                  </Form.Group>
                </Col>
                <Col as={Col} md="6">
                  <Form.Group controlId="location.country">
                    <Form.Label>Country</Form.Label>
                    <Form.Select aria-label="Default select example" name="location.country"  value={formData.location.country}
                      onChange={onchangePostData}>
                        <option value='default'>Select Country</option>
                      {countryList.map((country, index)=>(
                        <option value={country.name} key={index+1}>{country.name}</option>
                      ))
                        
                      }
                      
                     
                    </Form.Select>
                  </Form.Group>
                </Col>

              </Row>
              <Row>
                <Col as={Col} md="6">
                  <Form.Group controlId="location.street">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      type="text"
                      name="location.street"
                      value={formData.location.street}
                      onChange={onchangePostData}
                    />
                  </Form.Group>
                </Col>
                <Col as={Col} md="6">
                  <Form.Group controlId="location.city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="location.city"
                      value={formData.location.city}
                      onChange={onchangePostData}
                    />
                  </Form.Group>
                </Col>
              </Row>


              <Button type="submit" className="submit-form-btn">Submit Form</Button>
              <Link to={"/postlist/"}><Button className="submit-form-btn">Back</Button></Link>
            </Form>

          </div>
        </Row>
      </Container>

    </div>
  )
}
