import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AdminSidebar } from "../Admin.Sidebar";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { JobColumns } from "data/Column/Admin.JobColumns";
import { toast } from "react-toastify";

const JobManagement = () => {
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState({
        data: {},
        error: '',
    });

    const JobCols = [
        ...JobColumns,
        {
            cellStyle: {
                padding: '0'
            },
            render: rowData =>  <>
                                    <button className="btn btn-secondary"><b>Detail</b></button>
                                </>
        },
        {
            cellStyle: {
                padding: '0'
            },
            render: rowData =>  <>
                                    <Link className="btn btn-warning" to={`/admin/job-edit/${rowData?.id}`}><b>Update</b></Link>
                                </>
        },
        {
            cellStyle: {
                padding: '0'
            },
            render: rowData =>  rowData?.available
                                   ? <button className="btn btn-danger" onClick={() => deactiveJob(rowData?.id)}><b>Deactivate</b></button>
                                   : <button className="btn btn-success" onClick={() => activeJob(rowData?.id)}><b>Activate</b></button>
        }
    ]

    const getJobs = async() => {
        setLoading(true);
        try {
            const response = await axiosPrivate.get(`admin/api/job/get-list`);
            console.log(response);
            if(response.status == 200) {
                setJobs({
                    data: response?.data.data,
                    error: '',
                });
            }
        } catch(err) {
            console.log(err);
            setJobs({
                data: {},
                error: err?.response.message
            });
        } finally {
            setLoading(false);
        }
    }

    const activeJob = async(id) => {
        setLoading(true);
        try {
            const response = await axiosPrivate.put(`admin/api/job/enable/${id}`);
            if(response.status == 200){
                getJobs();
                toast.success('Activate Job Successfully!');
                console.log(response);
            }
        } catch(err) {
            toast.error('Activate Job Failed!');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const deactiveJob = async(id) => {
        setLoading(true);
        try {
            const response = await axiosPrivate.put(`admin/api/job/disable/${id}`);
            if(response.status == 200){
                getJobs();
                toast.success('Deactivate Job Successfully!');
                console.log(response);
            }
        } catch(err) {
            toast.error('Deactivate Job Failed!');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getJobs();

        return() => {
            setLoading(true);
            setJobs({});
        }
    },[]);

    return (
        <>
            <AdminSidebar jobManagementActive={true} />
            <div className='hero dashboard__hero' id='admin-hero'></div>
            <div className="admin-users-management with-sidebar-container">
                <div className='mb-4 dashboard-header admin__header' id='job-detail-management-content'>
                    <div className='title'>
                        <h4 className="m-0 py-2 h1">Admin's Job Management</h4>
                        <Breadcrumb className='ml-2'>
                            <BreadcrumbItem><Link to='/admin/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Jobs Management</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div className='admin-users-management__table'>
                {loading && (
                        <div className="text-center element--center" id="error-message">
                            <Spinner animation="border" variant='info'/>
                            <p className="h3 mt-2">Something is stuck. Please wait while we clearing the way!</p>
                        </div>
                    )}

                    {!loading && !!jobs?.error && (
                        <div className="text-center element--center" id="error-message">
                            <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                            <p className="h3 mt-2 text-danger">{jobs?.error}</p>
                        </div>
                    )}

                    {!loading && !jobs.error && !jobs?.data && (
                        <div className="text-center element--center" id="error-message">
                            <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                            <p className="h3 mt-2 text-danger">There's something wrong. Please reload the page or return to the previous page!</p>
                        </div>
                    )}

                    {!loading && !jobs.error && !!jobs.data.length && (
                        <div className="box-shadow-1">
                            <MaterialTable title={'Jobs Management'} columns={JobCols} data={jobs?.data}
                                options={{
                                    minBodyHeight: '80vh',
                                    maxBodyHeight: '80vh',
                                    pageSize: jobs?.data.length,
                                    pageSizeOptions: [],
                                    paging: false,
                                    headerStyle: {
                                        backgroundColor: '#525252',
                                        color: '#fff',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        position: 'sticky',
                                        top: '0'
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
export default JobManagement