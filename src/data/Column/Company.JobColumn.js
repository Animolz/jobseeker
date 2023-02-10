import { ConvertBooleanString, ConvertStringToBool } from 'utils/ConvertStringToBoolean'
import FormatDate from '../../utils/FormatDate'
import Format from '../../utils/FormatDate'

export const JobColumns = [
    {
        title: 'Id',
        field: 'tableData.id',
        cellStyle: {
            width: '5rem'
        },
        render: rowData => rowData.tableData.id+1
    },
    {
        title: 'Title',
        field: 'title',
        cellStyle: {
            maxWidth: '15rem',
            minWidth: '15rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        }
    },
    {
        title: 'Job Category',
        field: 'jobCategory.name',
        cellStyle: {
            maxWidth: '13rem',
            minWidth: '13rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        }
    },
    {
        title: 'Job Position',
        field: 'position.name'
    },
    {
        title: 'Job Type',
        field: 'jobType.name'
    },
    {
        title: 'Number of Candidates',
        field: 'applyJobCounter'
    },
    {
        title: 'Active',
        field: 'available',
        cellStyle: {
            maxWidth: '5rem'
        },
        render: rowData => rowData?.available
                            ? <i class="fa-solid fa-circle-check text-success"></i>
                            : <i class="fa-solid fa-circle-xmark text-danger"></i>
    },
    {
        title: 'Created Date',
        field: 'datePublished',
        render: rowData => <span>{!!rowData?.datePublished ? FormatDate.fFullDate(rowData?.datePublished) : 'No Date here'}</span>
    },
]