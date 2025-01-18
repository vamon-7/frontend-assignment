import React from 'react';
import '../assets/css/tablestyles.css';

type Props = {
  data: any[];
};

const DataTable = ({ data }: Props) => {
  return (
    <div className="table_container">
      <div className="heading-container">
        <h1>Funding Details</h1>
      </div>
      <table>
        <thead className="thead_th">
          <tr>
            <th>S.No.</th>
            <th>Percentage funded</th>
            <th>Amount pledged</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item?.['s.no']}>
              <td>{item?.['s.no']}</td>
              <td>{item?.['percentage.funded']}</td>
              <td>{item?.['amt.pledged']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
