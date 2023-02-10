import React from "react";
import Avatar, { ConfigProvider } from "react-avatar";
import AvatarInit from "utils/AvatarInit";
import { ConvertStringToBool } from "utils/ConvertStringToBoolean";
import FormatDate from "utils/FormatDate";

export const CompanyColumns = [
    {
        title: 'ID',
        cellStyle: {
            width: '4rem'
        },
        render: rowData => rowData.tableData.id+1
    },
    {
        title: 'Avatar',
        field: 'avatar',
        cellStyle: {
            width: '5rem'
        },
        render: (row) => AvatarInit({
                                        avatar: row?.avatar,
                                        name: row?.fullName,
                                        size: 50,
                                        round: 5,
                                    })
    },
    {
        title: 'Username',
        field: 'username',
        cellStyle: {
            width: '10rem'
        },
    },
    {
        title: 'Company`s Name',
        field: 'company.companyName',
        cellStyle: {
            maxWidth: '15rem',
            minWidth: '15rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },
    },
    {
        title: 'Email',
        field: 'company.contactEmail',
        cellStyle: {
            maxWidth: '15rem',
            minWidth: '15rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },
    },
    {
        title: 'Phone',
        field: 'company.contactTel',
        cellStyle: {
            width: '9rem'
        }
    },
    {
        title: 'Active',
        field: 'active',
        cellStyle: {
            width: '5rem'
        },
        render: rowData => rowData?.active
                            ? <i class="fa-solid fa-circle-check text-success"></i>
                            : <i class="fa-solid fa-circle-xmark text-danger"></i>
    },
    {
        title: 'Joined Date',
        field: 'joinedDate',
        render: rowData => <span>{FormatDate.fFullDate(rowData?.joinedDate)}</span>
    }
]