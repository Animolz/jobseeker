import Format from '../../utils/FormatDate'

export const JobColumns = [
    {
        Header: 'Id',
        accessor: 'id'
    },
    {
        Header: 'Title',
        accessor: 'title'
    },
    {
        Header: 'Job Category',
        accessor: 'jobCategory.name'
    },
    {
        Header: 'Job Position',
        accessor: 'position.name'
    },
    {
        Header: 'Job Type',
        accessor: 'jobType.name'
    },
    {
        Header: 'Number of Candidates',
        accessor: 'applyJobCounter'
    },
    {
        Header: 'Active',
        accessor: 'available',
        Cell: ({value}) => { return value ? <i className="fa-solid fa-square-check text-success"></i> : <i className="fa-solid fa-square-xmark text-danger"></i> }
    },
    {
        Header: 'Created Date',
        accessor: 'modifiedDate',
        Cell: ({value}) => Format.fFullDate( value )
    },
]