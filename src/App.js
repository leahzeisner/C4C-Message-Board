import './App.css';
import MessageBoard from './components/MessageBoard';
import Login from './components/Login';
import Register from './components/Register';
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
