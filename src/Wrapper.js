import styled, { css } from 'styled-components'
import { config, media } from './lib'
import React from 'react'

const mediaProps = Object.keys(config.breakpoints).reduce((accumulator, label) => {
    const emSize = config.breakpoints[label].width / 16
    accumulator += 
    //  Media query styles.
    `
        @media (max-width: ${emSize}em) {
            max-width: ${config.breakpoints[label].max_width};
            grid-gap: ${config.breakpoints[label].gutter / 16}em;
            background: ${config.breakpoints[label].color};
        }
    `
    return accumulator
}, 
    //  Default styles.
    `
        max-width: 85%;
        grid-gap: ${config.def.gutter / 16}em;
        background: ${config.def.color};
    `
)

export const Wrapper = styled.div`
    width: ${config.max_width};
    grid-template-columns: repeat(${config.columns}, 1fr);
    display: grid;
    margin: 0 auto;
    ${mediaProps}
`
