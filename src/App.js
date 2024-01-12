
import './App.css';
import AddArticle from './components/AddArticle';
import Login from './components/Login';
import Register from './components/Register';
import Articles from './components/articles';
import Article from './components/Article';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    
    <div className="container">
      <Router>
        <Routes>
          <Route path='/register' element= {
            <Register/>
          }/>
          <Route path='/signin' element = {
            <Login/>
          }/>
          <Route path='/article/:id' element = {
            <Article/>
          }/>
          <Route path='/' element={
            <div className='row'>
            <div className='col-md-8'>
              <Articles/>
            </div>
            <div className='col-md-4'>
              <AddArticle/>
            </div>
          </div>
          }/>
        </Routes>
      <Navbar/>
      
      </Router>
    </div>
  );
}

export default App;
