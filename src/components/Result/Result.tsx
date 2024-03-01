import { UserInputData } from '../UserInput/UserInput';
import { calculateInvestmentResults, formatter } from '../../util/investment';

const TABLE_HEADINGS = ['Year', 'Investment Value', 'Interest (Year)', 'Total Interest', 'Invested Capital']

interface ResultProps {
  userInputData: UserInputData
}

type UserInputNumbers = {
  initialInvestment: number,
  annualInvestment: number,
  expectedReturn: number,
  duration: number
}

export default function Result({userInputData}: ResultProps) {
  function getValueAsNumber(value: string) : number {
    return (!value) ? 0 : parseFloat(value);
  }

  function convertDataToNumbers(): UserInputNumbers {
    const inputNumbers: UserInputNumbers = {
      initialInvestment: getValueAsNumber(userInputData.initialInvestment),
      annualInvestment: getValueAsNumber(userInputData.annualInvestment),
      expectedReturn: getValueAsNumber(userInputData.expectedReturn),
      duration: getValueAsNumber(userInputData.duration)
    }

    return(inputNumbers);
  }

  const data = convertDataToNumbers();

  return (
    <table id="result">
        <thead>
          <tr>
            {TABLE_HEADINGS.map(heading => (
              <th>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calculateInvestmentResults(data).map(dataRow => {
            const totalInterest = dataRow.valueEndOfYear - (data.annualInvestment * dataRow.year) - data.initialInvestment;
            const totalInvestment = data.initialInvestment + (data.annualInvestment * dataRow.year);
            
            return(
              <tr key={dataRow.year}>
              <td>{dataRow.year}</td>
              <td>{formatter.format(dataRow.valueEndOfYear)}</td>
              <td>{formatter.format(dataRow.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalInvestment)}</td>
            </tr>
            );
          })}
        </tbody>
      </table>
  );
}