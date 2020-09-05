import React from 'react';
import logo from './assets/logo_2.jpg';
import FileUpload from './components/FileUpload';

import './App.css';



function App() {
  return (
    <div className='container'>
    <div className='row'>
      <div className='col-md-6'>
          <img src={logo} style={{marginLeft: '14%', marginBottom: '5%', blockSize:100}}/>
         <FileUpload  />
      </div>
    <div className='col-md-6'> 
      <h4 className='display-4 text-center mb-4'>
        A R E S
      </h4>
      <hr/>
      <div className="output">
      <h4 className='text-center'>
        Output
      </h4>
      </div>
    </div>
    </div>
  </div>
  );
}

export default App;