import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import EventFeed from './pages/EventFeed/EventFeed';
import EventDetail from './pages/EventDetail/EventDetail';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import Profile from './pages/Profile/Profile';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

const ForgotPassword = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Forgot Password</h2>
      <p>Password reset functionality will be implemented here.</p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap the entire application with AuthProvider */}
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventFeed />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;