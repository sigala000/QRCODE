import { useState } from 'react';
import './App.scss';
import FileUpload from './FileUpload/FileUpload';
import FileList from './FileList/FileList';
import QrCode from './QrCode/QrCode';



function App() {
  const [files, setFiles] = useState([
    // {
    //   name:'myFile.pdf'
    // }
  ])
  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))
  }
  return (
    <div className='App'>
      
       <div className='file'>
          <p className='title'>UPLOAD FILE</p>
          <FileUpload files={files} setFiles={setFiles} removeFile={removeFile}/>
          <FileList files={files} removeFile={removeFile} />
       </div>
          <div className='qrcode'>
             <QrCode/>
          </div>
        
       </div>
  );
}

export default App;
