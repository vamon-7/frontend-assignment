import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable.tsx';
import './assets/css/style.css';
import Pagination from './components/Pagination.tsx';

function App() {
  const [data, setData] = useState([]);
  const [currItems, setCurrItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  //to fecth data of table
  async function getData() {
    try {
      const res = await fetch(
        'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json'
      );
      const data = await res.json();
      setData(data);
      setCurrItems(data.slice(0, 5));
    } catch (e) {
      console.log('error in fetching data', e);
    }
  }

  //when page is changed fn gets called
  function onPageChange(page) {
    const startIndex = (page - 1) * 5;
    const endIndex = startIndex + 5;
    setCurrItems(data.slice(startIndex, endIndex));
  }

  return (
    <div className="container">
      <DataTable data={currItems} />
      <Pagination
        totalItems={data.length}
        onPageChange={onPageChange}
        itemsPerPage={5}
      />
    </div>
  );
}

export default App;
