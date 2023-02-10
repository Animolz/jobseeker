import RadioButton from "components/form/RadioButton";
import Textbox from "components/form/Textbox";
import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { motion } from "framer-motion";
import validator from "validator";

export const PersonalInfoEdit = ({ data, setData }) => {

    const validation = () => {
        if (
            !(validator.matches(data?.fullName, '^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺ'
                                                 + 'ỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_ ]+$')) ||
            !(validator.isEmail(data?.email)) ||
            !(validator.matches(data?.phone, '^[0-9]{9,12}$')) ||
            validator.isEmpty(data?.address)
        ) {
            document.getElementById('edit-profile__next-btn').disabled = true;
        }
        else {
            document.getElementById('edit-profile__next-btn').disabled = false; 
        }
    }

    useEffect(() => {
        validation();
    }, [data]);

    return (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className='text-center w-100 h1'><strong>Personal Info</strong></div>
            <Textbox 
                id='fullname' 
                type='text'
                name='fullname' 
                error='Fullname should be not contain special character or number!'
                label='Fullname' 
                value={data?.fullName}
                pattern='^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$'
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
                required
            />
            <Textbox 
                id='email' 
                type='text'
                name='email' 
                error='Email should be valid!'
                label='Email'
                value={data?.email} 
                pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
            />
            <Textbox 
                id='phone' 
                type='text'
                name='phone' 
                error='Phone number should be between 9 and 12 characters and not contain character or special character!'
                label='Phone'
                value={data?.phone}
                pattern='^[0-9]{9,12}$'
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                required
            />
            <label className='w-100'><b>Date of Birth</b></label>
            <DatePicker 
                value={new Date(data?.dob)}
                onChange={(value) => setData({ ...data, dob: value })}
                format='dd/MM/yyyy'
            />
            <Textbox 
                id='address' 
                type='text'
                name='address' 
                error='Address should not be empty!'
                label='Address'
                pattern='^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$'
                value={data?.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                required
            />
            <div className='d-flex mt-4 gender-select'>
                <span className='mr-2'>Gender:</span>
                <RadioButton id='male' name='gender' label='Male' value={'false'} isSelected={data?.gender === 'false'} onChange={(e) => setData({ ...data, gender: e.target.value})} />
                <RadioButton id='female' name='gender' label='Female' value={'true'} isSelected={data?.gender === 'true'} onChange={(e) =>  setData({ ...data, gender: e.target.value})} />
            </div>
        </motion.div>
    );
}