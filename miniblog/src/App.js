//Import css
import './App.css';

//Import react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//Import from firebase
import { onAuthStateChanged } from 'firebase/auth';

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
import Login from './pages/Login/Login';
import CreatePost from './pages/CreatePost/CreatePost';
import Post from './pages/Post/Post';
import Search from './pages/Search/Search';
import Dashboard from './pages/Dashboard/Dashboard';


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
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/post/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
