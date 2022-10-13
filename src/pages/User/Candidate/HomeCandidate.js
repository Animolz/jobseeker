import React, { useEffect, useState } from "react";
import JobApi from "../../../api/JobApi";
import Header from "../../../components/layout/Header";

const Home = () => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({});
    const [kw, setKw] = useState('');

    useEffect(() => {
        ;(async () => {
            try {
                const response = await JobApi.getAll(filters);
                console.log(response.data.data.content);
            } catch (err) {
                console.log(err.message);
            }
            setLoading(false);
        })()
    }, [filters]);

    const search = (e) => {
        e.preventDefault();

        setFilters({
            title:kw,
        });
    }

    return (
        <>
            <Header></Header>
        </>
    );
}

export default Home