import React, { useState } from 'react';
import './styles.css';
import Autocomplete from './components/Autocomplete';
import Model from './components/Model';
import Options from './components/Options';

const sampleData = require('./sample-data.js');
const predefinedData = require('./predefined-data.js');

function App() {

  const [suggestionObj, setSuggestionObj] = useState({});
  const [feedFromPredefined, setFeedFromPredefined] = useState(false);

  const [isDisabled, setDisabled] = useState(false);
  const [isReadonly, setReadonly] = useState(false);
  const [isRequired, setRequiered] = useState(true);
  const [isStrict, setStrict] = useState(true);

  return (
    <div className="App">
      <h1>Select address demo</h1>
      <hr/>
      <Options 
      setDisabled={setDisabled} 
      setReadonly={setReadonly} 
      setRequiered={setRequiered} 
      setStrict={setStrict}
      />
      <hr/>
      <h2>Select address</h2>
      <Autocomplete 
      data={sampleData} 
      predefinedData = {predefinedData}
      setSuggestionObj={setSuggestionObj} 
      setFeedFromPredefined={setFeedFromPredefined}
      isDisabled={isDisabled} 
      isReadonly={isReadonly} 
      isRequired={isRequired} 
      isStrict={isStrict}
      />
      <hr/>
      <div>
        <Model 
        predefinedData={predefinedData}
        feedFromPredefined={feedFromPredefined}
        suggestionObj={suggestionObj} 
        isDisabled={isDisabled} 
        isReadonly={isReadonly} 
        isRequired={isRequired} 
        isStrict={isStrict}
        />
      </div>
    </div>
  );
}

export default App;
