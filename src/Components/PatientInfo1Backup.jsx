import React from 'react';
import SymptomsTable from './SymptomsTable';
import FamilyHistoryTable from './FamilyHistoryTable';
import PatientMedicalHistoryTable from './PatientMedicalHistoryTable';


function extractJson(response) {
    // Extract the JSON-like string from the response
    const formattedText = response.formattedText;

    // Clean up the string to make it valid JSON
    const jsonStr = formattedText
        .replace(/'/g, '"')
        .replace(/\n/g, '')
        .replace(/,}/g, '}');

    // Parse the JSON string into a JavaScript object
    try {
        const jsonObject = JSON.parse(jsonStr);
        return jsonObject;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
}
const PatientInfo1Backup = ({ response }) => {
    // const { formattedText } = response;

    if (response == null) return;
    console.log("response in patient info")
    //console.log(extractJson(response)); 
    const data = extractJson(response);
    console.log(data);
    if(data['Relevance']!='Relevant'){
        return(<div>
            Your question appear to be not medically related 
        </div>);
    }
    //console.log(data); 
    //const data = JSON.parse(response);
    /*
    
        
    */
    return (
        <div>
            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px', display: 'flex', alignItems: 'flex-start' }}>
                {data['Chief Complaint'] && data['Chief Complaint'].Symptoms && (
                    <div style={{ marginRight: '20px' }}>
                        <SymptomsTable symptoms={data['Chief Complaint'].Symptoms} />
                    </div>
                )}

                {data['Family History'] && (
                    <div style={{ marginRight: '20px' }}>
                        <FamilyHistoryTable familyHistory={data['Family History']} />
                    </div>
                )}

                {data['History'] && (
                    <div>
                        <PatientMedicalHistoryTable patientHistory={data['History']} />
                    </div>
                )}
            </div>


        </div>
    );

};

export default PatientInfo1Backup;