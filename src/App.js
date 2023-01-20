import './App.css';
import MessageBoard from './pages/MessageBoard';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="app"> 
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/messageBoard" element={<MessageBoard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
