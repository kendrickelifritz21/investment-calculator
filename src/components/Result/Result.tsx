const TABLE_HEADINGS = ['Year', 'Investment Value', 'Interest (Year)', 'Total Interest', 'Invested Capital']

export default function Result() {
  return (
    <table id="result">
        <thead>
          <tr>
            {TABLE_HEADINGS.map(heading => (
              <th>{heading}</th>
            ))}
          </tr>
        </thead>
      </table>
  );
}