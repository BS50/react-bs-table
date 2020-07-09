import React, { Component } from 'react'

import { getHeaderStyle, renderHeaderCell, getHeaderClass } from './Style'
import { ColumnType } from '../types/PublicTypes'
import { ServiceTableDataType } from '../types/PrivateTypes'

interface HeaderCellProps {
    serviceTableData: ServiceTableDataType,
    columnInfo: ColumnType
}

class HeaderCell extends Component<HeaderCellProps> {
    render() {
        if (this.props.columnInfo !== undefined) {
            return (
                <th
                    key={this.props.columnInfo.field}
                    style={getHeaderStyle(
                        this.props.columnInfo.style,
                        this.props.serviceTableData.tableData,
                        this.props.columnInfo)}
                    className={getHeaderClass(
                        this.props.columnInfo.class,
                        this.props.serviceTableData.tableData,
                        this.props.columnInfo)}
                >
                    {renderHeaderCell(
                        this.props.columnInfo.renderer,
                        this.props.columnInfo.funcRenderer,
                        this.props.serviceTableData,
                        this.props.columnInfo)}
                </th>
            )
        }

        return <></>
    }
}

export default HeaderCell
