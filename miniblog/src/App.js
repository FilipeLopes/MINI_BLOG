//Import css
import './App.css';

//Import react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//Import from firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//Import components
import Navbar from './components/Navbar';

//Import context
import { AuthProvider } from './context/AuthContext';

//import hooks from react
import { useState, useEffect } from 'react';

//Import my hooks
import { useRegister } from './hooks/useRegister';

//Import pages
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';


function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useRegister();
  const loadingUser = user === undefined;


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      
    })
  }, [auth]);

  if (loadingUser) {
    return <p>Loading...</p>;
  }

  
  return (
    <div className="App">
      {/* Website routing */}
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
