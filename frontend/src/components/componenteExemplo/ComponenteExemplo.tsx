import React from 'react'
import styles from './ComponenteExemplo.module.scss'
import { ComponenteExemploProps } from './types'

function ComponenteExemplo({ message }: ComponenteExemploProps) {
  return (
    <div className={styles.app}>
      Hello World!!
      {message}
    </div>
  )
}

export default ComponenteExemplo
