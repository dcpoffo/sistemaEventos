import React, { useCallback, useEffect, useState } from 'react'
import { useAPI } from '../../service/API';
import { useTranslation } from 'react-i18next';

type Field = {
  acessor: string,
  label: string,
  type: string,
}

type Action = {
  action(item: any): Promise<boolean>,
  label: string
  icon: JSX.Element
}

type TableDataProps = {
  url: string,
  fields: Field[],
  filters: any,
  actions: Action[]
}

function TableData({ url, fields, filters, actions }: TableDataProps) {
  const [data, setData] = useState<any[]>([])
  const api = useAPI();
  const { t } = useTranslation()

  const reload = useCallback(() => {
    api.get(url, filters).then((res) => {
      setData(res.data)
    })
  }, [url, filters])

  useEffect(() => {
    reload()
  }, [url, filters, reload]);

  const getFieldValue = (field: Field, data: any): any => {
    switch (field.type) {
      case 'date':
        return new Date(data[field.acessor]).toLocaleDateString()
      case 'boolean':
        if (data[field.acessor]) {
          return 'Sim'
        } else {
          return 'Não'
        }
      default:
        return data[field.acessor]
    }
  }

  const doAction = (action: (data: any) => Promise<boolean>, d: any) => {
    action(d).then((res) => (res ? reload() : null))
  }

  return (
    <div className={'d-flex'}>
      <table className={'table table-bordered table-flex'}>
        <thead>
          <tr>
            {fields.map((f) => {
              return <th key={f.acessor}>{t(f.label)}</th>
            })}
            {actions.length > 0 && <th>{t('actions.title')}</th>}
          </tr>
        </thead>
        <thead>
          {data.map((d, i) => {
            return (
              <tr key={i}>
                {fields.map((f) => {
                  return <td key={f.acessor}>{getFieldValue(f, d)}</td>
                })}
                {actions.length > 0 &&
                  actions.map((a) => {
                    return (
                      <div key={a.label} className={'d-flex'}>
                        <button onClick={() => doAction(a.action, d)} className={'btn btn-sm'}>
                          {a.icon}
                        </button>
                      </div>
                    )
                  })}
              </tr>
            )
          })}
        </thead>
      </table>
    </div>
  )
}

export default TableData
