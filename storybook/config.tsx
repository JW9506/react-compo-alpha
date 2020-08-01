import { configure, addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import React from 'react'

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
}

const storyWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3 style={{ borderBottom: '1px solid #BDBDBD', paddingBottom: '0.5rem' }}>
      Component Display
    </h3>
    {storyFn()}
  </div>
)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({ info: { inline: true, header: false } })
const loaderFn = () => {
  const allExports: any[] = []
  const req = require.context('../src/components', true, /\.stories\.tsx$/)
  req.keys().forEach((fname) => allExports.push(req(fname)))
  return allExports
}

configure(loaderFn, module)
