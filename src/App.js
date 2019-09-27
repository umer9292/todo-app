import React from 'react';
import './App.css';
import Card from './components/Card';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="bg_img">
      <ToastContainer />
      <Card />
    </div>
  );
}

export default App;