import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>Hello world</h1>
        <p>This is a React component demo</p>
        <h3>to get started</h3>
        <code>yarn add react-compo-alpha</code>
      </>
    )
  },
  { info: { disable: true } }
)
