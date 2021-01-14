import React, { Component } from 'react'

import { Table } from 'react-bs-table'
import { v4 as uuidv4 } from 'uuid'
import {ColumnType, HeaderRendererProps, RowType, TableDataType} from "../../src";

class SimpleExamples extends Component {
    state = {
        data : this.getTreeDataWithParentId()
    }

    getTreeData() {
        return {
            columns: [
                {
                    field: 'firstname',
                    title: 'Фамилия',
                    grouped: true,
                    class: 'name-column-class'
                },
                {
                    field: 'secondname',
                    title: 'Имя',
                    class: ''
                },
                {
                    field: 'birthday',
                    title: 'Дата рождения',
                    class: 'default-column-class'
                }
            ],
            rows: [
                {
                    id: 'xxx-0',
                    data: {
                        firstname: {
                            value: 'Иванов'
                        },
                        secondname: {
                            value: 'Сергей'
                        },
                        birthday: {
                            value: '12.04.1956'
                        }
                    }
                },
                {
                    id: 'yyy-1',
                    childList: ['2', '3'],
                    data: {
                        firstname: {
                            value: 'Петров',
                            renderer: (props: any) => {
                                const rowData = props.rowData
                                const columnId = props.columnId
                                return <div style={{color: 'green'}}>
                                    {rowData.data[columnId].value}RENDER
                                </div>
                            }
                        },
                        secondname: {
                            value: 'Игорь'
                        },
                    }
                },
                {
                    id: '2',
                    data: {
                        firstname: {
                            value: 'Пушкин'
                        },
                        secondname: {
                            value: 'Савелий'
                        }
                    }
                },
                {
                    id: '3',
                    data: {
                        firstname: {
                            value: 'Барышев'
                        },
                        secondname: {
                            value: 'Михаил'
                        },
                        birthday: {
                            value: '03.09.1971'
                        }
                    }
                }
            ],
            class: 'table-class'
        }
    }

    getTreeDataWithParentId() {
        return {
            columns: [
                {
                    field: 'firstname',
                    title: 'Фамилия',
                    grouped: true,
                    class: 'name-column-class'
                },
                {
                    field: 'secondname',
                    title: 'Имя',
                    class: ''
                },
                {
                    field: 'birthday',
                    title: 'Дата рождения',
                    class: 'default-column-class'
                }
            ],
            rows: [
                {
                    id: 'xxx-0',
                    data: {
                        firstname: {
                            value: 'Иванов'
                        },
                        secondname: {
                            value: 'Сергей'
                        },
                        birthday: {
                            value: '12.04.1956'
                        }
                    }
                },
                {
                    id: "6cd00663-a901-4f0f-b7cd-f939a63ca311",
                    data: {
                        firstname: {
                            value: 'Петров',
                            renderer: (props: any) => {
                                const rowData = props.rowData
                                const columnId = props.columnId
                                return <div style={{color: 'green'}}>
                                    {rowData.data[columnId].value}RENDER
                                </div>
                            }
                        },
                        secondname: {
                            value: 'Игорь'
                        },
                    }
                },
                {
                    id: '2',
                    parent: "6cd00663-a901-4f0f-b7cd-f939a63ca311",
                    data: {
                        firstname: {
                            value: 'Пушкин'
                        },
                        secondname: {
                            value: 'Савелий'
                        }
                    }
                },
                {
                    id: '3',
                    parent: "6cd00663-a901-4f0f-b7cd-f939a63ca311",
                    data: {
                        firstname: {
                            value: 'Барышев'
                        },
                        secondname: {
                            value: 'Михаил'
                        },
                        birthday: {
                            value: '03.09.1971'
                        }
                    }
                }
            ],
            class: 'table-class'
        }
    }

