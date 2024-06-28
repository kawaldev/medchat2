import State from './State.jsx'
import React, { useEffect } from 'react';
import { useStateContext } from '../../StateProvider.js';
import {ApiService} from '../../Models/ApiService.js';
class PatientIntakeState extends State {
    onEnter() {
        console.log("Patient intake");
        this.controller.setHeader("    I am pratik ,your assistant");
        this.controller.setBubbleMessage("So whats your main complaint? pl define it in detail , when it started , how sevier it is, is it chronic etc")
        /*this.controller.setQAContent([
            { id: 'q1', type: 'text', text: 'What is your name?' },
            { id: 'q2', type: 'text', text: 'What is your age?' },
            { id: 'q3', type: 'text', text: 'Describe your symptoms.' }
        ]);
         */
    }

    handleEvent(event, payload) {
        console.log(event+ ","+ payload);
        const { dispatch } = useContext(StateContext);
        if (event === 'onsubmit') {
            
            const apiService = new ApiService("http://127.0.0.1:5000/");
  
            apiService.getPatientSymptom(payload)
            .then(data => {
                if (data.Classification === "Relevant") {
                    // Call the getMoreInfo method
                    dispatch({ type: 'SET_PATIENT_DATA', payload: data });
                    
                    apiService.getMoreInfo(data)
                    .then(moreInfoData => {
                        console.log("More info data: ", moreInfoData);
                        dispatch({ type: 'SET_Q_MOREINFO', payload: moreInfoData });
                    
                      //  setResponse(moreInfoData); // Assuming setResponse is defined elsewhere
                        this.controller.transitionTo(new PatientIntakeState1(this.controller));
                    })
                    .catch(error => {
                        console.error("Error getting more info: ", error);
                    });
                } else if (data.Classification === "Irrelevant") {
                    // Inform the user that the information is not acceptable
                    console.log("The information provided is irrelevant or not acceptable.");
                    setResponse({ message: "The information provided is irrelevant or not acceptable." });
                    this.controller.setBubbleMessage("Well thats not really relevant , can you please stick to your medical problem ?")
    
                }
                // Handle the response data
                console.log("Patient symptom data: ", data);
                
                // chatController.handleEvent('userMessage', "headache"); // Assuming chatController is defined elsewhere
                setResponse(data); // Assuming setResponse is defined elsewhere

                //this.controller.transitionTo(new PatientIntakeState1(this.controller));

                })
            .catch(error => {
      // Handle the error
            console.error("Error in fetching patient symptom: ", error);
            })
            .finally(() => {
                setIsLoading(false); // Assuming setIsLoading is defined elsewhere
            });
  
            console.log("Intake form submitted with answers:", payload);
            // Handle the intake form submission, transition to next state or process further
        }
    }
}

class PatientIntakeState1 extends State {
    onEnter() {
        console.log("Patient intake state 2 ");
        const { state } = useStateContext();
        this.controller.setHeader("    I am pratik ,your med assistant");
        this.controller.setBubbleMessage(state.qtoPatientMoreInfo)
        
         
    }

    handleEvent(event, payload) {
        console.log(event+ ","+ payload);
        if (event === 'submitIntake') {
            console.log("Intake form submitted with answers:", payload);
            // Handle the intake form submission, transition to next state or process further
        }
    }
}

export   {PatientIntakeState,PatientIntakeState1}