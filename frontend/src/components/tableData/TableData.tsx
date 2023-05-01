import React, { useEffect, useState } from 'react'
import { useAPI } from '../../service/API';

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
  query: any,
  fields: Field[],
  actions: Action[]
}

function TableData({ url, query, fields, actions }: TableDataProps) {
  const api = useAPI();
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    api.get(url, query).then(res => {
      setData(res.data);
    })
  }, [url, query]);

  const handleAction = (action: Action, item: any) => {
    action.action(item).then((reload) => {
      if (reload) {
        api.get(url, query).then(res => {
          setData(res.data);
        })
      }
    })
  }

  return (
    <table className={'table table-bordered'}>
      <thead>
        <tr>
          {
            fields.map(f => {
              return (
                <th key={f.acessor}> {f.label} </th>
              )
            })
          }
          {
            actions.length > 0 && <th>Ações</th>
          }
        </tr>
      </thead>
      <tbody>
        {
          data?.map(item => {
            return (
              <tr key={item.id}>
                {
                  fields.map(f => {
                    return (
                      <td key={f.acessor}> {item[f.acessor]} </td>
                    )
                  })
                }
                {
                  actions.length > 0 && (<td>
                    {actions.map((action) => {
                      return <button onClick={() => handleAction(action, item)} key={action.label}> {action.icon} </button>
                    })}
                  </td>)}
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default TableData