    getStyledData() {
        return {
            class: 'background-lightgray',
            columns: [
                {
                    field: 'firstname',
                    title: 'Фамилия',
                    grouped: true,
                    renderer: (props: HeaderRendererProps) => {
                        return <div>{props.columnInfo.title + ' (Last Name)'}</div>
                    },
                    class: 'background-green'
                },
                {
                    field: 'secondname',
                    title: 'Имя',
                    style: {color: 'red'},
                    class: (_tableData: TableDataType, _columnInfo: ColumnType) => {
                        return 'background-green'
                    }
                },
                {
                    field: 'birthday',
                    title: 'Дата рождения',
                    style: (_tableData: TableDataType, _columnInfo: ColumnType) => {
                        return {'color': 'pink'}
                    }
                }
            ],
            rows: [
                {
                    id: uuidv4(),
                    // class: (_tableData: TableDataType, _rowInfo: RowType) => {
                    //     return 'background-blue'
                    // },
                    style: (_tableData: TableDataType, _rowInfo: RowType) => {
                        return {'background-color': 'pink'}
                    },
                    data: {
                        firstname: {
                            style: {
                                color: 'white'
                            },
                            value: 'Иванов',
                            funcRenderer: (_tableData: TableDataType, _rowInfo: RowType, _columnId: string): JSX.Element | null => {
                                return <div>Лешка Иванов</div>
                            }
                        },
                        secondname: {
                            value: 'Сергей',
                            style: (_tableData: TableDataType, _rowInfo: RowType, _columnId: string) => {
                                return {'color': 'yellow'}
                            }
                        },
                        birthday: {
                            value: '212-323'
                        }
                    }
                },
                {
                    id: uuidv4(),
                    data: {
                        firstname: {
                            value: 'Петров'
                        },
                        secondname: {
                            value: 'Игорь'
                        },
                        birthday: {
                            value: '212-323'
                        }
                    }
                },
                {
                    id: uuidv4(),
                    data: {
                        firstname: {
                            value: 'Пушкин'
                        },
                        secondname: {
                            value: 'Савелий'
                        }
                    }
                },
                {
                    id: uuidv4(),
                    class: 'background-blue',
                    data: {
                        firstname: {
                            value: 'Барышев'
                        },
                        secondname: {
                            value: 'Михаил'
                        },
                        birthday: {
                            value: '212-323'
                        }
                    }
                }
            ]
        }
    }


    getSimpleData() {
        return {
            columns: [
                {
                    field: 'firstname',
                    title: 'Фамилия',
                    grouped: true
                },
                {
                    field: 'secondname',
                    title: 'Имя'
                },
                {
                    field: 'birthday',
                    title: 'Дата рождения'
                }
            ],
            rows: [
                {
                    id: uuidv4(),
                    data: {
                        firstname: {
                            value: 'Иванов'
                        },
                        secondname: {
                            value: 'Сергей'
                        },
                        birthday: {
                            value: '212-323'
                        }
                    }
                },
                {
                    id: uuidv4(),
                    data: {
                        firstname: {
                            value: 'Петров'
                        },
                        secondname: {
                            value: 'Игорь'
                        },
                        birthday: {
                            value: '212-323'
                        }
                    }
                },
                {
                    id: uuidv4(),
                    data: {
                        firstname: {
                            value: 'Пушкин'
                        },
                        secondname: {
                            value: 'Савелий'
                        }
                    }
                },
                {
                    id: uuidv4(),
                    data: {
                        firstname: {
                            value: 'Барышев'
                        },
                        secondname: {
                            value: 'Михаил'
                        },
                        birthday: {
                            value: '212-323'
                        }
                    }
                }
            ]
        }
    }
    render () {
        // const tableData = this.getTreeData()

        return (

            <div>
                <div onClick={() => {
                    const rowData1 = this.state.data.rows.find((rowData) => {
                        return rowData.id === '2'
                    })
                    if (rowData1 !== undefined) {
                        rowData1.id = '50'
                    }
                    const rowData2 = this.state.data.rows.find((rowData) => {
                        return rowData.id === '3'
                    })
                    if (rowData2 !== undefined) {
                        rowData2.id = '40'
                    }
                    this.setState(this.state)
                }}>Hello</div>
                {/*<Table tableData={this.getTreeData()} />*/}
                <Table tableData={this.state.data} />
                {/*<Table tableData={this.getSimpleData()} />*/}
                {/*<Table tableData={this.getStyledData()} />*/}
            </div>
        )
    }
}

export default SimpleExamples
