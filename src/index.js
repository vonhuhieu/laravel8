import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './components/blog/blog_list/BlogList';
import Home from './components/home/Home';
import BlogDetail from './components/blog/blog_detail/BlogDetail';
import Register from './components/member/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Router>
    <App>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/blog' element={<BlogList />} />
        <Route path='/blog_detail/:blog_id' element={<BlogDetail />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </App>
  </Router>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
