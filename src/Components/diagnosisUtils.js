// diagnosisUtils.js

// Function to extract symptoms from chief complaint data
export function extractSymptoms(data) {
    const symptoms = data.map(entry => entry.Symptom);
    return { "symptoms": symptoms };
}

// Function to perform diagnosis analysis
export function getDiagnosis(symptoms, setDiagnosisResponse, setIsLoading) {
    const baseURL = "http://127.0.0.1:5000/"; // Set your base URL here
    const endpoint = "matching_diseases";
    const url = baseURL + endpoint;

    const requestBody = {
      symptoms: symptoms
    };

    setIsLoading(true); 

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      // Handle response data
      setDiagnosisResponse(data); // Set response state
    })
    .catch(error => {
      console.error("Error:", error);
    })
    .finally(() => {
      setIsLoading(false); // Set loading state to false after receiving response
    });
}
