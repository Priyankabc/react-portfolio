import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../Services/UserApi";

export default function CreateUser() {
  const navigate = useNavigate();
  const maxDate = new Date();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    picture: "",
    location: {
      street: "",
      city: "",
      state: "",
      country: "",
    },
  });

  const countryList = [
    { name: "Afghanistan" },
    { name: "Albania" },
    { name: "Algeria" },
    { name: "Argentina" },
    { name: "Australia" },
    { name: "India" },
  ];

  const onchangePostData = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      const locationField = name.split(".")[1];
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

    // Onchange validation
    const validationErrors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  const onchangeImage = (e) => {
    const { name, files } = e.target;
    console.log(e);
    console.log(e.target.files[0]);
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0].name,
    }));
  };

  const submitPostData = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form data:", formData);
      const createdPost = await createNewUser(formData);
      console.log("Form submitted then call the APi", createdPost);
      toast.success("User profile created successfully ");
      navigate("/userlist");
    } else {
      setErrors(validationErrors);
    }
  };

  const validateField = (name, value) => {
    let errors = {};

    switch (name) {
      case "firstName":
        if (!value) {
          errors.firstName = "First Name is required";
        } else if (value.length <= 4) {
          errors.firstName = "First Name should be at least 4 characters";
        }
        break;
      case "lastName":
        if (!value) {
          errors.lastName = "Last Name is required";
        }
        break;
      case "email":
        if (!value) {
          errors.email = "Email is required";
        } else if (!isValidEmail(value)) {
          errors.email = "Invalid email format";
        }
        break;
      case "phone":
        if (!value) {
          errors.phone = "Phone number is required";
        } else if (!/^\d+$/.test(value)) {
          errors.phone = "Phone number must contain only digits";
        } else if (value.length <= 8) {
          errors.phone = "Phone number must be at least 8 digits long";
        }
        break;
      case "picture":
        if (!value) {
          errors.picture = "Picture is required";
        }
        break;
      default:
        break;
    }

    return errors;
  };

  const validateForm = (userData) => {
    let formErrors = {};

    // Validate each field in the form
    for (let fieldName in userData) {
      if (fieldName === "location") {
        for (let locationField in userData.location) {
          const fieldErrors = validateField(
            `location.${locationField}`,
            userData.location[locationField]
          );
          formErrors = { ...formErrors, ...fieldErrors };
        }
      } else {
        const fieldErrors = validateField(fieldName, userData[fieldName]);
        formErrors = { ...formErrors, ...fieldErrors };
      }
    }

    return formErrors;
  };

  const isValidEmail = (email) => {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(email);
  };

  return (
    <div>
      <Container className="main-page">
        <Row>
          <h1 className="main-title">Create New User</h1>
        </Row>
        <Row>
          <div>
            <Form onSubmit={submitPostData} className="create-user-form">
              <Row>
                <Col as={Col} md="6">
                  <Form.Group controlId="title">
                    <Form.Label>
                      Title 
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={formData.title}
                      name="title"
                      onChange={onchangePostData}
                    >
                      <option value="default">Select Title</option>
                      <option value="miss">miss</option>
                      <option value="ms">ms</option>
                      <option value="mr">mr</option>
                      <option value="mrs">mrs</option>
                    </Form.Select>
                    {errors.title && <p className="error">{errors.title}</p>}
                  </Form.Group>
                </Col>
                <Col as={Col} md="6">
                  <Form.Group controlId="firstName">
                    <Form.Label>
                      First Name <span className="colorred">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.firstName}
                      name="firstName"
                      onChange={onchangePostData}
                    />
                    {errors.firstName && (
                      <p className="error">{errors.firstName}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col as={Col} md="6">
                  <Form.Group controlId="lastName">
                    <Form.Label>
                      Last Name <span className="colorred">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.lastName}
                      name="lastName"
                      onChange={onchangePostData}
                    />
                    {errors.lastName && (
                      <p className="error">{errors.lastName}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col as={Col} md="6">
                  <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={formData.gender}
                      name="gender"
                      onChange={onchangePostData}
                    >
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
                      max={maxDate.toISOString().split("T")[0]}
                    />
                  </Form.Group>
                </Col>
                <Col as={Col} md="6">
                  <Form.Group controlId="picture">
                    <Form.Label>
                      Picture <span className="colorred">*</span>{" "}
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      name="picture"
                      onChange={onchangeImage}
                    />
                    {/* <Form.Control
                      type="text"
                      name="picture"
                      value={formData.picture}
                      onChange={onchangePostData}
                    /> */}
                    {errors.picture && (
                      <p className="error">{errors.picture}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col as={Col} md="6">
                  <Form.Group controlId="email">
                    <Form.Label>
                      Email <span className="colorred">*</span>{" "}
                    </Form.Label>
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
                    <Form.Label>
                      Phone <span className="colorred">*</span>{" "}
                    </Form.Label>
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
                    <Form.Select
                      aria-label="Default select example"
                      name="location.country"
                      value={formData.location.country}
                      onChange={onchangePostData}
                    >
                      <option value="default">Select Country</option>
                      {countryList.map((country, index) => (
                        <option value={country.name} key={index + 1}>
                          {country.name}
                        </option>
                      ))}
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

              <Button type="submit" className="submit-form-btn">
                Submit Form
              </Button>
            </Form>
          </div>
        </Row>
      </Container>
    </div>
  );
}
