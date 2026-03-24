import React from 'react';
import './App.css';
import { HomePage } from './components/Home';
import { SignInPage } from './components/SignIn';
import { SignUpPage } from './components/SignUp';
import { LayOutPage } from './components/LayOut';
import { ProfilePage } from './components/Profile';
import { AuthWrapper } from './components/AuthWrapper';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <Router>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/signin' element={<SignInPage />} />
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/dashboard' element={
                <AuthWrapper>
                  <LayOutPage />
                </AuthWrapper>} />
              <Route path='/profile' element={
                <AuthWrapper>
                  <ProfilePage />
                </AuthWrapper>} />
              <Route path="*" element={<div>Страница не найдена</div>} />
            </Routes>
          </Router>
      </Provider>
    </div>
  );
}

export default App;
