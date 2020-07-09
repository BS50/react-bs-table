import * as React from 'react'
import styles from './styles.module.css'
import Table from './table/Table'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
    return <div className={styles.test}>Example Component: {text}</div>
}

export * from './types/PublicTypes'
export { Table }
