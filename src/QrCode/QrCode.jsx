import React from 'react'
import { useState } from 'react';
import QRCode from 'react-qr-code';
import './QrCode.scss'

const QrCode = () => {
  const [formData, setFormData] = useState({});
  const [date, setDate] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    // Get the form data and update the state variable
    const data = {
      name: event.target.name.value,
      message: event.target.message.value,
      date: event.target.date.value,
      // Add other form fields as needed
    };
    setFormData(data);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  return (
    <div >
       <div className='container1'>
              <p className='text'>GENERATE QRCODE</p>
              <form onSubmit={handleSubmit}>
              {/* Add your form fields here */}
              <input type="text" name="name" placeholder="Name of Document" className='yoo'/><br/>
              <input type="date" name="date" value={date} onChange={handleDateChange} className='yoo'/><br/>
              <textarea name="message" placeholder="Enter content of document" className='yoo' rows="5" cols="5"></textarea><br/>
              <button type="submit" className='button'>Generate</button>
            </form>
            {Object.keys(formData).length > 0 && (
              <QRCode value={JSON.stringify(formData)} />
            )}
       </div>
          
    </div>
  )
}

export default QrCode