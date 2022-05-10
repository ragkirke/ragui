import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90,hide:true, },
    {
      field: 'tasks',
      headerName: 'Tasks',
      editable: true,
      width: 120,
    },
    {
      field: 'ActionItems',
      headerName: 'Action Items',
      editable: true,
      width: 130,
    },
    {
      field: 'RecordedOn',
      headerName: 'Recorded On',
      type: 'date',
      editable: true,
      width: 130,
    },
    
    {
      field: 'poc',
      headerName: 'POC',
      type: 'date',
      editable: true,
      width: 110,
    },
    {
      field: 'eta',
      headerName: 'ETA',
      type: 'date',
      editable: true,
    },
    {
        field: "status",
        headerName: 'Status',
        editable: true,
        type: "singleSelect",
        width: 130,
        valueOptions: ["Pending", "In Progress", "Completed"]
    },
    {
      field: 'notes',
      headerName: 'Notes',
      editable: true,
      width: 150,
    },
   
  ];
  
  const rows = [
    { id: 1, tasks: 'Location Change', ActionItems: '', RecordedOn:"12/03/2022", poc:"", eta:"", status:"Pending",notes:"",},
    { id: 2, tasks: 'Need Approval', ActionItems: '', RecordedOn:"27/0/2022", poc:"", eta:"", status:"In Progress",notes:"",},
  
  ];
  
export default function FormDialog({open, handleClose}) {


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Edit Details"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
     
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Save</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
