import React, { useState } from 'react';
import SymptomsTable from './SymptomsTable';
import FamilyHistoryTable from './FamilyHistoryTable';
import PatientMedicalHistoryTable from './PatientMedicalHistoryTable';
import TopDiseasesTable from './TopDiseasesTable'; // Import the TopDiseasesTable component
import { extractSymptoms, getDiagnosis } from './diagnosisUtils'; // Import the extractSymptoms and getDiagnosis functions

const PatientInfo1 = ({ response }) => {
    const [diagnosisResponse, setDiagnosisResponse] = useState(null); // State to store diagnosis response
    const [isLoading, setIsLoading] = useState(false); // State to manage loading state

    if (response == null) return null;
    if (response === "") return null;

    const data = response;

    if (data['Classification'] !== 'Relevant') {
        return (<div>
            Your question appears to be not medically related
        </div>);
    }

    const chiefComplaint = data['Chief Complaint'];

    const handleDiagnosisAnalysis = () => {
        const symptomsData = extractSymptoms(chiefComplaint);
        setIsLoading(true);
        getDiagnosis(symptomsData.symptoms, setDiagnosisResponse, setIsLoading);
    };

    return (
        <div>
            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px', display: 'flex', alignItems: 'flex-start' }}>
                {data['Chief Complaint'] && (
                    <div style={{ marginRight: '20px' }}>
                        <SymptomsTable symptoms={data['Chief Complaint']} />
                    </div>
                )}

                {data['Family History'] && data['Family History'] !== "NA" && (
                    <div style={{ marginRight: '20px' }}>
                        <FamilyHistoryTable familyHistory={data['Family History']} />
                    </div>
                )}

                {data['History'] && data['History'] !== "NA" && (
                    <div>
                        <PatientMedicalHistoryTable patientHistory={data['History']} />
                    </div>
                )}
            </div>

            <button className="formBtn" onClick={handleDiagnosisAnalysis}>Perform Diagnosis Analysis</button>

            {isLoading && <div>Loading...</div>}

            {diagnosisResponse && (
                <TopDiseasesTable topDiseases={diagnosisResponse.top_diseases} />
            )}
        </div>
    );
};

export default PatientInfo1;
