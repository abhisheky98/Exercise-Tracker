import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WorkoutsContextProvider } from './context/WorkoutContext';
import { UserAuthenticationContext } from './context/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserAuthenticationContext>
      <WorkoutsContextProvider>
        <App />
    

      </WorkoutsContextProvider>
    </UserAuthenticationContext>
  </React.StrictMode>
);


reportWebVitals();
