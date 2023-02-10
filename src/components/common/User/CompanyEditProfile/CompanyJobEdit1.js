import Textbox from "components/form/Textbox";
import React, { useEffect } from "react";
import DatePicker from "react-date-picker";
import { motion } from "framer-motion";
import FormatDate from "utils/FormatDate";
import validator from "validator";


export const CompanyJobEdit1 = ({ data, setData }) => {
    const validation = () => {
        if(
            !(validator.matches(data?.title, '^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ'
                                                + 'ỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_  ()]+$')) ||
            validator.isEmpty(data?.address)
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
                <Textbox 
                    id='job-title' 
                    type='text'
                    name='job-title' 
                    error='Job Title should be 5-20 characters minimum and not contain special character or number!'
                    label={<b>Job Title</b>}
                    value={data?.title}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                    pattern='^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ
                             ẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$'
                    required
                />
                <div className='mt-3'></div>
                <Textbox 
                    id='address' 
                    type='text'
                    name='address' 
                    error='Address should not be empty!'
                    value={data?.address}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                    label={<b>Address</b>}                 
                    required
                />
                <div className="my-3">
                    <label className="d-block"><b>Salary</b></label>
                    <input 
                        type='number' 
                        className="w-75 d-inline" 
                        id='other-input' 
                        min={0}
                        value={data?.salary}
                        onChange={(e) => setData({ ...data, salary: e.target.value })}
                        required
                    />
                    <p className="d-inline ml-4 h6 text-muted"><b>$</b></p>
                </div>
                <label className='w-100'><b>Expired Date</b></label>
                <DatePicker 
                    value={new Date(data?.jobStartDate)}
                    onChange={(value) => setData({ ...data, jobStartDate: value})}
                    format='dd/MM/yyyy'
                />
                <label className='w-100 mt-3'><b>Description (Optional)</b></label>
                <textarea 
                    id='description' 
                    type='text'
                    name='description' 
                    className="w-100 h-auto p-3"
                    rows={3}
                    value={data?.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                />
            </div>
        </motion.div>
    );
}