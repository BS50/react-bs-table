import { ColumnType, RowType, TableDataType } from './PublicTypes'

export interface ServiceRowType {
    level: number,
    serviceChildList?: Array<string>,
    serviceParent?: string,
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
