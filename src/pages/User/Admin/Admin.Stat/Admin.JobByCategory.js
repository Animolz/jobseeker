import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Col, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AdminSidebar } from "../Admin.Sidebar";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { JobColumns } from "data/Column/Admin.JobColumns";
import { toast } from "react-toastify";
import PieChart from "components/Chart/PieChart";

const JobByCategories = () => {
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState({});
    const [stats, setStats] = useState({});
    const jobByCategoriesCols = [
        {
            title: 'Number of Jobs',
            field: 'numberOfJobs'
        },
        {
            title: 'Job Category',
            field: 'jobCategoryName'
        }
    ]

    const getJobByCategories = async() => {
        setLoading(true);

        try {
            const response =  await axiosPrivate.get('admin/api/stats/jobs-by-category');
            console.log(response);
            if(response.status == 200){
                setData(response?.data.data);
                setError('');
                let labels = [];
                let data = [];
                let color = [];
                response?.data.data.forEach(element => {
                    labels.push(element?.jobCategoryName);
                    data.push(element?.numberOfJobs);
                    color.push(`rgba(` + 
                        Math.floor(Math.random() * 255) + `,` + 
                        Math.floor(Math.random() * 255) + `,` + 
                        Math.floor(Math.random() * 255) + `, 0.7)`)
                });

                setStats({
                    labels: labels, 
                    datasets: [{
                        data: data,
                        backgroundColor: color,
                        borderColor: 'rgba(200, 200, 200, 0.75)',
                        hoverBorderColor: 'rgba(200, 200, 200, 1)',
                        borderWidth: 1,
                    }]
                });
            }
        } catch(err) {
            console.log(err);
            setError(err?.message);
        } finally {
            setLoading(false);
        }
    }
    

    useEffect(() => {
        getJobByCategories();

        return() => {
            setLoading(true);
            setError('');
            setData({});
            setStats({});
        }
    },[]);

    return (
        <>
            <AdminSidebar jobByCategory={true} />
            <div className='hero dashboard__hero' id='admin-hero'></div>
            <div className="admin-users-management with-sidebar-container">
                <div className='mb-4 dashboard-header admin__header' id='job-detail-management-content'>
                    <div className='title'>
                        <h4 className="m-0 py-2 h1">Admin's Stat Jobs By Category</h4>
                        <Breadcrumb className='ml-2'>
                            <BreadcrumbItem><Link to='/admin/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Jobs Stat</BreadcrumbItem>
                            <BreadcrumbItem active>By Category</BreadcrumbItem>
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

                    {!loading && !!error && (
                        <div className="text-center element--center" id="error-message">
                            <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                            <p className="h3 mt-2 text-danger">{error}</p>
                        </div>
                    )}

                    {!loading && !error && !data?.length && (
                        <div className="text-center element--center" id="error-message">
                            <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                            <p className="h3 mt-2 text-danger">There's something wrong. Please reload the page or return to the previous page!</p>
                        </div>
                    )}

                    {!loading && !error && !!data?.length && (
                        <Row className="box-shadow-1 bg-light rounded p-1">
                            <Col className="">
                                <MaterialTable title={'Jobs By Categories'} columns={jobByCategoriesCols} data={data}
                                    options={{
                                        minBodyHeight: '80vh',
                                        maxBodyHeight: '80vh',
                                        pageSizeOptions: [],
                                        paging: false,
                                        search: false,
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
                            </Col>
                            <Col>
                                {stats?.datasets && <PieChart data={stats} />}
                            </Col>
                        </Row>
                    )}
                </div>
            </div>
        </>
    );
}
export default JobByCategories