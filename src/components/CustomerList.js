import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

    const columns = [{
        headerName: 'Customers',
        children: [
            {
                field: 'firstname', headerName: 'First name',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                field: 'lastname', headerName: 'Last name',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                field: 'email', headerName: 'Email',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                field: 'phone', headerName: 'Phone',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                field: 'streetaddress', headerName: 'Address',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                field: 'postcode', headerName: 'Postal code',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                field: 'city', headerName: 'City',
                sortable: true, filter: true, floatingFilter: true
            }
        ]
    }]

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content));
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    return (
        <div>
            <div className='ag-theme-material'
                style={{ height: '600px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    rowSelection='single'
                    columnDefs={columns}
                    rowData={customers}
                    animateRows={true}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        </div>
    );
};

export default CustomerList;