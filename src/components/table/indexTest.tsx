import React from 'react';
import { useState } from 'react';
import { EditableCell, Column, Table, Utils, Cell } from '@blueprintjs/table';
import './style.scss';

interface IDataColumns {
    id: string;
    title: string;
    kind: string;
    group?: string;
    help?: string;
    selectValues?: Array<string>;
}
interface IDataRow {
    [key: string]: string | null | number;
}

interface IDataTable {
    columns: Array<IDataColumns>;
    values: Array<IDataRow>;
}

const dataTable = require('./dataNew.json') as IDataTable;

export const TestTable = () => {
    const [columnData, setColumnName] = useState(dataTable.columns);
    const [cellValue, setCellValue] = useState(dataTable.values);
    const cellSetter = (row: number, index: number) => {
        return (value: string) => {
            let updateCellValue = cellValue;
            updateCellValue[row][index] = value;
            setCellValue(updateCellValue);
        }
    }
    const renderCell = (index: number) => {
        let columnSearchIndex = columnData.findIndex(column => column.id === String(index));
        switch(columnData[columnSearchIndex].kind) {
            case "constant":
                return (
                    (row: number) => <Cell>{String(cellValue[row][index])}</Cell>
                );
            case "number":
                return (
                    (row: number) => <EditableCell value={String(cellValue[row][index])} onChange={cellSetter(row, index)}/>
                );
            case "select":
                return (
                    (row: number) => <EditableCell value={String(cellValue[row][index])} onChange={cellSetter(row, index)}/>
                );
            case "func":
                return (
                    (row: number) => <EditableCell value={String(cellValue[row][index])} onChange={cellSetter(row, index)}/>
                );
            default:
                return (
                (row: number) => <Cell>{String(cellValue[row][index])}</Cell>
                )
        }
    }
    const columns = columnData.map((column: IDataColumns, index: number) => {
        return (
            <Column key={column.id} name={column.title} cellRenderer={renderCell(index)} />
        )
    });
    //onColumnsReordered={handleColumnsReorder}>
    return (
        <Table numRows={cellValue.length} enableColumnReordering={true} > 
            {columns}
        </Table>
    );
};