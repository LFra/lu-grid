import React from 'react'
import chai, { expect } from 'chai'
import { mount } from 'enzyme'
import styled, { css } from 'styled-components'
import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme())

const config = {
    columns: 12
}



describe('Media', () => {
    it('Should set the right style at each breakpoint.', () => {
        
    })
})


// Get the right ammount of columns for the given percentage
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

const getColumnsFromPercentage = (percentage, num_columns) => {
    return Math.floor(percentage.map(0, 100, 0, num_columns))
}

describe('PercentageToColumns', () => {
    it('Should return the right ammount of columns for the given percentage.', () => {
        expect(getColumnsFromPercentage(70, 12)).to.equal(8)
        expect(getColumnsFromPercentage(10, 24)).to.equal(2)
    })
})
