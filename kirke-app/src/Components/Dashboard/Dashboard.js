import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import "./Dashboard.css"
import DatePicker from 'react-date-picker';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS

const DashboardPage = () => {
    const [value, onChange] = useState(new Date());
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData] = useState([
        { Program: "Insurance", FirstName: "Benn", LastName: "Tennyson", DOJIncedo: "4/Jan/2020", CurrentLevel: "3A", LastPromotedOn: "4/April/2022", CurrentManager: "James Sewer", RAG: "" },
    ]);
    //const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        { field: 'Program', field: "Program", filter: true, width:150 },
        { field: 'First Name', field: "FirstName", filter: true },
        { field: 'Last Name', field: "LastName", },
        { field: 'DOJ-Incedo', field: "DOJIncedo", },
        { field: 'Current Level', field: "CurrentLevel", },
        { field: 'Last Promoted On', field: "LastPromotedOn", },
        { field: 'Current Manager', field: "CurrentManager", },
        { field: 'RAG', field: "RAG", width:150, cellClassRules: {
            'rag-green': 'x < 20'}  },
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true
    }));

    return (
        <div className='DashboardMainDiv'>
            <div style={{padding:"10px"}}>
                <DatePicker onChange={onChange} value={value} placeholder="MM/DD/YYYY" />
            </div>
            {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
            <div className="ag-theme-alpine agGridHeight">

                <AgGridReact
                    ref={gridRef} // Ref for accessing Grid's API

                    rowData={rowData} // Row Data for Rows

                    columnDefs={columnDefs} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties

                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection='multiple' // Options - allows click selection of rows
                />
            </div>
        </div>
    );
};
export default DashboardPage;