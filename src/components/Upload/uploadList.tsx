import React from 'react'
import styles from './uploadList.module.css'
import styled from 'styled-components'
import {
  FaFileUpload,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaTimes,
} from 'react-icons/fa'
import { UploadFile } from './upload'
import Progress from '../Progress'

interface UploadListProps {
  fileList: UploadFile[]
  onRemove?: (file: UploadFile) => void
  _styles?: React.CSSProperties
}

const green = '#81C784'
const red = '#EF5350'

const ItemStatus = styled.span<{ status: UploadFile['status'] }>`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.status === 'success'
      ? green
      : props.status === 'error'
      ? red
      : 'black'};
  padding: 0 1rem 0 0;
`

const UploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, onRemove, _styles } = props
  if (!fileList.length) return <></>
  return (
    <ul className={styles.uploadList} style={_styles}>
      {fileList.map((item) => {
        return (
          <div key={item.uid}>
            <li className={styles.fileItem}>
              <ItemStatus status={item.status}>
                <FaFileUpload style={{ marginRight: '1rem' }} />
                {item.name}
              </ItemStatus>
              <span className={styles.fileActions}>
                <span className={styles.status}>
                  {item.status === 'uploading' && (
                    <FaSpinner className={styles['fa-spin']} />
                  )}
                  {item.status === 'success' && <FaCheckCircle fill={green} />}
                  {item.status === 'error' && <FaTimesCircle fill={red} />}
                </span>
                <span className={styles.action}>
                  <FaTimes onClick={() => onRemove?.(item)} />
                </span>
              </span>
            </li>
            {item.status === 'uploading' && (
              <Progress
                percent={item.percent || 0}
                theme="secondary"
                styles={{ marginTop: '0.3rem' }}
              />
            )}
          </div>
        )
      })}
    </ul>
  )
}

export default UploadList
