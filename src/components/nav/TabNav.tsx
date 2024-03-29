import { ReactNode, useState } from 'react'

type Props = {
  tabs: {
    tab: string
    component: ReactNode
  }[]
}

export default function TabNav({ tabs }: Props) {
  const [currentTab, setCurrentTab] = useState(tabs.length ? tabs[0].tab : '')

  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 my-5">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map(_ => (
            <li className="me-2" key={_.tab}>
              <a
                onClick={() => {
                  setCurrentTab(_.tab)
                }}
                className={`inline-block p-4 border-b-2 rounded-t-lg cursor-pointer ${
                  currentTab === _.tab
                    ? 'border-primary text-primary active'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                }`}
              >
                {_.tab}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {tabs.find(_ => _.tab === currentTab)?.component}
    </>
  )
}
