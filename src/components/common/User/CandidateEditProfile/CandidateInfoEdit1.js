import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Select from 'react-select'
import Creatable from 'react-select/creatable';
import ISO from 'data/ISO_639-1.json'

export const CandidateInfoEdit1 = ({ data, setData }) => {
    const onChangeLangs = (value) => {
        setData({ ...data, languageRequests: value })
    }

    const onChangeQualifications = (value) => {
        setData({ ...data, qualificationRequests: value });
    }

    const onChangeTalents = (value) => {
        setData({ ...data, talentRequests: value });
    }

    const onChangeYearsExp = (e) => {
        setData({ ...data, yearsExp: e.target.value });
    }

    const onChangeCv = (e) => {
    }

    return (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className='text-center w-100 h1 mb-3'><strong>Candidate Info</strong></div>
            <div>
                <label><b>Languages</b></label>
                <Select 
                    options={ISO} 
                    isMulti 
                    onChange={onChangeLangs} 
                    closeMenuOnSelect={false} 
                    placeholder='Choose Languages...' 
                    className="mb-3" 
                    defaultValue={data?.languageRequests}
                />
                <label><b>Qualifications (Certificates, Competition Prize, ...)</b></label>
                <Creatable 
                    isMulti 
                    onChange={onChangeQualifications} 
                    components={{ DropdownIndicator: null }} 
                    placeholder='Type Something...' 
                    className="mb-3"
                    defaultValue={data?.qualificationRequests}
                />
                <label><b>Talents (Art, Music, ...)</b></label>
                <Creatable 
                    isMulti 
                    onChange={onChangeTalents} 
                    components={{ DropdownIndicator: null }} 
                    placeholder='Type Something...' 
                    className="mb-3"
                    defaultValue={data?.talentRequests}
                />
                <div className="mb-3">
                    <label className="d-block"><b>Year Experience</b></label>
                    <input 
                        type='number' 
                        className="w-75 d-inline" 
                        id='other-input' 
                        onChange={onChangeYearsExp} 
                        max={100} 
                        min={0} 
                        defaultValue={data?.yearsExp}
                    />
                    <p className="d-inline ml-4 h6 text-muted"><b>Years</b></p>
                </div>
            </div>
        </motion.div>
    );
}