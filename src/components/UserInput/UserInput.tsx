import { useState } from 'react';

const intRegex = /^-?\d+$/;
const decimalRegex = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;

export type UserInputData = {
  initialInvestment: string,
  annualInvestment: string,
  expectedReturn: string,
  duration: string
}

interface UserInputProps {
  onInputDataChange: (inputField: string, newValue: string) => void
  userInputData: UserInputData;
}

export default function UserInput({onInputDataChange, userInputData}: UserInputProps) {
  function handleChange(inputField: string, currentValue: string, re: RegExp, event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    var validatedValue: string = '';
    if (value) {
      validatedValue = re.test(value) ? value : currentValue;
    }

    onInputDataChange(inputField, validatedValue);
  }

  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial Investment</label>
          <input required value={userInputData.initialInvestment} type="text" 
            onChange={(event) => handleChange("initialInvestment", userInputData.initialInvestment, decimalRegex, event)}>
          </input>
        </p>
        <p>
          <label>Annual Investment</label>
          <input required value={userInputData.annualInvestment} type="text"
            onChange={(event) => handleChange("annualInvestment", userInputData.annualInvestment, decimalRegex, event)}>
          </input>
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Expected Return</label>
          <input required value={userInputData.expectedReturn} type="text"
            onChange={(event) => handleChange("expectedReturn", userInputData.expectedReturn, decimalRegex, event)}>
          </input>
        </p>
        <p>
          <label>Duration</label>
          <input required value={userInputData.duration} type="text"
            onChange={(event) => handleChange("duration", userInputData.duration, intRegex, event)}>
          </input>
        </p>
      </div>
    </section>
  );
}