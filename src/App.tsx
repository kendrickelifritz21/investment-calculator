import { useState } from 'react';

import Header from './components/Header/Header';
import Result from './components/Result/Result';
import UserInput, { UserInputData } from './components/UserInput/UserInput';

function App() {
  const [userInputData, setUserInputData] = useState<UserInputData>({
    initialInvestment: '15000',
    annualInvestment: '1200',
    expectedReturn: '6',
    duration: '10'
  });

  function handleInputDataChange(inputField: string, newValue: string) {
    setUserInputData(prevData => {
      return {
        ...prevData,
        [inputField]: newValue
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput onInputDataChange={handleInputDataChange} userInputData={userInputData}/>
      <Result />
    </>
  );
}

export default App
