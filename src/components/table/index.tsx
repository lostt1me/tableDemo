import React from 'react';
import { useState } from 'react';
import { EditableCell, Column, Table, Utils } from '@blueprintjs/table';
import './style.scss';



interface IDataRow {
    [key: string]: number | string
};
const data = require("./data.json") as IDataRow[];
export const DemoTable = () => {
    const [columnName, setColumnName] = useState(Object.keys(data[0]));
    const [cellValue, setCellValue] = useState(data);
    const cellSetter = (row: number, key: string) => {
        return (value: string) => {
            let updateCellValue = cellValue;
            updateCellValue[row][key] = value;
            setCellValue(updateCellValue);
        }
    };
    const renderCell = (key: string) => {
        return (row: number) => <EditableCell value={String(cellValue[row][key])} onChange={cellSetter(row, key)}/>;
    };
    const handleColumnsReorder = (oldIndex: number, newIndex:number, length: number) => {
        if(oldIndex === newIndex) {
            return;
        }
        const newColumnNames = Utils.reorderArray(columnName, oldIndex, newIndex, length);
        setColumnName(newColumnNames);        
    };
    const columns = columnName.map((columnName: string, index: number) => {
        return (
            <Column key={index} name={columnName} cellRenderer={renderCell(columnName)}/>
        )
    });
    return (
        <Table numRows={cellValue.length} enableColumnReordering={true} onColumnsReordered={handleColumnsReorder}>
            {columns}
        </Table>
    )
}