import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddClinicals = () => {
  const [patient, setPatient] = useState(null);
  const {patientId} = useParams();
  const [componentName, setComponentName] = useState('');
  const [componentValue, setComponentValue] = useState('');

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/clinicalservices/api/patients/${patientId}/`); // Replace with your API endpoint
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/clinicalservices/api/clinicaldata/', {
        "patient": patientId, // Replace with your API endpoint
        "component_name": componentName,
        "component_value": componentValue
      });

      toast("Data added successfully");
      console.log(response.data); // Handle the response as needed
    }
    catch (error) {
      console.error('Error adding clinical data:', error);
    }
  };

  return (
    <div>
      {patient ? (
        <div>
          <h2>Patient Details</h2>
          <p>First Name: {patient.first_name}</p>
          <p>Last Name: {patient.last_name}</p>
          <p>Age: {patient.age}</p>
          <h2>Add Clinical Data</h2>

          <form onSubmit={handleSubmit}>
            <label>
              Component Name:
              <input
                type="text"
                onChange={(e) => setComponentName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Component Value:
              <input
                type="text"
                onChange={(e) => setComponentValue(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Save Data</button>
          </form>
          <Link to="/">Back to Home</Link>
        </div>
      ) : (
        <p>Loading patient details...</p>
      )}
    </div>
  );
};

export default AddClinicals;