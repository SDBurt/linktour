import React, { PropsWithChildren } from 'react'

const MainLayout: React.FC = ({children}: PropsWithChildren) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default MainLayout