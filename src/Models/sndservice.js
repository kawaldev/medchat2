const get_patient_symptom = (message ) => {
    
     
    const requestBody = { userMessage: message };
    
     
    const baseURL = "http://127.0.0.1:5000/";
    const endpoint = "get_patient_symptom";
    const url = baseURL + endpoint;


    console.log("Sending request to server: ", message); // Debugging server request
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      console.log("Response received from server: ", data); // Debugging response data
      setResponse(data);
      chatController.handleEvent('userMessage', message);
    })
    .catch(error => {
      console.error("Error: ", error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const getMoreInfo = (message ) => {
    
     
    const requestBody = { symptomJson: message };
    
     
    const baseURL = "http://127.0.0.1:5000/";
    const endpoint = "getMoreInfo";
    const url = baseURL + endpoint;


    console.log("Sending request to server: ", message); // Debugging server request
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      console.log("Response received from server: ", data); // Debugging response data
      setResponse(data);
      chatController.handleEvent('userMessage', message);
    })
    .catch(error => {
      console.error("Error: ", error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };