import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PatientTable = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/clinicalservices/api/patients/'); // Replace with your API endpoint
        setPatients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h1>Patients</h1>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Add Clinical Data</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.id}>
            <td>{patient.first_name}</td>
            <td>{patient.last_name}</td>
            <td>{patient.age}</td>
            <td><Link to={`/addClinicals/${patient.id}`}>Add Clinical Data</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
    <Link to="/addpatient">Add Patient</Link>
    </div>
  );
};

export default PatientTable;