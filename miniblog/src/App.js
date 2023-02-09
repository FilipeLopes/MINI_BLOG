//Import css
import './App.css';

//Import react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


//Import context
import Navbar from './context/Navbar';

//Import pages
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';

function App() {

  return (
    <div className="App">
      {/* Website routing */}
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
