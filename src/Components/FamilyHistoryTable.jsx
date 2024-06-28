import React from 'react';
import './SymptomsTable.css'; // Import CSS file for styling

const FamilyHistoryTable = ({ familyHistory }) => {
  if (familyHistory=="NA")return ;
  return (
    <div className="symptoms-table-container">
      <h2>Family History</h2>
      <table className="symptoms-table">
        <thead>
          <tr>
            <th>Condition</th>
            <th>ICD10 Code</th>
            <th>Relation</th>
          </tr>
        </thead>
        <tbody>
          {familyHistory.map((history, index) => (
            <tr key={index}>
              <td>{history.Condition}</td>
              <td>{history['ICD10 Code']}</td>
              <td>{history.Relation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FamilyHistoryTable;
