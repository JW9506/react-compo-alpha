import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'
import { FaFileUpload } from 'react-icons/fa'
import Button from '../Button'

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 200) {
    alert('File too big')
    return false
  }
  return true
}

const renameFile = (file: File) => {
  const newFile = new File([file], 'foobar__' + file.name, { type: file.type })
  return Promise.resolve(newFile)
}

const defaultFileList: UploadFile[] = [
  {
    uid: '123',
    size: 1234,
    name: 'hello.md',
    status: 'success',
    percent: 63,
  },
  {
    uid: '1234',
    size: 1234,
    name: 'xyz.md',
    status: 'error',
    percent: 89,
  },
  {
    uid: '1235',
    size: 1234,
    name: 'bar.md',
    status: 'uploading',
    percent: 33,
  },
]
storiesOf('Upload', module)
  .add('upload', () => (
    <Upload
      action="https://run.mocky.io/v3/6a72e43b-985f-4372-9697-b23e584c16b7"
      defaultFileList={defaultFileList}
      accept=".jpg"
      multiple
      // name="fileNameFoobar"
      data={{ bar: 'foo' }}
      headers={{ foo: 'bar' }}
      // beforeUpload={renameFile}
      onChange={action('changed')}
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
    >
      <Button />
    </Upload>
  ))
  .add('drag', () => (
    <Upload
      action="https://run.mocky.io/v3/6a72e43b-985f-4372-9697-b23e584c16b7"
      accept=".jpg"
      drag
      multiple
      onChange={action('changed')}
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
    >
      <FaFileUpload size="75" />
      <div>Drag file over to upload</div>
    </Upload>
  ))
