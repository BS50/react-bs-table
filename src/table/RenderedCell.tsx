import React, { Component, ComponentType } from 'react'
import { RendererProps, RowType, TableDataType } from '..'
import { ServiceTableDataType } from '../types/PrivateTypes'

interface RenderedCellType {
    Renderer?: ComponentType<RendererProps>,
    funcRenderer?: ((tableData: TableDataType, rowData: RowType, columnId: string) => JSX.Element | null | null),
    tableData: ServiceTableDataType,
    rowData: RowType,
    columnId: string
}

class RenderedCell extends Component<RenderedCellType> {
    render() {
        if (this.props.Renderer) {
            return React.createElement(this.props.Renderer, { tableData: this.props.tableData.tableData, rowData: this.props.rowData, columnId: this.props.columnId })
        } else if (this.props.funcRenderer) {
            return this.props.funcRenderer(this.props.tableData.tableData, this.props.rowData, this.props.columnId)
        }
        return this.props.rowData.data[this.props.columnId]?.value
    }
}

export default RenderedCell
