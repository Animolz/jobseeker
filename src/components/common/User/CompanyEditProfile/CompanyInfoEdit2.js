import RadioButton from "components/form/RadioButton";
import Textbox from "components/form/Textbox";
import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { motion } from "framer-motion";
import Select from 'react-select'
import validator from "validator";

export const CompanyInfoEdit2 = ({ data, setData }) => {
    const validation = () => {
        if(
            !(validator.isEmail(data?.contactEmail)) ||
            !(validator.matches(data?.contactTel, '^[0-9]{9,12}$')) ||
            validator.isEmpty(data?.contactAddress) ||
            validator.isEmpty(data?.headquarters) ||
            !(validator.isURL(data?.link))

        ) {
            document.getElementById('edit-company__submit-btn').disabled = true;
        }
        else {
            document.getElementById('edit-company__submit-btn').disabled = false; 
        }
    }

    useEffect(() => {
        validation();
    }, [data]);

    return (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className='text-center w-100 h1'><strong>Company Info</strong></div> 
            <div>
                <Textbox 
                    id='company-email' 
                    type='text'
                    name='company-email' 
                    error='Company Email should be valid!'
                    label='Company Email'
                    pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
                    value={data?.contactEmail}
                    onChange={(e) => setData({ ...data, contactEmail: e.target.value })}
                    required
                />
                <Textbox 
                    id='company-tel' 
                    type='text'
                    name='company-tel' 
                    error='Phone number should be between 9 and 12 characters and not contain character or special character!'
                    label='Company Tel'
                    pattern='^[0-9]{9,12}$'
                    value={data?.contactTel}
                    onChange={(e) => setData({ ...data, contactTel: e.target.value })}
                    required
                />
                <Textbox 
                    id='company-address' 
                    type='text'
                    name='company-address' 
                    error='Company Address should not be empty!'
                    label='Company Address'
                    value={data?.contactAddress}
                    pattern='^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$'
                    onChange={(e) => setData({ ...data, contactAddress: e.target.value })}
                    required
                />
                <Textbox 
                    id='headquarters-address' 
                    type='text'
                    name='headquarters-address' 
                    error='Headquarters Address should not be empty!'
                    label='Headquarters Address'
                    value={data?.headquarters}
                    pattern='^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$'
                    onChange={(e) => setData({ ...data, headquarters: e.target.value })}
                    required
                />
                <Textbox 
                    id='company-site' 
                    type='text'
                    name='company-site' 
                    error='Company Link should be valid!'
                    label='Company Site'
                    value={data?.link}
                    pattern='^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{2,24}$'
                    onChange={(e) => setData({ ...data, link: e.target.value })}
                    required
                />
                <button className="btn btn-success px-5 text-light mt-4" id='edit-company__submit-btn'><b>Submit</b></button>
            </div>
        </motion.div>
    );
}