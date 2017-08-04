import { css } from 'styled-components'

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
    ${props.grid ? `display: grid;
       grid-template-columns: repeat(12, 1fr);
       grid-column-gap: 16px;
       grid-row-gap: 8px;
       ` : ``
    }`)
