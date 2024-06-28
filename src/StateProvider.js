import React, { createContext, useReducer, useContext } from 'react';

// Create context
const StateContext = createContext();

// Initial state
const initialState = {
    patientSymptom: {},
    qtoPatientMoreInfo:"",


};

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PATIENT_DATA':
            return {
                ...state,
                patientSymptom: {
                    ...state.patientSymptom,
                    ...action.payload
                }
            };
        case 'SET_Q_MOREINFO':
            return {
                ...state,
                qtoPatientMoreInfo: {
                    ...state.qtoPatientMoreInfo,
                    ...action.payload
                }
            };
        default:
            return state;
    }
};

// Provider component
export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
};

// Custom hook to use the state
export const useStateContext = () => {
    return useContext(StateContext);
};
