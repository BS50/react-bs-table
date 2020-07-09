import React, { ComponentType } from 'react'
import { ColumnType, HeaderRendererProps, RendererProps, RowType, TableDataType } from '..'
import { ServiceTableDataType } from '../types/PrivateTypes'

export const getTableStyle = (
    style: ((tableData: TableDataType) => { [key: string]: string }) | { [key: string]: string } | undefined,
    tableData: TableDataType) => {
    if (style !== undefined) {
        if (style instanceof Function) {
            return style(tableData)
        } else {
            return style
        }
    }
    return {
    }
}

export const getHeaderStyle = (
    style: ((tableData: TableDataType, columnInfo: ColumnType) => { [key: string]: string }) | { [key: string]: string } | undefined,
    tableData: TableDataType,
    columnInfo: ColumnType) => {
    if (style !== undefined) {
        if (style instanceof Function) {
            return style(tableData, columnInfo)
        } else {
            return style
        }
    }
    return {
    }
}

export const getCellStyle = (
    defaultStyle: ((tableData: TableDataType, rowData: RowType, columnId: string) => { [key: string]: string }) | { [key: string]: string } | undefined,
    cellStyle: ((tableData: TableDataType, rowData: RowType, columnId: string) => { [key: string]: string }) | { [key: string]: string } | undefined,
    tableData: TableDataType,
    rowData: RowType,
    columnId: string) => {
    if (cellStyle !== undefined) {
        if (cellStyle instanceof Function) {
            return cellStyle(tableData, rowData, columnId)
        } else {
            return cellStyle
        }
    } else if (defaultStyle !== undefined) {
        if (defaultStyle instanceof Function) {
            return defaultStyle(tableData, rowData, columnId)
        } else {
            return defaultStyle
        }
    } else {
        return {
        }
    }
}

export const getRowStyle = (
    rowStyle: ((tableData: TableDataType, rowData: RowType) => { [key: string]: string }) | { [key: string]: string } | undefined,
    tableData: TableDataType,
    rowData: RowType) => {
    if (rowStyle !== undefined) {
        if (rowStyle instanceof Function) {
            return rowStyle(tableData, rowData)
        } else {
            return rowStyle
        }
    }
    return {
    }
}

export const getTableClass = (
    classFunc: ((tableData: TableDataType) => string) | string | undefined,
    tableData: TableDataType) => {
    if (classFunc !== undefined) {
        if (classFunc instanceof Function) {
            return classFunc(tableData)
        } else if (typeof classFunc === 'string') {
            return classFunc
        }
    }
    return ''
}

export const getHeaderClass = (
    classFunc: ((tableData: TableDataType, columnInfo: ColumnType) => string) | string | undefined,
    tableData: TableDataType,
    columnInfo: ColumnType) => {
    if (classFunc !== undefined) {
        if (classFunc instanceof Function) {
            return classFunc(tableData, columnInfo)
        } else if (typeof classFunc === 'string') {
            return classFunc
        }
    }
    return ''
}
export const getCellClass = (
    classFunc: ((tableData: TableDataType, rowData: RowType, columnId: string) => string) | string | undefined,
    tableData: TableDataType,
    rowData: RowType,
    columnId: string) => {
    if (classFunc !== undefined) {
        if (classFunc instanceof Function) {
            return classFunc(tableData, rowData, columnId)
        } else if (typeof classFunc === 'string') {
            return classFunc
        }
    }
    return ''
}

export const getRowClass = (
    classFunc: ((tableData: TableDataType, rowData: RowType) => string) | string | undefined,
    tableData: TableDataType,
    rowData: RowType) => {
    if (classFunc !== undefined) {
        if (classFunc instanceof Function) {
            return classFunc(tableData, rowData)
        } else {
            return classFunc
        }
    }
    return ''
}

export const renderHeaderCell = (
    Renderer: ComponentType<HeaderRendererProps> | undefined,
    funcRenderer: ComponentType<HeaderRendererProps> | undefined,
    tableData: ServiceTableDataType,
    columnInfo: ColumnType) => {
    if (Renderer) {
        return React.createElement(Renderer, { tableData: tableData.tableData, columnInfo: columnInfo })
    } else if (funcRenderer) {
        return React.createElement(funcRenderer, { tableData: tableData.tableData, columnInfo: columnInfo })
    }
    return columnInfo.title
}

export const renderCell = (
    Renderer: ComponentType<RendererProps> | undefined,
    funcRenderer: ComponentType<RendererProps> | undefined,
    tableData: ServiceTableDataType,
    rowData: RowType,
    columnId: string) => {
    if (Renderer) {
        return React.createElement(Renderer, { tableData: tableData.tableData, rowData: rowData, columnId: columnId })
    } else if (funcRenderer) {
        return React.createElement(funcRenderer, { tableData: tableData.tableData, rowData: rowData, columnId: columnId })
    }
    return rowData.data[columnId]?.value
}
