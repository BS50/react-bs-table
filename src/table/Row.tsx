import React, {Component} from 'react'

import Cell from './Cell'
import {getRowClass, getRowStyle} from './Style'
import { ColumnType } from '../types/PublicTypes'
import { ServiceRowType, ServiceTableDataType } from '../types/PrivateTypes'

interface RowProps {
    serviceTableData: ServiceTableDataType,
    rowDataInfo: ServiceRowType,
    triggerRow: (id: string) => void
}

class Row extends Component<RowProps> {
    getRow = () => {
        const rowDataInfo = this.props.rowDataInfo
        const rowData = rowDataInfo.data
        const row = this.props.serviceTableData.columns.map((columnInfo: ColumnType) => {
            return (
                <Cell
                    key={columnInfo.field}
                    serviceTableData={this.props.serviceTableData}
                    rowDataInfo={rowDataInfo}
                    columnInfo={columnInfo}
                    triggerRow={this.props.triggerRow}
                />
            )
        })
        const className = getRowClass(rowData.class, this.props.serviceTableData.tableData, rowData)
        const style = getRowStyle(rowData.style, this.props.serviceTableData.tableData, rowData)
        return (
            <tr key={rowData.id} className={className} style={style}>
                {row}
            </tr>
        )
    }

    render() {
        if (this.props.serviceTableData !== undefined) {
            const rowDataInfo = this.props.rowDataInfo
            const rowData = rowDataInfo.data
            const row = this.getRow()
            let rowList = [row]
            if (this.props.serviceTableData.rows[rowData.id].collapsed !== true && rowDataInfo.serviceChildList !== undefined) {
                rowList = rowList.concat(
                    rowDataInfo.serviceChildList.map((childRowId: string) => {
                        const childRowDataInfo = this.props.serviceTableData.rows[childRowId]
                        return (
                            <Row
                                key={childRowId}
                                rowDataInfo={childRowDataInfo}
                                serviceTableData={this.props.serviceTableData}
                                triggerRow={this.props.triggerRow}
                            />
                        )
                    })
                )
            }
            return rowList
        }

        return <></>
    }
}

export default Row
