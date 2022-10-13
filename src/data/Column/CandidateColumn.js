import React from "react";
import Avatar, { ConfigProvider } from "react-avatar";

export const CandidateColumns = [
    {
        Header: '',
        accessor: 'avatar',
        Cell: ({row ,value}) => {
            return value ?  (<Avatar src={value} alt='404' size="40" round/>)
                            : (<Avatar name={row.original.fullName} size="40" round color={`rgba(` + 
                            Math.floor(Math.random() * 255) + `,` + 
                            Math.floor(Math.random() * 255) + `,` + 
                            Math.floor(Math.random() * 255) + `, 1)`}/>)
        }
    },
    {
        Header: 'Fullname',
        accessor: 'fullName',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Phone',
        accessor: 'phone',
    },
    {
        Header: 'CV',
        accessor: 'candidate.cv',
    },
]