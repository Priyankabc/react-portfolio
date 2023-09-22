import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PostList from './Pages/PostList';
// import HomePage from './Pages/HomePage';
// import PostDetails from './Pages/PostDetails';
// import CreatePost from './Pages/CreatePost';
// import EditUserDetails from './Pages/EditUserDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Footer from './Components/Footer';
import React, { Suspense } from 'react';

const HomePage = React.lazy(() => import('./Pages/HomePage'));
const UserList = React.lazy(() => import('./Pages/UserList'));
const UserDetails = React.lazy(() => import('./Pages/UserDetails'));
const EditUserDetails = React.lazy(() => import('./Pages/EditUserDetails'));
const CreateUser = React.lazy(() => import('./Pages/CreateUser'));


function App() {
  return (
   
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <ToastContainer />
        <Header/>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path='/userlist' element={<UserList/>} />
            <Route path='/userdetail/:userid' element = {<UserDetails/>} />
            <Route path='/edituser/:userid' element = {<EditUserDetails/>} />
            <Route path='/createnewuser' element = {<CreateUser/>} />
          </Routes>
          </Suspense>
        </BrowserRouter>

       
    
      </header>
      <Footer/>
     
    </div>
  );
}

export default App;
