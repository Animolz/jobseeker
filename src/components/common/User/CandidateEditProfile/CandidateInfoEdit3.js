import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MaterialTable from "material-table";


const skilsCols = [
    {
        title: 'Skills',
        field: 'name',
    },
    {
        title: 'Level',
        field: 'level',
    }
]

export const CandidateInfoEdit3 = ({ data, setData }) => {
    useEffect(() => {
        console.log(data?.skillRequests)
    }, [data?.skillRequests]);

    return (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className='text-center w-100 h1 mb-3'><strong>Candidate Info</strong></div>
            <div>
                <div className="border">
                    <MaterialTable 
                        columns={skilsCols}
                        data={data?.skillRequests}
                        title={<p className="m-0 h4"><b>Personal Skills</b></p>}
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
                                const updatedRows = [...data?.skillRequests, {...newRow}];
                                setTimeout(() => {
                                    setData({ ...data, skillRequests:updatedRows });
                                    resolve();
                                }, 1500);
                            }), 
                            onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                                const index = selectedRow?.tableData.id;
                                const updatedRows = [...data?.skillRequests];
                                updatedRows.splice(index, 1);
                                setTimeout(() => {
                                    setData({ ...data, skillRequests: updatedRows });
                                    resolve();
                                }, 1500);
                            }),
                            onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
                                const index = oldRow.tableData.id;
                                const updatedRows = [...data?.skillRequests];
                                updatedRows[index] = updatedRow;
                                setTimeout(() => {
                                    setData({ ...data, skillRequests: updatedRows });
                                    resolve();
                                }, 1500);
                            }),
                        }}
                    />
                </div>
                <button className="btn btn-success px-5 text-light mt-4"><b>Submit</b></button>
            </div>
        </motion.div>
    );
}