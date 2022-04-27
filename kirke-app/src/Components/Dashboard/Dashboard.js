import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import "./Dashboard.css"
import DatePicker from 'react-date-picker';
// import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
// import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS

import TextField from '@mui/material/TextField';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataGrid } from '@mui/x-data-grid';

import AuthContext from '../../context/AuthProvider';

import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

const GETDATA_URL = "/getData";

const DashboardPage = () => {
    const [value, onChange] = useState(new Date());

    const [user, setUser] = useState('');

    const auth = useAuth();
  
    const navigate = useNavigate();

    const [rows, setRows] = useState(''); // Set rowData to Array of Objects, one Object per Row


    const columns = [
        { field: 'id', headerName: 'ID', width: 40 },
        {
            field: 'program',
            headerName: 'Program',
            width: 150,
            editable: true,
        },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'doj',
            headerName: 'DOJ Incedo',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'currentLevel',
            headerName: 'Current Level',
            sortable: false,
            width: 150,
        },
        {
            field: 'lastPromotedOn',
            headerName: 'Last Promoted On',
            sortable: false,
            width: 150,
        },
        {
            field: 'CurrentManager',
            headerName: 'Current Manager',
            sortable: false,
            width: 150,
        },
        {
            field: 'RecordedOn',
            headerName: 'Recorded On',
            sortable: false,
            width: 150,
        },
        {
            field: 'rag',
            headerName: 'RAG',
            sortable: false,
            width: 150,
        },
    ];

    useEffect(()=>{
      
        try {
    
            const reponse = axios.post(GETDATA_URL, JSON.stringify({
             month: 3,
             year: 2022
            }), {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: false
            }
            );
      
            reponse.then(function (result) {
              console.log(result);
              console.log(JSON.stringify(result.data));
      
              console.log(result.data.status)
              if (result.data.status === "success"){      
                setRows(result.data.ragEntryList);
              }
              else{
                navigate('/error');
              }  
            }).catch(function (error) {
              if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                navigate('/error');
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
          
            });
      
      
          } catch (err) {
            console.log(err);
            navigate('/');
          }
        }, [])
    
     
    return (
        <div className='DashboardMainDiv'>
            <div className='row'>
                <div className='col-md-2' style={{ marginLeft: "15px" }}>
                    <TextField
                        margin="normal"
                        id="Manager"
                        label="Search Manager"
                        name="Manager"
                        size="small"
                        autoFocus
                    />
                </div>
                <div className='col-md-2'>
                    <TextField
                        margin="normal"
                        id="ProgramName"
                        label="Program Name"
                        name="ProgramName"
                        size="small"
                    />
                </div>
                <div className='col-md-2' style={{ paddingTop: "21px" }} >
                    <DatePicker onChange={onChange} value={value} placeholder="MM/DD/YYYY" />
                </div>
            </div>
            {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </div>
    );
};
export default DashboardPage;
