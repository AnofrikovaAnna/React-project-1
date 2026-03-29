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
import { store } from './store';

function App() {
  return (
    <main className="App">
      <Provider store={store}>
        <AuthWrapper>
          <Router>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/signin' element={<SignInPage />} />
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/dashboard' element={<LayOutPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path="*" element={<div>Страница не найдена</div>} />
            </Routes>
          </Router>
        </AuthWrapper>
      </Provider>
    </main>
  );
}

export default App;
