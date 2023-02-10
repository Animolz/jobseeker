import Textbox from "components/form/Textbox";
import React, { useEffect } from "react";
import DatePicker from "react-date-picker";
import { motion } from "framer-motion";
import FormatDate from "utils/FormatDate";
import MaterialTable from "material-table";

const requirementsCols = [
    {
        title: 'Requirement',
        field: 'content'
    }
]

export const CompanyJobEdit3 = ({ data, setData }) => {
    const validation = () => {
        if(
            data?.requirements.length === 0
        ) {
            document.getElementById('edit-job__submit-btn').disabled = true;
        }
        else{
            document.getElementById('edit-job__submit-btn').disabled = false;
        }
    }

    useEffect(() => {
        validation();
    }, [data]);

    return (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className='text-center w-100 h1'><strong>Job Information</strong></div> 
                <div>
                    <div className="border">
                        <MaterialTable 
                            columns={requirementsCols}
                            data={data?.requirements}
                            title={<p className="m-0 h4"><b>Requirements</b></p>}
                            options={{
                                minBodyHeight: '25rem',
                                maxBodyHeight: '25rem',
                                headerStyle: {
                                    backgroundColor: '#525252',
                                    color: '#fff',
                                    fontSize: '1.0rem',
                                    fontWeight: 'bold',
                                },
                                search: false,
                                paging: false,
                                actionsColumnIndex: -1, addRowPosition: 'first'
                            }}
                            editable={{
                                onRowAdd: (newRow) => new Promise((resolve, reject) => {
                                    const updatedRows = [...data?.requirements, {...newRow}];
                                    setTimeout(() => {
                                        setData({ ...data, requirements:updatedRows });
                                        resolve();
                                    }, 1500);
                                }), 
                                onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                                    const index = selectedRow?.tableData.id;
                                    const updatedRows = [...data?.requirements];
                                    updatedRows.splice(index, 1);
                                    setTimeout(() => {
                                        setData({ ...data, requirements: updatedRows });
                                        resolve();
                                    }, 1500);
                                }),
                                onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
                                    const index = oldRow.tableData.id;
                                    const updatedRows = [...data?.requirements];
                                    updatedRows[index] = updatedRow;
                                    setTimeout(() => {
                                        setData({ ...data, requirements: updatedRows });
                                        resolve();
                                    }, 1500);
                                }),
                            }}
                        />
                    </div>
                    <button className="btn btn-success px-5 text-light mt-4" id='edit-job__submit-btn'><b>Submit</b></button>
                </div>
        </motion.div>
    );
}