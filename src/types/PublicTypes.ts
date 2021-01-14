import { ComponentType } from 'react'

export interface RowType {
    id: string,
    childList?: Array<string>,
    parent?: string,
    class?: ((tableData: TableDataType, rowData: RowType) => string) | string,
    style?: ((tableData: TableDataType, rowData: RowType) => Record<string, string>) | Record<string, string>,
    data: Record<string, CellType | undefined>,
    props?: Record<string, any>
}

export interface CellType extends Record<string, unknown> {
    value?: any,
    funcRenderer?: (tableData: TableDataType, rowData: RowType, columnId: string) => JSX.Element | null,
    renderer?: ComponentType<RendererProps>,
    class?: ((tableData: TableDataType, rowData: RowType, columnId: string) => string) | string,
    style?: ((tableData: TableDataType, rowData: RowType, columnId: string) => Record<string, string>) | Record<string, string>,
    props?: Record<string, any>
}
export interface ColumnType {
    field: string,
    title: string,
    funcRenderer?: (tableData: TableDataType, columnInfo: ColumnType) => JSX.Element | null,
    renderer?: ComponentType<HeaderRendererProps>,
    class?: ((tableData: TableDataType, columnInfo: ColumnType) => string) | string,
    style?: ((tableData: TableDataType, columnInfo: ColumnType) => Record<string, string>) | Record<string, string>,
    grouped?: boolean,
    props?: Record<string, any>
}

export interface TableDataType {
    columns: Array<ColumnType>,
    rows: Array<RowType>,
    entryPoints?: Array<string>,
    defaultCellStyle?: ((tableData: TableDataType, rowData: RowType, columnId: string) => Record<string, string>) | Record<string, string>,
    style?: ((tableData: TableDataType) => Record<string, string>) | Record<string, string>,
    class?: ((tableData: TableDataType) => string) | string,
    props?: Record<string, any>
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
