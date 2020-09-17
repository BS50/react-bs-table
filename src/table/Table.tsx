import React, {Component} from 'react'
import HeaderRow from './HeaderRow'
import Row from './Row'
import {getTableStyle, getTableClass} from './Style'
import styles from './Table.css'
import {RowType, TableDataType} from '../types/PublicTypes'
import {ServiceRowType, ServiceTableDataType} from '../types/PrivateTypes'
import { v4 as uuidv4 } from 'uuid'

interface TableProps {
    tableData: TableDataType
}

interface State {
    prevStateId: string,
    stateId: string,
    serviceTableData: ServiceTableDataType
}

class Table extends Component<TableProps> {
    state: State
    constructor(props: TableProps) {
        super(props)
        const stateId: string = uuidv4()
        this.state = {
            prevStateId: stateId,
            stateId: stateId,
            serviceTableData: {
                tableData: props.tableData,
                columns: props.tableData.columns,
                rows: {},
                entryPoints: []
            }
        }
    }

    static getDerivedStateFromProps(nextProps: TableProps, nextState: State) {
        if (nextState.prevStateId !== nextState.stateId) {
            nextState.prevStateId = nextState.stateId
            return nextState
        }
        if (nextProps.tableData.rows !== undefined) {
            const serviceTableData: ServiceTableDataType = {
                tableData: nextProps.tableData,
                columns: nextProps.tableData.columns,
                rows: {},
                entryPoints: []
            }
            nextProps.tableData.rows.map((rowInfo) => {
                serviceTableData.rows[rowInfo.id] = {
                    level: -1,
                    data: rowInfo
                }
            })
            const idList = Object.keys(serviceTableData.rows).sort((a, b) => {
                return (parseInt(a) >= parseInt(b)) ? 1 : -1
            })
            idList.map((id) => {
                const rowDataInfo = serviceTableData.rows[id]

                const parentId = rowDataInfo.data.parent
                if (parentId !== undefined) {
                    const childList = serviceTableData.rows[parentId].data.childList
                    if (childList === undefined) {
                        serviceTableData.rows[parentId].data.childList = [id]
                    } else {
                        childList.push(id)
                    }
                }
                if (rowDataInfo.data.childList !== undefined) {
                    rowDataInfo.data.childList.map((childId: string) => {
                        serviceTableData.rows[childId].data.parent = id
                    })
                }
            })

            serviceTableData.entryPoints = nextProps.tableData.rows.filter((rowData) => {
                return rowData.parent === undefined
            }).map((rowData: RowType) => {
                return rowData.id
            })

            serviceTableData.entryPoints.map((id: string) => {
                const rowDataInfo = serviceTableData.rows[id]
                Table.updateLevel(serviceTableData, rowDataInfo, 0)
            })

            nextState.serviceTableData = serviceTableData
        }
        return nextState
    }

    static updateLevel(serviceTableData: ServiceTableDataType, rowDataInfo: ServiceRowType, level: number) {
        rowDataInfo.level = level
        const rowData = rowDataInfo.data
        if (rowData.childList !== undefined) {
            rowData.childList.map((childRowId: string) => {
                const childRowDataInfo = serviceTableData.rows[childRowId]
                if (childRowDataInfo.level === -1) {
                    Table.updateLevel(serviceTableData, childRowDataInfo, level + 1)
                }
            })
        }
    }

    triggerRow = (rowId: string) => {
        if (this.state.serviceTableData.rows[rowId].collapsed) {
            this.state.serviceTableData.rows[rowId].collapsed = undefined
        } else {
            this.state.serviceTableData.rows[rowId].collapsed = true
        }
        this.state.stateId = uuidv4()
        this.setState(this.state)
    }

    render() {
        if (this.state.serviceTableData.rows !== undefined) {
            const tbody = this.state.serviceTableData.entryPoints.map((id) => {
                const rowDataInfo = this.state.serviceTableData.rows[id]
                return (
                    <Row
                        key={rowDataInfo.data.id}
                        rowDataInfo={rowDataInfo}
                        serviceTableData={this.state.serviceTableData}
                        triggerRow={this.triggerRow}
                    />
                )
            })
            return (
                <div className={styles.tableContainer}>
                    <table
                        style={getTableStyle(this.state.serviceTableData.tableData.style, this.props.tableData)}
                        className={getTableClass(this.state.serviceTableData.tableData.class, this.props.tableData)}
                    >
                        <HeaderRow
                            serviceTableData={this.state.serviceTableData}
                        />
                        <tbody>
                            {tbody}
                        </tbody>
                    </table>
                </div>
            )
        }

        return <></>
    }
}

export default Table
