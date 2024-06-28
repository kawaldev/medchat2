import React from 'react';
import './SymptomsTable.css'; // Import CSS file for styling

const TopDiseasesTable = ({ topDiseases }) => {
    return (
      <div className="top-diseases-container">
        <h2>Top Diseases</h2>
        <table className="diseases-table">
          <thead>
            <tr>
              <th>Disease</th>
              <th>Matched Symptoms</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {topDiseases.map((disease, index) => (
                <td key={index} className="disease">
                  <h3>{disease.disease}</h3>
                  <ul>
                    {disease.matched_symptoms_list.map((symptom, idx) => (
                      <li key={idx}>{symptom}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
export default TopDiseasesTable;
