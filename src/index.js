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
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Login from './components/member/Login';
import { store, persistor } from './redux/store';
import Account from './components/account/Account';
import UpdateAccount from './components/account/update_account/UpdateAccount';
import MemberProductList from './components/account/member_product/MemberProductList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App>
          <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='/blog' element={<BlogList />} />
            <Route path='/blog_detail/:blog_id' element={<BlogDetail />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/account' element={<Account />} />
            <Route path='/account/updateAccount' element={<UpdateAccount />} />
            <Route path='/account/myListProduct' element={<MemberProductList/>}/>
          </Routes>
        </App>
      </Router>
    </PersistGate>
  </Provider>
);

reportWebVitals();
