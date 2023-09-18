import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostList from './Pages/PostList';
import HomePage from './Pages/HomePage';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostDetails from './Pages/PostDetails';
import CreatePost from './Pages/CreatePost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import EditUserDetails from './Pages/EditUserDetails';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
        <BrowserRouter>
        <ToastContainer />
        <Header/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path='/postlist' element={<PostList/>} />
            <Route path='/postdetail/:postid' element = {<PostDetails/>} />
            <Route path='/edituser/:userid' element = {<EditUserDetails/>} />
            <Route path='/createpost' element = {<CreatePost/>} />
          </Routes>
        </BrowserRouter>

       
    
      </header>
      <Footer/>
    </div>
  );
}

export default App;
