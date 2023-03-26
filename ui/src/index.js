import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App language={defaultLanguage} messages={messages}/>
  </React.StrictMode>
);


let languages : Array<string> = ["en", "fr"];
let messages : any = {};

languages.forEach(language => {
    addLocaleData(require("react-intl/locale-data/"+language));
    messages[language] = require("./translations/"+language+".json");
});

const defaultLanguage : string = navigator.language.split(/[-_]/)[0];  // language without region code
