import './App.css';
import Home from './Component/Home';
import Login from "./Component/Login"
import Register from './Component/Register';
import {BrowserRouter,Route,Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/Register' element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
