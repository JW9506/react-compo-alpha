import React, { useState } from 'react'
import styled from 'styled-components'

interface DraggerProps {
  onFile: (files: FileList) => void
}

const DraggerWrapper = styled.div<{ dragOver: boolean }>`
  box-sizing: border-box;
  display: flex;
  border: 1px dashed #bdbdbd;
  padding: 2rem 10rem;
  color: #424242;
  height: 8rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;

  background-color: ${(props) => (props.dragOver ? '#e0e0e0' : 'inherit')};
  color: ${(props) => (props.dragOver ? '#000' : 'inherit')};
  cursor: ${(props) => (props.dragOver ? 'pointer' : 'inherit')};
  border-color: ${(props) => (props.dragOver ? '#1976d2' : 'inherit')};

  &:hover {
    background-color: #e0e0e0;
    color: #000;
    border-color: #1976d2;
    cursor: pointer;
  }
`

const Dragger: React.FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  const [dragOver, setDragOver] = useState(false)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }
  const handleDrag = (e: React.DragEvent, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }

  return (
    <DraggerWrapper
      data-isdrag={dragOver}
      dragOver={dragOver}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </DraggerWrapper>
  )
}

export default Dragger
