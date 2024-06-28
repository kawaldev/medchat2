import React from 'react';
import { useLocation } from 'react-router-dom';
import ChatFormWithAgent from './ChatFormWithAgent';
 
import {PatientIntakeState as PatientIntakeState} from './StateManager/PatientIntakeState';
import Header from './Header'; 

const stateMapping = {
  
    intake: PatientIntakeState,
  
};


const ChatFormWrapper = ( ) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialStateName = queryParams.get('state') || 'intake';
    const InitialStateClass = stateMapping[initialStateName] || PatientIntakeState;
    console.log("Chat form wrapper")
    return (
      <div>
      <Header />
     
      <ChatFormWithAgent initialState={InitialStateClass} />
      </div>
    );
  };
  export default ChatFormWrapper;