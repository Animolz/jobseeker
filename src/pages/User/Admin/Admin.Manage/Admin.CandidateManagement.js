import React, { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AdminSidebar } from "../Admin.Sidebar";
import MaterialTable from "material-table";
import useAxiosPrivate from "hooks/useAxiosPrivate";

import 'assets/global.scss'
import '../css/CandidateManagement.scss'

import { CandidateColumns } from "data/Column/Admin.CandidateColumn";
import { toast } from "react-toastify";

const CandidateManagement = () => {
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [candidates, setCandidates] = useState({
        data: {},
        error: '',
    });

    const AdminCandidatesColumns = [
        ...CandidateColumns,
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
                                    <Link to={`/admin/candidate-edit/${rowData?.id}`} className="btn btn-warning"><b>Update</b></Link>
                                </>
        },
        {
            cellStyle: {
                padding: '0'
            },
            render: rowData =>  rowData?.active
                                        ? <button className="btn btn-danger" onClick={() => deactivateCandidate(rowData?.id)}><b>Deactivate</b></button>
                                        : <button className="btn btn-success" onClick={() => activateCandidate(rowData?.id)}><b>Activate</b></button>
        }
    ]

    const getCandidates = async() => {
        setLoading(true);
        try {
            const response = await axiosPrivate.get(`admin/api/user/get-all-candidate`);
            if(response.status == 200){
                setCandidates({
                    data: response?.data.data,
                    error: '',
                })
            }
        } catch(err) {
            setCandidates({
                data: {},
                error: err?.message,
            });
        } finally {
            setLoading(false);
        }
    }

    const activateCandidate = async(id) => {
        setLoading(true);
        try {
            const response = await axiosPrivate.put(`admin/api/user/activate/${id}`);
            if(response.status == 200){
                getCandidates();
                toast.success('Activate Candidate Successfully!');
                console.log(response);
            }
        } catch(err) {
            toast.error('Activate Candidate Failed!');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const deactivateCandidate = async(id) => {
        setLoading(true);
        try {
            const response = await axiosPrivate.put(`admin/api/user/deactivate/${id}`);
            if(response.status == 200){
                getCandidates();
                toast.success('Deactivate Candidate Successfully!');
                console.log(response);
            }
        } catch(err) {
            toast.error('Deactivate Candidate Failed!');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCandidates();
        
        return() => {
            setCandidates({});
            setLoading(true);
        }
    }, []);

    return (
        <>
            <AdminSidebar candidateManagementActive={true} />
            <div className='hero dashboard__hero' id='admin-hero'></div>
            <div className="admin-candidates-management with-sidebar-container">
                <div className='mb-4 dashboard-header admin-candidates-management__header admin__header'>
                    <div className='title'>
                        <h4 className="m-0 py-2 h1">Admin's Candidates Management</h4>
                        <Breadcrumb className='ml-2'>
                            <BreadcrumbItem><Link to='/admin/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Candidates Management</BreadcrumbItem>
                        </Breadcrumb>
                        <Link className='btn btn-primary text-light position-absolute' to='/admin/user-add'><b>+ Create new user</b></Link>
                    </div>
                </div>
                <div className='admin-users-management__table'>
                {loading && (
                        <div className="text-center element--center" id="error-message">
                            <Spinner animation="border" variant='info'/>
                            <p className="h3 mt-2">Something is stuck. Please wait while we clearing the way!</p>
                        </div>
                    )}

                    {!loading && !!candidates?.error && (
                        <div className="text-center element--center" id="error-message">
                            <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                            <p className="h3 mt-2 text-danger">{candidates?.error}</p>
                        </div>
                    )}

                    {!loading && !candidates.error && !candidates?.data && (
                        <div className="text-center element--center" id="error-message">
                            <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                            <p className="h3 mt-2 text-danger">There's something wrong. Please reload the page or return to the previous page!</p>
                        </div>
                    )}

                    {!loading && !candidates.error && !!candidates.data.length && (
                        <div className="box-shadow-1">
                            <MaterialTable title={'Candidates Management'} data={candidates?.data} columns={AdminCandidatesColumns} 
                                options={{
                                    minBodyHeight: '80vh',
                                    maxBodyHeight: '80vh',
                                    pageSize: candidates?.data.length,
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

export default CandidateManagement