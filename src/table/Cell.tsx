import React, { Component } from 'react'
import { getCellClass, getCellStyle, renderCell } from './Style'
import C from './C'
import { CellType, ColumnType, RowType } from '../types/PublicTypes'
import { ServiceRowType, ServiceTableDataType } from '../types/PrivateTypes'

interface CellProps {
    serviceTableData: ServiceTableDataType,
    triggerRow: (id: string) => void,
    rowDataInfo: ServiceRowType,
    columnInfo: ColumnType
}
class Cell extends Component<CellProps> {
    getGroupButtonStyle = () => {
        return {
            backgroundColor: 'Transparent',
            backgroundRepeat: 'no-repeat',
            border: 'none'
        }
    }

    getGroupButtonIcon = () => {
        if (this.props.serviceTableData.rows[this.props.rowDataInfo.data.id].collapsed) {
            return '+'
        }
        return '-'
    }

    getGroupButton = () => {
        return (
            <button
                style={this.getGroupButtonStyle()} onClick={
                    () => this.props.triggerRow(this.props.rowDataInfo.data.id)
                }
            >
                {this.getGroupButtonIcon()}
            </button>
        )
    }

    render() {
        const columnId: string = this.props.columnInfo.field
        const rowData: RowType = this.props.rowDataInfo.data
        const cellInfo: CellType | undefined = rowData.data[columnId]
        let isCellWithGroupButton = false
        if (
            this.props.rowDataInfo.serviceChildList !== undefined &&
            this.props.rowDataInfo.serviceChildList.length > 0 &&
            this.props.columnInfo.grouped) {
            isCellWithGroupButton = true
        }
        if (cellInfo !== undefined) {
            const style = getCellStyle(
                this.props.serviceTableData.tableData.defaultCellStyle,
                cellInfo.style,
                this.props.serviceTableData.tableData,
                rowData,
                columnId)
            const className = getCellClass(
                cellInfo.class,
                this.props.serviceTableData.tableData,
                rowData,
                columnId)
            if (this.props.columnInfo.grouped === true) {
                const padding = this.props.rowDataInfo.level * C.LEVEL_PX_STEP
                style.paddingLeft = '' + padding + 'px'
            }
            if (isCellWithGroupButton) {
                return (
                    <td
                        style={style}
                        className={className}
                    >
                        {this.getGroupButton()}
                        {renderCell(cellInfo.renderer, cellInfo.funcRenderer, this.props.serviceTableData, rowData, columnId)}
                    </td>
                )
            } else {
                return (
                    <td
                        style={style}
                        className={className}
                    >
                        {renderCell(cellInfo.renderer, cellInfo.funcRenderer, this.props.serviceTableData, rowData, columnId)}
                    </td>
                )
            }
        }

        return (
            <td
                style={getCellStyle(
                    this.props.serviceTableData.tableData.defaultCellStyle,
                    undefined,
                    this.props.serviceTableData.tableData,
                    rowData,
                    columnId)}
                className={getCellClass(undefined,
                    this.props.serviceTableData.tableData,
                    rowData,
                    columnId)}
            />
        )
    }
}

export default Cell
