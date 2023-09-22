import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { deleteUserDetails, getUserList } from '../Services/UserApi';

export default function UserList() {
  const [postData, setPostData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserList();
  }, [currentPage]);

    const fetchUserList = async () => {
      const response = await getUserList((currentPage-1), itemsPerPage);
      console.log(response);
      const totalItems = response.total;
      setPostData(response.data);
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    };
  
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage + 1);
    };

    /*********************  delete function ***************************/
    const deleteUser = async(userId) =>{
        console.log(userId);
        alert("Are you sure you want to delete this user details?");
        await deleteUserDetails(userId);
        toast.success("User profile deleted successfully ");
        navigate('/postlist');
    }

    
  return (
    
    <div className="main-page">
        <Container>
          <Row>
        <h1 className="main-title">Users List</h1>
        <Link to={'/createnewuser/'}><Button variant="primary" className="create-user">Create User</Button></Link>
        </Row>
        <Row>
        {
            postData && postData.map((user, index)=>(
            
            <Col md={3} key={index+1}>
                  <div className="userdetails">
                  <Link to={`/userdetail/${user.id}`}>
                    <img src={user.picture} alt="user profile"/>
                      <h4>{user.title} {user.firstName} {user.lastName}</h4>
                    <p>For every expert, there is an equal and opposite expert.</p>
                    </Link>
                    <div className="edit-delete-btns">
                    <Link to={`/edituser/${user.id}`} className="edit-icon"><FontAwesomeIcon icon={faEdit} /></Link>
                    <FontAwesomeIcon icon={faTrashCanArrowUp}  onClick={()=>deleteUser(user.id)} className="delete-icon"/>
                    </div>
                </div>
                
              
            </Col>
          ))
        }
        {/* <Table className="user-lists">
      <thead>
        <tr>
          <th>SL No</th>
          <th>Profile</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {
            postData && postData.map((user, index)=>(
              <tr key={user.id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>  
              <td><img src={user.picture} alt='Profile' className="user-profile" /></td>
              <td>{user.title} {user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
              <Link to={`/edituser/${user.id}`}><Button variant="primary">Edit</Button></Link>
              <Button variant="danger" onClick={()=>deleteUser(user.id)}>Delete</Button>
              <Link to={`/postdetail/${user.id}`}><Button variant="primary">View</Button></Link>
              </td>
             
            </tr>   
            ))
        }
     
      </tbody>
    </Table> */}
       
    </Row>
    <Row>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>

        </Row>
        </Container>
    </div>
  )
}


