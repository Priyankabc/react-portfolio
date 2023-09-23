import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Toast } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { editUserDetails, getIndividualUserDeatils, imageUpload } from "../Services/UserApi";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function EditUserDetails() {
  const navigate = useNavigate();
  const maxDate = new Date();
  const setMaxDate = maxDate.toISOString().split("T")[0]
  const { userid } = useParams();
  const [postDetailes, setPostDetails] = useState({});
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    getPostResponse();
  }, []);
  const countryList = [
    { name: "Afghanistan" },
    { name: "Albania" },
    { name: "Algeria" },
    { name: "Argentina" },
    { name: "Australia" },
    { name: "India" },
  ];

  const getPostResponse = async () => {
    try {
      const postResponse = await getIndividualUserDeatils(userid);
      console.log(postResponse);
      setPostDetails(postResponse);
      setFormData(postResponse);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
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

  const onchangeImage = async (e) => {
    try {
      const { name, files } = e.target;
      const imagePath = e.target.files[0];
      const formData = new FormData();
      formData.append("file", imagePath);
      formData.append("upload_preset", "sak4m8sm");
      const imageSecureUrl = await imageUpload(formData)
      console.log(imageSecureUrl.secure_url);
      setFormData((prevData) => ({
        ...prevData,
        [name]: imageSecureUrl.secure_url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const submitPostData = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      await editUserDetails(userid, formData);
      toast.success("User Details Updated Successfully!");
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

  const dateTimeString = formData.dateOfBirth;
  const EditDate = dateTimeString.substring(0, 10);

  if (loading) {
    return (
      <Container>
        <Row>
          <h1 className="main-title">Loading</h1>
        </Row>
      </Container>
    );
  }
  return (
    <div>
      <Container className="main-page">
        <Row>
          <h1 className="main-title">Update User Deatails</h1>
        </Row>
        <Row>
          <div>
            <Form onSubmit={submitPostData} className="create-user-form">
              <Row>
                <Col as={Col} md="6">
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={formData.title}
                      name="title"
                      onChange={onchangePostData}
                    >
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
                      value={EditDate}
                      name="dateOfBirth"
                      onChange={onchangePostData}
                      max={setMaxDate}
                    />
                  </Form.Group>
                </Col>
                <Col as={Col} md="6">
                  <Form.Group controlId="picture">
                    <Form.Label>
                      Picture <span className="colorred">*</span>
                    </Form.Label>
                    <div className="image-upload">
                      <Form.Control
                        type="file"
                        onChange={onchangeImage}
                        accept="image/*"
                        name="picture"
                        className="selectimg"
                      />
                    </div>
                    <img
                      src={formData.picture}
                      alt="userprofile"
                      className="updateuserprofile"
                    />
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
              <Link to={"/postlist/"}>
                <Button className="submit-form-btn">Back</Button>
              </Link>
            </Form>
          </div>
        </Row>
      </Container>
    </div>
  );
}
