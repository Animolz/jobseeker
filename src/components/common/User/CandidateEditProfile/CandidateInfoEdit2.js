import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MaterialTable from "material-table";
import FormatDate from "utils/FormatDate";

const workExpCols = [
    {
        title: 'Content',
        field: 'content',
    },
    {
        title: 'Position',
        field: 'position',
    },
    {
        title: 'From',
        field: 'fromDate',
        type: 'date',
        render: rowData => FormatDate.fFullDate(rowData?.fromDate)
    },
    {
        title: 'To',
        field: 'toDate',
        type: 'date',
        render: rowData => FormatDate.fFullDate(rowData?.toDate)
    }
]

export const CandidateInfoEdit2 = ({ data, setData }) => {
    useEffect(() => {
    }, [data?.workExperienceRequests]);

    return (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className='text-center w-100 h1 mb-3'><strong>Candidate Info</strong></div>
            <div>
                <div className="border">
                    <MaterialTable 
                        columns={workExpCols}
                        data={data?.workExperienceRequests}
                        title={<p className="m-0 h4"><b>Work Experiences</b></p>}
                        options={{
                            minBodyHeight: '29rem',
                            maxBodyHeight: '29rem',
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
                                const updatedRows = [...data?.workExperienceRequests, {...newRow}];
                                setTimeout(() => {
                                    setData({ ...data, workExperienceRequests: updatedRows });
                                    resolve();
                                }, 1500);
                            }), 
                            onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                                const index = selectedRow?.tableData.id;
                                const updatedRows = [...data?.workExperienceRequests];
                                updatedRows.splice(index, 1);
                                setTimeout(() => {
                                    setData({ ...data, workExperienceRequests: updatedRows });
                                    resolve();
                                }, 1500);
                            }),
                            onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
                                const index = oldRow.tableData.id;
                                const updatedRows = [...data?.workExperienceRequests];
                                updatedRows[index] = updatedRow;
                                setTimeout(() => {
                                    setData({ ...data, workExperienceRequests: updatedRows });
                                    resolve();
                                }, 1500);
                            }),
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}