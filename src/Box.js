import styled from 'styled-components'
import { fluid, flui } from './lib'

export const Box = styled.div`
    position: relative;
    height: 200px;
    background: rgba(0,0,0,0.2);
    ${props => flui(props.fluid, props)};
`