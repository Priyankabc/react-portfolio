import React, { useEffect, useState } from 'react'
import { deleteUserDetails, getPostList } from '../Services/PostApi';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PostList() {
  const [postData, setPostData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostList();
  }, [currentPage]);

    const fetchPostList = async () => {
      const response = await getPostList(currentPage, itemsPerPage);
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
    
    <div>
        <Container>
          <Row>
        <h1 className="main-title">Users List</h1>
        <Link to={'/createpost/'}><Button variant="primary" className="create-user">Create User</Button></Link>
        <Table className="user-lists">
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
    </Table>
       
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







// import React, { useEffect, useState } from 'react';

// export default function FetchApi() {
//   const [ApiData, setApiData] = useState([]);
//   const [Currentpage, setCurrentPage] = useState(1);
//   const itemsperpage = 10;
//   const [totalpage, setTotalPage] = useState(1);
//   const [FormulaData, setFormulaData] = useState(1);

//   useEffect(() => {
//     fetchData();
//   }, [Currentpage]);

//   async function fetchData() {
//     try {
//       const apiresponse = await fetch(`https://dummyjson.com/posts?skip=${(Currentpage - 1) * itemsperpage}&limit=${itemsperpage}`);
//       const storedata = await apiresponse.json();
//       console.log(storedata);
//       setApiData(storedata.posts);
//       setTotalPage(storedata.total);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     setFormulaData(Math.ceil(totalpage / itemsperpage));
//   }, [totalpage, itemsperpage]);

//   function handlePageChange(newPage) {
//     setCurrentPage(newPage);
//   }

//   return (
//     <div>
//       <h1>Fetch Api</h1>
//       <ul>
//         {ApiData.map((posts, index) => (
//           <li key={posts.id}>
//             {posts.id}-{posts.title} - <p>{posts.body}</p>
//           </li>
//         ))}
//       </ul>

//       <div className="pagination">
//         {Array.from({ length: FormulaData }, (_, index) => (      /**** Here Array.from() is used for creating new array and {length:Formuldata} is object literal total number o
//                 f pages assign and (_,index) it is arrow function used for mappaing data***** */
//           <button
//             key={index}
//             onClick={() => handlePageChange(index + 1)}
//             className={Currentpage === index + 1 ? 'active' : ''}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
