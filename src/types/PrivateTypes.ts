import { ColumnType, RowType, TableDataType } from './PublicTypes'

export interface ServiceRowType {
    level: number,
    collapsed?: boolean,
    data: RowType
}

export interface ServiceTableDataType {
    tableData: TableDataType
    columns: Array<ColumnType>,
    rows: {
        [key: string]: ServiceRowType
    },
    entryPoints: Array<string>
}
