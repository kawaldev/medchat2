import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import ChatFormWithAgent from './Components/ChatFormWithAgent';
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom'; 
import {PatientIntakeState as PatientIntakeState} from './Components/StateManager/PatientIntakeState.jsx';
import ChatFormWrapper from './Components/ChatFormWrapper';
import ChatForm from './Components/ChatForm.jsx';
//import { StateProvider } from './StateProvider';
/*
const stateMapping = {
  
  intake: PatientIntakeState
  
};
*/

/*
const App = () => {
  return (
    <div>
      <Header />
      <ChatForm  /> 
    </div>
  );
};
 */



const App = () => {
  return (
  /*  <StateProvider>*/
      <Router>
          <Routes>
              <Route path="/chat" element={<ChatFormWrapper />} />
              <Route path="/chatold" element={<div>
                                              <Header />
                                              <ChatForm  /> 
                                              </div>
                                              } />
              
          </Routes>
      </Router>
      /*</StateProvider> */
  );
};

export default App;
