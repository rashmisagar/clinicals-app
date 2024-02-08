import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const PatientForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/clinicalservices/api/patients/', {
        "first_name": firstName,
        "last_name": lastName,
        "age": age
      });

      toast("Patient added successfully");
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h1>Add Patient</h1>
      <label>
        First Name:
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Age:
        <input
          type="number"
          onChange={(e) => setAge(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Create Patient</button>
    </form>
    <Link to="/">Back to Home</Link>
    </div>
  );
};

export default PatientForm;