import React from 'react'
import { Wrapper } from './Wrapper'
import { Guides } from './Guides'
import { Box } from './Box'

const Home = (props) => {
  return (
    <div>
        <Wrapper>
            <Box fluid={[4, 6, 4, 8]} translate={[5, 4, 5, 3]}>
                Whats going on
            </Box>
        </Wrapper>
        <Guides></Guides>
    </div>
  )
}

export default Home