import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import validator from "validator";

export const CompanyJobEdit2 = ({ data, data1 , setData }) => {
    const validation = () => {
        if(
            (+data?.jobTypeId === 0) || 
            (+data?.jobCategoryId === 0) || 
            (+data?.positionId === 0) || 
            (+data?.provinceId === 0)
        ) {
            document.getElementById('edit-job__next-btn').disabled = true;
        }
        else{
            document.getElementById('edit-job__next-btn').disabled = false;
        }
    }

    useEffect(() => {
        validation();
    }, [data]);

    return (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className='text-center w-100 h1'><strong>Job Information</strong></div> 
            <div>
                <div className="mb-3">
                    <label className="d-block"><b>Number of Vacancies</b></label>
                    <input 
                        type='number' 
                        className="w-75 d-inline" 
                        id='other-input' 
                        max={100} 
                        min={0}
                        defaultValue={0}
                        value={data?.noOfVacancies}
                        onChange={(e) => setData({ ...data, noOfVacancies: e.target.value })}
                        required
                    />
                    <p className="d-inline ml-4 h6 text-muted"><b>Candidates</b></p>
                </div>
                <label className="d-block"><b>Job Category</b></label>
                <select value={data?.jobCategoryId} id="other-input"
                    onChange={(e) => setData({ ...data, jobCategoryId: e.target.value })}
                >
                    <option value={0}>Choose Job Category...</option>
                    {data1?.cates.map((cate, index) => (
                        <option key={index} value={cate.id}>{cate.name}</option>
                    ))}
                </select>
                <label className="d-block mt-3"><b>Job Type</b></label>
                <select value={data?.jobTypeId} id="other-input"
                    onChange={(e) => setData({ ...data, jobTypeId: e.target.value })}
                >
                    <option value={0}>Choose Job Type...</option>
                    {data1?.type.map((t, index) => (
                        <option key={index} value={t.id}>{t.name}</option>
                    ))}
                </select>
                <label className="d-block mt-3"><b>Position</b></label>
                <select value={data?.positionId} id="other-input"
                    onChange={(e) => setData({ ...data, positionId: e.target.value })}
                >
                    <option value={0}>Choose Position...</option>
                    {data1?.position.map((p, index) => (
                        <option key={index} value={p.id}>{p.name}</option>
                    ))}
                </select>
                <label className="d-block mt-3"><b>Province</b></label>
                <select value={data?.provinceId} id="other-input"
                    onChange={(e) => setData({ ...data, provinceId: e.target.value })}
                >
                    <option value={0}>Choose Province...</option>
                    {data1?.province.map((p, index) => (
                        <option key={index} value={p.code}>{p.name}</option>
                    ))}
                </select>
            </div>
        </motion.div>
    );
}