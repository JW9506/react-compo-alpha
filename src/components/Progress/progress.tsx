import React from 'react'
import styled from 'styled-components'
import _styles from './progress.module.css'

export interface ProgressProps {
  percent: number
  strokeHeight?: number
  showText?: boolean
  styles?: React.CSSProperties
  theme?: 'primary' | 'secondary'
}

const bgPrimary = '#4DB6AC'
const bgSecondary = '#2196F3'
const primary = '#E0E0E0'
const secondary = '#C8E6C9'

const Outer = styled.div<{ strokeHeight: ProgressProps['strokeHeight'] }>`
  position: relative;
  height: ${(props) => props.strokeHeight + 'px'};
  border-radius: 1rem;
  background-color: #b2dfdb;
  width: 100%;
`

const Inner = styled.div<{ theme: ProgressProps['theme']; percent: number }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding-right: 0.5rem;
  border-radius: 1rem;
  position: absolute;
  color: ${(props) =>
    props.theme === 'primary'
      ? primary
      : props.theme === 'secondary'
      ? secondary
      : primary};
  background-color: ${(props) =>
    props.theme === 'primary'
      ? bgPrimary
      : props.theme === 'secondary'
      ? bgSecondary
      : bgPrimary};
  width: ${(props) => props.percent + '%'};
`

const Progress: React.FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props
  return (
    <div className="Progress" style={styles}>
      <Outer strokeHeight={strokeHeight}>
        <Inner theme={theme} percent={percent}>
          {showText && (
            <span className={_styles.innerText}>{`${percent}%`}</span>
          )}
        </Inner>
      </Outer>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
}

export default Progress
