import RadioButton from "components/form/RadioButton";
import Textbox from "components/form/Textbox";
import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { motion } from "framer-motion";
import Select from 'react-select'
import useAxiosPrivate from "hooks/useAxiosPrivate";
import validator from "validator";

export const CompanyInfoEdit1 = ({ data, setData }) => {
    const axiosPrivate = useAxiosPrivate();
    const [industries , setIndustries] = useState([]);

    const validation = () => {
        if(
            !(validator.matches(data?.companyName,'^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺ'
                                                    + 'ỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_ -]+$')) ||
            !data?.industryId.length
        ) {
            document.getElementById('edit-profile__next-btn').disabled = true;
        }
        else {
            document.getElementById('edit-profile__next-btn').disabled = false; 
        }
    }

    const getIndustries = async() => {
        try {
            const response = await axiosPrivate.get(`company/api/industry`);
            console.log(response);
            if(response.status == 200) {
                let newIndustries = new Array();
                response?.data.data.map(i => {
                    newIndustries.push({
                        id: i?.id,
                        value: i?.name,
                        label: i?.name
                    });
                })
                setIndustries(newIndustries);
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getIndustries();
    },[]);

    useEffect(() => {
        validation();
    }, [data]);

    return (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className='text-center w-100 h1'><strong>Company Info</strong></div> 
            <div>
                <Textbox 
                    id='company-name' 
                    type='text'
                    name='company-name' 
                    error='Company Name should be 5-20 characters minimum and not contain special character or number!'
                    label='Company Name' 
                    value={data?.companyName}
                    onChange={(e) => setData({ ...data, companyName: e.target.value })}
                    pattern='^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$'
                    required
                />
                <div className="mb-3">
                    <label className="d-block"><b>Company Size</b></label>
                    <input 
                        type='number' 
                        className="w-75 d-inline" 
                        id='other-input' 
                        max={100} 
                        min={0} 
                        value={data?.companySize}
                        onChange={(e) => setData({ ...data, companySize: e.target.value })}
                        required
                    />
                    <p className="d-inline ml-4 h6 text-muted"><b>Employees</b></p>
                </div>
                <label className='w-100'><b>Founded Date</b></label>
                <DatePicker 
                    value={new Date(data?.foundedYear)}
                    onChange={(value) => setData({... data, foundedYear: value})}
                    format='dd/MM/yyyy'
                />
                <div className='d-flex justify-content-between'>
                    <label className="mt-3"><b>Industries</b></label>
                    <span className='align-self-end mb-2 text-danger'><b>Please choose more than one Industries!</b></span>
                </div>
                <Select 
                    options={industries}
                    isMulti  
                    closeMenuOnSelect={false} 
                    placeholder='Choose Industries...' 
                    className="mb-3" 
                    defaultValue={data?.industryId}
                    onChange={(value) => setData({ ...data, industryId: value })}
                />
                <label className='w-100'><b>Introduction (Optional)</b></label>
                <textarea 
                    id='introduction' 
                    type='text'
                    name='introduction' 
                    className="w-100 h-auto p-3"
                    rows={3}
                    value={data?.introduction}
                    onChange={(e) => setData({ ...data, introduction: e.target.value })}
                />
            </div>
        </motion.div>
    );
}