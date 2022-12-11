import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function TrainingList() {
    const dayjs = require('dayjs')

    const [trainings, setTrainings] = useState([]);
    const gridRef = useRef();

    const columns = [{
        headerName: 'Trainings',
        children: [
            {
                field: 'activity', headerName: 'Activity',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                headerName: 'Date', valueGetter(params) {
                    return dayjs(params.data.date).format('DD.MM.YYYY HH:mm')
                },
                sortable: true, filter: true, floatingFilter: true
            },
            {
                field: 'duration', headerName: 'Duration',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                headerName: 'Customer', valueGetter(params) {
                    return params.data.customer.firstname + ' ' + params.data.customer.lastname
                },
                sortable: true, filter: true, floatingFilter: true
            }
        ]
    }]

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data));
    }

    useEffect(() => {
        fetchTrainings();
    }, [])

    return (
        <div>
            <div className='ag-theme-material'
                style={{ height: '600px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    rowSelection='single'
                    columnDefs={columns}
                    rowData={trainings}
                    animateRows={true}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        </div>
    );
};

export default TrainingList;