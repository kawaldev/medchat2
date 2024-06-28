import React from 'react';
import './SymptomsTable.css'; // Import CSS file for styling

const TopDiseasesTable = ({ topDiseases }) => {
    return (
        <div className="top-diseases-container">
            <h2>Top Matching Diseases</h2>
            <div className="diseases-table">
                {topDiseases.map((disease, index) => (
                    <div key={index} className="disease-column">
                        <h3>{disease.disease}</h3>
                        <ul>
                            {disease.matched_symptoms_list.map((symptom, idx) => (
                                <li key={idx}>{symptom}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopDiseasesTable;
