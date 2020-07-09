import React, { Component } from 'react'

import HeaderCell from './HeaderCell'
import { ColumnType } from '../types/PublicTypes'
import { ServiceTableDataType } from '../types/PrivateTypes'

interface HeaderRowProps {
    serviceTableData: ServiceTableDataType
}

class HeaderRow extends Component<HeaderRowProps> {
    render() {
        const columns = this.props.serviceTableData.columns
        if (columns !== undefined) {
            const headers = columns.map((columnInfo:ColumnType) => {
                return (
                    <HeaderCell
                        key={columnInfo.field}
                        serviceTableData={this.props.serviceTableData}
                        columnInfo={columnInfo}
                    />
                )
            })
            return (
                <thead>
                    <tr>
                        {headers}
                    </tr>
                </thead>
            )
        }

        return <></>
    }
}

export default HeaderRow
