import { React, ComponentType } from 'react'

export interface RowType {
    id: string,
    childList?: Array<string>,
    class?: ((tableData: TableDataType, rowData: RowType) => string) | string,
    style?: ((tableData: TableDataType, rowData: RowType) => { [key: string]: string }) | { [key: string]: string },
    data: {
        [key: string]: CellType | undefined
    },
    [key: string]: any
}

export interface CellType {
    value?: any,
    funcRenderer?: ComponentType<RendererProps>,
    renderer?: (tableData: TableDataType, rowData: RowType, columnId: string) => React.ReactElement,
    class?: ((tableData: TableDataType, rowData: RowType, columnId: string) => string) | string,
    style?: ((tableData: TableDataType, rowData: RowType, columnId: string) => { [key: string]: string }) | { [key: string]: string },
}
export interface ColumnType {
    field: string,
    title: string,
    funcRenderer?: (tableData: TableDataType, columnInfo: ColumnType) => React.ReactElement,
    renderer?: ComponentType<HeaderRendererProps>,
    class?: ((tableData: TableDataType, columnInfo: ColumnType) => string) | string,
    style?: ((tableData: TableDataType, columnInfo: ColumnType) => { [key: string]: string }) | { [key: string]: string },
    grouped?: boolean,
    [key: string]: any
}

export interface TableDataType {
    columns: Array<ColumnType>,
    rows: Array<RowType>,
    entryPoints?: Array<string>,
    defaultCellStyle?: ((tableData: TableDataType, rowData: RowType, columnId: string) => { [key: string]: string }) | { [key: string]: string },
    style?: ((tableData: TableDataType) => { [key: string]: string }) | { [key: string]: string },
    class?: ((tableData: TableDataType) => string) | string,
    [key: string]: any
}

export interface HeaderRendererProps {
    tableData: TableDataType,
    columnInfo: ColumnType
}

export interface RendererProps {
    tableData: TableDataType,
    rowData: RowType,
    columnId: string
}
