import { ComponentType } from 'react'

export interface RowType {
    id: string,
    childList?: Array<string>,
    class?: ((tableData: TableDataType, rowData: RowType) => string) | string,
    style?: ((tableData: TableDataType, rowData: RowType) => { [key: string]: string }) | { [key: string]: string },
    data: {
        [key: string]: CellType | undefined
    }
}

export interface CellType {
    value: any,
    funcRenderer?: ComponentType<RendererProps>,
    render?: ComponentType<RendererProps>,
    class?: ((tableData: TableDataType, rowData: RowType, columnId: string) => string) | string,
    style?: ((tableData: TableDataType, rowData: RowType, columnId: string) => { [key: string]: string }) | { [key: string]: string },
}
export interface ColumnType {
    field: string,
    title: string,
    funcRenderer?: ComponentType<HeaderRendererProps>,
    renderer?: ComponentType<HeaderRendererProps>,
    class?: ((tableData: TableDataType, columnInfo: ColumnType) => string) | string,
    style?: ((tableData: TableDataType, columnInfo: ColumnType) => { [key: string]: string }) | { [key: string]: string },
    grouped?: boolean
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
