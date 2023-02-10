import { CompanyColumns } from "data/Column/Admin.CompanyColumns";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminSidebar } from "../Admin.Sidebar";
import useAxiosPrivate from "hooks/useAxiosPrivate";

const CompanyManagement = () => {
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState({
        data: {},
        error: '',
    });
    const AdminCompanyColumns = [
        ...CompanyColumns,
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
                                    <Link className="btn btn-warning" to={`/admin/company-edit/${rowData?.id}`}><b>Update</b></Link>
                                </>
        },
        {
            cellStyle: {
                padding: '0'
            },
            render: rowData =>  rowData?.active
                                   ? <button className="btn btn-danger" onClick={() => deactivateCompany(rowData?.id)}><b>Deactivate</b></button>
                                   : <button className="btn btn-success" onClick={() => activateCompany(rowData?.id)}><b>Activate</b></button>
        }
    ]

    const getCompanies = async() => {
        setLoading(true);
        try {
            const response = await axiosPrivate.get(`admin/api/user/get-all-company`, {
                role: 'COMPANY'
            });
            if(response.status == 200){
                console.log(response)
                setCompanies({
                    data: response?.data.data,
                    error: '',
                });
            }
        } catch(err) {
            setCompanies({
                data: {},
                error: err?.message,
            });
        } finally {
            setLoading(false);
        }
    }

    const activateCompany = async(id) => {
        setLoading(true);
        try {
            const response = await axiosPrivate.put(`admin/api/user/activate/${id}`);
            if(response.status == 200){
                getCompanies();
                toast.success('Activate Company Successfully!');
                console.log(response);
            }
        } catch(err) {
            toast.error('Activate Company Failed!');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const deactivateCompany = async(id) => {
        setLoading(true);
        try {
            const response = await axiosPrivate.put(`admin/api/user/deactivate/${id}`);
            if(response.status == 200){
                getCompanies();
                toast.success('Deactivate Company Successfully!');
                console.log(response);
            }
        } catch(err) {
            toast.error('Deactivate Company Failed!');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCompanies();

        return() => {
            setLoading(true);
            setCompanies({});
        }
    },[]);

    return (
        <>
            <AdminSidebar companyManagementActive={true} />
            <div className='hero dashboard__hero' id='admin-hero'></div>
            <div className="admin-users-management with-sidebar-container">
                <div className='mb-4 dashboard-header admin__header' id='job-detail-management-content'>
                    <div className='title'>
                        <h4 className="m-0 py-2 h1">Admin's Companies Management</h4>
                        <Breadcrumb className='ml-2'>
                            <BreadcrumbItem><Link to='/admin/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Companies Management</BreadcrumbItem>
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

                    {!loading && !!companies?.error && (
                        <div className="text-center element--center" id="error-message">
                            <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                            <p className="h3 mt-2 text-danger">{companies?.error}</p>
                        </div>
                    )}

                    {!loading && !companies.error && !companies?.data && (
                        <div className="text-center element--center" id="error-message">
                            <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                            <p className="h3 mt-2 text-danger">There's something wrong. Please reload the page or return to the previous page!</p>
                        </div>
                    )}

                    {!loading && !companies.error && !!companies.data.length && (
                        <div className="box-shadow-1">
                            <MaterialTable title={'Companies Management'}  data={companies?.data} columns={AdminCompanyColumns}
                                options={{
                                    minBodyHeight: '80vh',
                                    maxBodyHeight: '80vh',
                                    pageSize: companies?.data.length,
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

export default CompanyManagement