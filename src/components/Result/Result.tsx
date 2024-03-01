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

type ResultRow = {
  year: number,
  investmentValue: number,
  interest: number,
  totalInterest: number,
  investedCapital: number
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

  function calculateResult(): ResultRow[] {
    const investmentResults = calculateInvestmentResults(convertDataToNumbers());
    const results: ResultRow[] = [];

    let totalInterest = 0;
    let investedCapital = 0;
    for (let i = 0; i < investmentResults.length; i++) {
      totalInterest += investmentResults[i].interest;
      investedCapital += investmentResults[i].annualInvestment;

      results.push({
        year: investmentResults[i].year,
        investmentValue: investmentResults[i].valueEndOfYear,
        interest: investmentResults[i].interest,
        totalInterest: totalInterest,
        investedCapital: investedCapital
      })
    }

    return results;
  }

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
          {calculateResult().map(dataRow => (
            <tr key={dataRow.year}>
              <td>{dataRow.year}</td>
              <td>{formatter.format(dataRow.investmentValue)}</td>
              <td>{formatter.format(dataRow.interest)}</td>
              <td>{formatter.format(dataRow.totalInterest)}</td>
              <td>{formatter.format(dataRow.investedCapital)}</td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}