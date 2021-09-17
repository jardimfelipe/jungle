import { CSSProperties } from "react"
import styled from "styled-components"

export interface IBoxProps {
  params: CSSProperties
}

export const Box = styled.div`
  ${({ params }: IBoxProps) =>
    Object.keys(params).reduce((curr: string, key: string) => {
      curr += `${key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}: ${
        params[key as keyof typeof params]
      };`
      return curr
    }, "")}
`
