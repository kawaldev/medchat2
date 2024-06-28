import React from 'react';
import './SymptomsTable.css'; // Import CSS file for styling

const PatientMedicalHistoryTable = ({ patientHistory }) => {
  if(patientHistory=="NA")return;
  return (
    <div className="symptoms-table-container" >
    <h2>Patient History</h2>
    <table className="symptoms-table" >
      <thead>
        <tr>
          <th>Condition</th>
          <th>ICD10 Code</th>
           
        </tr>
      </thead>
      <tbody>
        {patientHistory.map((history, index) => (
          <tr key={index}>
            <td>{history.Condition}</td>
            <td>{history['ICD10 Code']}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default PatientMedicalHistoryTable;
