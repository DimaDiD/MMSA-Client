import './App.css';
import { MainPage } from './pages/MainPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={MainPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
