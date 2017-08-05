import { css, injectGlobal } from 'styled-components'

injectGlobal`
    body {
        margin: 0;
    }
`

export const config = {
    columns: 12,
    max_width: '1152px',
    breakpoints: {
        lg: { width: 1260, gutter: 32, max_width: '85%',  color: '#FD7988' },
        md: { width: 960,  gutter: 28, max_width: '85%',  color: '#F6AB99' },
        sm: { width: 720,  gutter: 16, max_width: '100%', color: '#F1DDAE' },
        // xs: { width: 376,  gutter: 16 },
    },
    def: { width: 1260, gutter: 40, max_width: '85%',  color: '#8F75D5' }
}

// iterate through the sizes and create a media template
export const media = Object.keys(config.breakpoints).reduce((accumulator, label) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize = config.breakpoints[label].width / 16
    accumulator[label] = (...args) => css`
        @media (max-width: ${emSize}em) {
            ${css(...args)}
        }
    `
    return accumulator
}, {})



export const fluid = ( arr, props ) => arr.reduce((acc, item, index) => {
    const breakpoints = config.breakpoints
    let styles = ''
    let grid = ''
    // if an array is provided, shift the column by the first argument
    if (Array.isArray(item)) styles = `grid-column: ${arr[index][1]} / span ${arr[index][0]};`
    else styles = `grid-column: span ${arr[index]};`

    return acc + `@media (max-width: ${breakpoints[Object.keys(breakpoints)[index]].width / 16}em) {
        ${styles}
        ${props.grid ? `display: grid;
            grid-template-columns: repeat(${Array.isArray(item) ? arr[index][0] : arr[index] }, 1fr);
            grid-column-gap: ${breakpoints[Object.keys(breakpoints)[index]].gap}px;
            ` : ``
            }
        }`
}, `grid-column: span 12;
    align-self: start;
    ${props.grid && `
        display: grid;
        grid-template-columns: repeat(${config.columns}, 1fr);
        grid-column-gap: 16px;
        `
    }`
)

export const flui = (arr, props) => {
    console.log(props.translate)

    let val = `
        grid-column: span ${arr[0]};
        ${props.translate && `
            grid-column: ${props.translate[0]} / span ${arr[0]};
        `}
        ${props.grid && `
            display: grid;
            grid-template-columns: repeat(${arr[0]}, 1fr);
            grid-column-gap: ${config.def.gutter}px;
        `}
    `
    
    Object.keys(config.breakpoints).map((value, index) => {
        if (arr[index + 1]) {
            val += `
                @media (max-width: ${config.breakpoints[value].width / 16}em) {
                    grid-column: span ${arr[index + 1]};
                    ${props.translate && `
                        grid-column: ${props.translate[index + 1]} / span ${arr[index + 1]};
                    `}
                    ${props.grid && `
                        display: grid;
                        grid-template-columns: repeat(${arr[0 + 1]}, 1fr);
                        grid-column-gap: ${config.breakpoints[value].gutter / 16}em;
                    `}
                }
            `
        } else {
            val += `
                @media (max-width: ${config.breakpoints[value].width / 16}em) {
                    grid-column: span ${config.columns};
                }
            `
        }
    })
    return val
}

const mediaProps = Object.keys(config.breakpoints).reduce((accumulator, label) => {
    const emSize = config.breakpoints[label].width / 16
    accumulator += 
    //  Media query styles.
    `
        @media (max-width: ${emSize}em) {
            max-width: ${config.breakpoints[label].max_width};
            grid-gap: ${config.breakpoints[label].gutter}px;
            background: ${config.breakpoints[label].color};
        }
    `
    return accumulator
}, 
    //  Default styles.
    `
        max-width: 85%;
        grid-gap: ${config.def.gutter}px;
        background: ${config.def.color};
    `
)
