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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import clsx from 'clsx';
import {
  GridRowsProp,
  useGridApiRef,
  DataGridPro,
  GridApi,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridActionsCellItem,
  GridEventListener,
  GridEvents,
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid-pro';
import FormDialog from '../Modal/Modal';

const GETDATA_URL = "/getData";
const rows: GridRowsProp = [
  {id: 1, Program: "Insurance", FirstName: "Benn", LastName: "Tennyson", DOJIncedo: "4/Jan/2010", CurrentLevel: "4A", LastPromotedOn: "24/April/2015", CurrentManager: "James Sewer",RecoredOn:"25/April/2015", rag: 3},
  {id: 2, Program: "POF", FirstName: "John", LastName: "LivingSton", DOJIncedo: "2/April/2020", CurrentLevel: "3A", LastPromotedOn: "15/Jan/2022", CurrentManager: "Biller Stone",RecoredOn:"15/Jan/2022", rag: 2},
  {id: 3, Program: "Telecom", FirstName: "Eddy", LastName: "Brok", DOJIncedo: "23/Feb/2022", CurrentLevel: "3B", LastPromotedOn: "4/April/2022", CurrentManager: "Alexander",RecoredOn:"25/April/2022", rag: 1,},
];

interface EditToolbarProps {
  apiRef: React.MutableRefObject<GridApi>;
}

function EditToolbar(props: EditToolbarProps) {
  const { apiRef } = props;

  const handleClick = () => {
    const id = id
    apiRef.current.updateRows([{ id, isNew: true }]);
    apiRef.current.startRowEditMode({ id });

    // Wait for the grid to render with the new row
    setTimeout(() => {
      apiRef.current.scrollToIndexes({
        rowIndex: apiRef.current.getRowsCount() - 1,
      });
      apiRef.current.setCellFocus(id, 'name');
    });
  };

}
const DashboardPage = () => {
    const [value, onChange] = useState(new Date());

    const [user, setUser] = useState('');

    const auth = useAuth();
  
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

   
    const openClick = () =>{
      setOpen(true) 
    }
    const handleClose = () =>{
      setOpen(false) 
    }
   // const [rows, setRows] = useState(''); // Set rowData to Array of Objects, one Object per Row


    // const columns = [
    //     { field: 'id', headerName: 'ID', width: 40 },
    //     {
    //         field: 'program',
    //         headerName: 'Program',
    //         width: 150,
    //         editable: true,
    //     },
    //     {
    //         field: 'firstName',
    //         headerName: 'First name',
    //         width: 150,
    //         editable: true,
    //     },
    //     {
    //         field: 'lastName',
    //         headerName: 'Last name',
    //         width: 150,
    //         editable: true,
    //     },
    //     {
    //         field: 'doj',
    //         headerName: 'DOJ Incedo',
    //         type: 'number',
    //         width: 110,
    //         editable: true,
    //     },
    //     {
    //         field: 'currentLevel',
    //         headerName: 'Current Level',
    //         sortable: false,
    //         width: 150,
    //     },
    //     {
    //         field: 'lastPromotedOn',
    //         headerName: 'Last Promoted On',
    //         sortable: false,
    //         width: 150,
    //     },
    //     {
    //         field: 'CurrentManager',
    //         headerName: 'Current Manager',
    //         sortable: false,
    //         width: 150,
    //     },
    //     {
    //         field: 'RecordedOn',
    //         headerName: 'Recorded On',
    //         sortable: false,
    //         width: 150,
    //     },
    //     {
    //         field: 'rag',
    //         headerName: 'RAG',
    //         sortable: false,
    //         width: 150,
    //     },
    // ];

    // useEffect(()=>{
      
    //     try {
    
    //         const reponse = axios.post(GETDATA_URL, JSON.stringify({
    //          month: 3,
    //          year: 2022
    //         }), {
    //           headers: { 'Content-Type': 'application/json' },
    //           withCredentials: false
    //         }
    //         );
      
    //         reponse.then(function (result) {
    //           console.log(result);
    //           console.log(JSON.stringify(result.data));
      
    //           console.log(result.data.status)
    //           if (result.data.status === "success"){      
    //             setRows(result.data.ragEntryList);
    //           }
    //           else{
    //             navigate('/error');
    //           }  
    //         }).catch(function (error) {
    //           if (error.response) {
    //             // Request made and server responded
    //             console.log(error.response.data);
    //             console.log(error.response.status);
    //             console.log(error.response.headers);
    //           } else if (error.request) {
    //             // The request was made but no response was received
    //             console.log(error.request);
    //             navigate('/error');
    //           } else {
    //             // Something happened in setting up the request that triggered an Error
    //             console.log('Error', error.message);
    //           }
          
    //         });
      
      
    //       } catch (err) {
    //         console.log(err);
    //         navigate('/');
    //       }
    //     }, [])
    
    const apiRef = useGridApiRef();

    const handleRowEditStart = (
      params: GridRowParams,
      event: MuiEvent<React.SyntheticEvent>,
    ) => {
      event.defaultMuiPrevented = true;
    };
  
    const handleRowEditStop: GridEventListener<GridEvents.rowEditStop> = (
      params,
      event,
    ) => {
      event.defaultMuiPrevented = true;
    };
  
    const handleEditClick = (id: GridRowId) => (event: React.MouseEvent) => {
      event.stopPropagation();
      apiRef.current.startRowEditMode({ id });
    };
  
    const handleSaveClick = (id: GridRowId) => async (event: React.MouseEvent) => {
      event.stopPropagation();
      await apiRef.current.stopRowEditMode({ id });
    };
  
    const handleDeleteClick = (id: GridRowId) => (event: React.MouseEvent) => {
      event.stopPropagation();
      apiRef.current.updateRows([{ id, _action: 'delete' }]);
    };
  
    const handleCancelClick = (id: GridRowId) => async (event: React.MouseEvent) => {
      event.stopPropagation();
      await apiRef.current.stopRowEditMode({ id, ignoreModifications: true });
  
      const row = apiRef.current.getRow(id);
      // if (row!.isNew) {
      //   apiRef.current.updateRows([{ id, _action: 'delete' }]);
      // }
    };
  
    const processRowUpdate = async (newRow: GridRowModel) => {
      return { ...newRow, isNew: false };
    };
  
    const columns: GridColumns = [
      { field: 'id', headerName: 'ID', width: 80 },
      { headerName: 'Program', field: "Program", editable: true, width:120 },
          { headerName: 'First Name', field: "FirstName", filter: true,editable: true, width:150  },
          { headerName: 'Last Name', field: "LastName", filter: true,editable: true, width:150  },
          { headerName: 'DOJ-Incedo', field: "DOJIncedo", filter: true, editable: true, type: 'date', width:120 } ,
          { headerName: 'Current Level', field: "CurrentLevel", filter: true, editable: true, width:120  },
          { headerName: 'Last Promoted On', field: "LastPromotedOn", filter: true,editable: true, type: 'date', width:120 },
          { headerName: 'Current Manager', field: "CurrentManager", filter: true, editable: true, width:150  },
          { headerName: 'Recored On', field: "RecoredOn",filter: true, editable: true, type: 'dateTime', width:150  },
          {
            headerName: 'RAG', 
            field: 'rag',
            type: 'number',
            width: 140,
            cellClassName: (params) => {
              if (params.value == null) {
                return '';
              }
        
              return clsx('super-app', {
                red: params.value === 1,
                amber: params.value === 2,
                green: params.value === 3,
  
              });
            },
          },
  
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          const isInEditMode = apiRef.current.getRowMode(id) === 'edit';
  
          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(id)}
                color="primary"
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }
  
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={openClick}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];


    return (
      <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        '& .super-app-theme--cell': {
          backgroundColor: 'rgba(224, 183, 60, 0.55)',
          color: '#1a3e72',
          fontWeight: '600',
        },
        '& .super-app.green': {
          backgroundColor: 'rgba(157, 255, 118, 0.49)',
          color: '#1a3e72',
          fontWeight: '600',
        },
        '& .super-app.amber': {
          backgroundColor: 'rgb(240, 163, 10)',
          color: '#1a3e72',
          fontWeight: '600',
        },
        '& .super-app.red': {
          backgroundColor: '#d47483',
          color: '#1a3e72',
          fontWeight: '600',
        },
      }}
    >
      <DataGridPro
        rows={rows}
        columns={columns}
        apiRef={apiRef}
        editMode="row"
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { apiRef },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
      <FormDialog open={open} handleClose={handleClose}/>
    </Box>
    );
};
export default DashboardPage;
