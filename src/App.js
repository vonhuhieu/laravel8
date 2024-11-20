import logo from './logo.svg';
import './App.scss';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import { Routes, Route, Outlet } from 'react-router-dom';

function App(props) {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        {props.children}
      </div>
      <div className='footer-container'>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
