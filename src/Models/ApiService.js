class ApiService {
    constructor(baseURL) {
      if(baseURL="")baseURL=""  
      this.baseURL = baseURL;
    }
  
    async makePostRequest(endpoint, requestBody) {
      const url = `${this.baseURL}${endpoint}`;
      console.log("Sending request to server: ", requestBody); // Debugging server request
  
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody)
        });
  
        if (!response.ok) throw new Error("Network response was not ok");
  
        const data = await response.json();
        console.log("Response received from server: ", data); // Debugging response data
  
        return data;
      } catch (error) {
        console.error("Error: ", error);
        throw error;
      }
    }
  
    async getPatientSymptom(message) {
      const requestBody = { userMessage: message };
      const endpoint = "get_patient_symptom";
      return await this.makePostRequest(endpoint, requestBody);
    }
    async getMoreInfo(message) {
      const requestBody = { symptomJson: message };
      const endpoint = "get_patient_symptom";
      return await this.makePostRequest(endpoint, requestBody);
    }
  }
  
  export default ApiService;
  // Usage example:
  
  