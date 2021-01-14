import React, {Component} from 'react';
import {ColumnType, RowType, TableDataType} from "../../src";
import { v4 as uuidv4 } from 'uuid'
import {Input} from "antd";
import { Table } from 'react-bs-table'

interface State {
    rows: Array<RowType>
}

class TooMuchRows extends Component {

    state: State = {
        rows: []
    }

    componentDidMount() {
        this.setState({ rows: this.getRows()})
    }

    columns: Array<ColumnType> = [
        {
            field: 'disabled-input',
            title: 'Disabled',
        },
        {
            field: 'enabled-input',
            title: 'Enabled to write',
        }
    ]

    renderEnabledCell = (_tableData: TableDataType, rowData: RowType, columnId: string) => {
        let value = rowData.data[columnId]?.value
        return <Input
            key={`input-${uuidv4()}`}
            value={value}
            onChange={(e) => {
                e.persist()
                this.setState((prevState: State) => ({
                    rows: prevState.rows.map((row) => {
                        return row.id === rowData.id ? {
                            ...row,
                            data:{
                                ...row.data,
                                'disabled-input':{
                                    ...row?.data['disabled-input'],
                                    value: e.target.value
                                }
                            }
                        } : row
                    })
                }))
            }}
        />
    }

    renderDisabledCell = (_tableData: TableDataType, rowData: RowType, columnId: string) => {
        let value = rowData.data[columnId]?.value
        return <Input
            key={`input-${uuidv4()}`}
            value={value}
            disabled={!value}
        />
    }

    getRows = () => {
        const rowArray = []
        let i
        for (i = 0; i < 1000; i++) {
            rowArray.push({
                id: uuidv4(),
                data: {
                    'disabled-input': {funcRenderer: this.renderDisabledCell},
                    'enabled-input': {funcRenderer: this.renderEnabledCell}
                }
            })
        }
        return rowArray
    }

    render() {
        const tableData: TableDataType = {
            columns: this.columns,
            rows: this.state.rows
        }

        return (
            <Table tableData={tableData}/>
        );
    }
}

export default TooMuchRows;
