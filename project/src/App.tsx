import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { StudentPortal } from './components/StudentPortal';
import { ParentPortal } from './components/ParentPortal';
import { CoordinatorPortal } from './components/CoordinatorPortal';
import { authService } from './services/authService';
import { User } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentUser.role === 'student') {
    return <StudentPortal onLogout={handleLogout} />;
  }

  if (currentUser.role === 'parent') {
    return <ParentPortal onLogout={handleLogout} />;
  }

  if (currentUser.role === 'coordinator') {
    return <CoordinatorPortal onLogout={handleLogout} />;
  }

  return <div>Invalid role</div>;
}

export default App;
