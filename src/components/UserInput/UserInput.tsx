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
  const [data, setData] = useState<UserInputData>(userInputData);

  function handleChange(inputField: string, currentValue: string, re: RegExp, event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    var validatedValue: string = '';
    if (value) {
      validatedValue = re.test(value) ? value : currentValue;
    }

    setData(prevData => {
      return {
        ...prevData,
        [inputField]: validatedValue
      };
    });

    onInputDataChange(inputField, validatedValue);
  }

  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial Investment</label>
          <input required value={data.initialInvestment} type="text" 
            onChange={(event) => handleChange("initialInvestment", data.initialInvestment, decimalRegex, event)}>
          </input>
        </p>
        <p>
          <label>Annual Investment</label>
          <input required value={data.annualInvestment} type="text"
            onChange={(event) => handleChange("annualInvestment", data.annualInvestment, decimalRegex, event)}>
          </input>
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Expected Return</label>
          <input required value={data.expectedReturn} type="text"
            onChange={(event) => handleChange("expectedReturn", data.expectedReturn, decimalRegex, event)}>
          </input>
        </p>
        <p>
          <label>Duration</label>
          <input required value={data.duration} type="text"
            onChange={(event) => handleChange("duration", data.duration, intRegex, event)}>
          </input>
        </p>
      </div>
    </section>
  );
}