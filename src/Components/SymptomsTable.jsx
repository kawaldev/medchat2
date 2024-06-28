import React from 'react';
import './SymptomsTable.css'; // Import CSS file for styling
const SymptomsTable = ({ symptoms }) => {
  return (
    <div  className="symptoms-table-container"> 
      <h2>Symptoms</h2>
      <table  className="symptoms-table" >
        <thead>
          <tr>
            <th>Symptom</th>
            <th>ICD10 Code</th>
            <th>Intensity</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {symptoms.map((symptom, index) => (
            <tr key={index}>
              <td>{symptom.Symptom}</td>
              <td>{symptom['ICD10 Code']}</td>
              <td>{symptom.Intensity}</td>
              <td>{symptom.Duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SymptomsTable;
