import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {
  render,
  RenderResult,
  fireEvent,
  createEvent,
  waitFor,
} from '@testing-library/react'
import axios from 'axios'
import { UploadProps, Upload } from './upload'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
}

const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })

let wrapper: RenderResult,
  fileInput: HTMLInputElement | null,
  uploadArea: HTMLElement | null
describe('Test Upload Component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    uploadArea = wrapper.queryByText('Click to upload')
    fileInput = wrapper.container.querySelector('.Upload input')
  })
  it('should render', () => {
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).toBeInTheDocument()
  })
  it('should pass upload process', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'ok' })
    fireEvent.change(fileInput!, { target: { files: [testFile] } })
    await waitFor(() =>
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    )
    expect(testProps.onSuccess).toHaveBeenCalled()
    expect(testProps.onChange).toHaveBeenCalled()
  })
  it('should drag and drop', async () => {
    fireEvent.dragOver(uploadArea!)
    expect(uploadArea).toHaveAttribute('data-isdrag', 'true')
    fireEvent.dragLeave(uploadArea!)
    expect(uploadArea).toHaveAttribute('data-isdrag', 'false')
    const mockDropEvent = createEvent.drop(uploadArea!)
    Object.defineProperty(mockDropEvent, 'dataTransfer', {
      value: {
        files: [testFile],
      },
    })
    fireEvent(uploadArea!, mockDropEvent)

    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalled()
  })
})
