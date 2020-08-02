import React, { useCallback, useRef, useState } from 'react'
import Axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'

export interface UploadFile {
  uid: string
  size: number
  name: string
  raw?: File
  status?: UploadFileStatus
  percent?: number
  response?: any
  error?: any
}

export interface UploadProps {
  action: string
  defaultFileList?: UploadFile[]
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: UploadFile) => void
  onSuccess?: (data: any, file: UploadFile) => void
  onError?: (err: any, file: UploadFile) => void
  onChange?: (file: UploadFile) => void
  onRemove?: (file: UploadFile) => void
  headers?: Record<string, any>
  name?: string
  data?: Record<string, any>
  withCredentials?: boolean
  accept?: string
  multiple?: boolean
  drag?: boolean
}

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

const Upload: React.FC<UploadProps> = (props) => {
  const {
    children,
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    defaultFileList,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
  } = props
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const fileInput = useRef<HTMLInputElement | null>(null)

  const updateFileList = useCallback(
    (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
      setFileList((prevList) => {
        return prevList.map((file) => {
          if (file.uid === updateFile.uid) {
            return { ...file, ...updateObj }
          }
          return file
        })
      })
    },
    []
  )

  const handleClick = useCallback(() => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }, [])

  const post = useCallback((file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    setFileList((prevList) => [_file, ...prevList])
    const formData = new FormData()
    formData.append(name ?? 'file', file)
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }
    !(async () => {
      try {
        const resp = await Axios.post(action, formData, {
          headers: { ...headers, 'Content-Type': 'multipart/form-data' },
          withCredentials,
          onUploadProgress: (e: ProgressEvent) => {
            const percentage = Math.round((e.loaded * 100) / e.total)
            if (percentage < 100) {
              updateFileList(_file, {
                percent: percentage,
                status: 'uploading',
              })
              if (onProgress) {
                onProgress(percentage, _file)
              }
            }
          },
        })
        if (onSuccess) {
          updateFileList(_file, { status: 'success', response: resp.data })
          onSuccess(resp.data, _file)
        }
        if (onChange) {
          onChange(_file)
        }
      } catch (error) {
        console.error(error)
        updateFileList(_file, { status: 'error', error })
        if (onError) {
          onError(error, _file)
        }
      }
    })()
  }, [])

  const uploadFiles = useCallback((files: FileList) => {
    const postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile)
          })
        } else if (result) {
          post(file)
        }
      }
    })
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files?.length) {
        return
      }
      uploadFiles(files)
      if (fileInput.current) {
        fileInput.current.value = ''
      }
    },
    []
  )

  const handleRemove = useCallback((file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }, [])

  return (
    <div className="Upload">
      <div onClick={handleClick} style={{ display: 'inline-block' }}>
        {drag ? (
          <Dragger
            onFile={(files: FileList) => {
              uploadFiles(files)
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          style={{ display: 'none' }}
          type="file"
          accept={accept}
          multiple={multiple}
          name="file"
          onChange={handleFileChange}
          ref={fileInput}
        />
      </div>
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
        _styles={{ marginTop: '1rem' }}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file',
}

export { Upload }
