import React from 'react';
import './App.css';
import { HomePage } from './components/Home';
import { SignInPage } from './components/SignIn';
import { SignUpPage } from './components/SignUp';
import { LayOutPage } from './components/LayOut';
import { ProfilePage } from './components/Profile';
import { MakeCompetitionPage } from './components/MakeCompetition';
import { CompetitionPage } from './components/Competitions';
import { UserCompetitionPage } from './components/UserCompetition';
import { NotFoundedPage } from './components/NotFounded';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthWrapper } from './components/AuthWrapper';
import { CommonWrapper } from './components/CommonWrapper'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <main className="App">
      <Provider store={store}>
        <CommonWrapper>
          <AuthWrapper>
            <Router>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/signin' element={<SignInPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/dashboard' element={<ProtectedRoute><LayOutPage /></ProtectedRoute>} />
                <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path='/newcompetition' element={<ProtectedRoute><MakeCompetitionPage /></ProtectedRoute>} />
                <Route path='/competitions' element={<ProtectedRoute><CompetitionPage /></ProtectedRoute>} />
                <Route path='/usercompetitions' element={<ProtectedRoute><UserCompetitionPage /></ProtectedRoute>} />
                <Route path="*" element={<NotFoundedPage />} />
              </Routes>
            </Router>
          </AuthWrapper>
        </CommonWrapper>
      </Provider>
    </main>
  );
}

export default App;
