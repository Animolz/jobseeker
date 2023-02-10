import React from "react";
import Avatar, { ConfigProvider } from "react-avatar";
import AvatarInit from "utils/AvatarInit";
import FormatDate from "utils/FormatDate";

export const CandidateColumns = [
    {
        title: '',
        field: 'candidateUser.avatar',
        cellStyle: {
            maxWidth: '5rem'
        },
        render: rowData => <AvatarInit avatar={rowData?.candidateUser?.avatar} name={rowData?.candidateUser?.fullName} size={50} round={true} />
    },
    {
        title: 'Candidate Name',
        field: 'candidateUser.fullName',
        cellStyle: {
            maxWidth: '15rem',
            minWidth: '15rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        }
    },
    {
        title: 'Status',
        field: 'status',
    },
    {
        title: 'Applied Date',
        field: 'createdDate',
        render: rowData => FormatDate.fFullDate(rowData?.createdDate)
    }
]