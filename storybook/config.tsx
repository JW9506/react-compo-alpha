import { configure, addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import React from 'react'

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
}

const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    <h3>Component Display</h3>
    {stroyFn()}
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
