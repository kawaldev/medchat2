import React from 'react';
import './SymptomsTable.css'; // Import CSS file for styling

const TopDiseasesTable = ({ topDiseases }) => {
  return (
    <div className="top-diseases-container">
      <h2>Top Diseases</h2>
      {topDiseases.map((disease, index) => (
        <div key={index} className="disease-container">
          <h3>{disease.disease}</h3>
          <table className="symptoms-table">
            <thead>
              <tr>
                <th>Matched Symptom</th>
              </tr>
            </thead>
            <tbody>
              {disease.matched_symptoms_list.map((symptom, idx) => (
                <tr key={idx}>
                  <td>{symptom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default TopDiseasesTable;
