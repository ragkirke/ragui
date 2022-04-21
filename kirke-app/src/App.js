import './App.css';
import Routing from './Components/Router/Routing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    // <div className="App">
    <>
    <BrowserRouter>
    <Routing />
    </BrowserRouter>
    </>
    // </div>
  );
}

export default App;
