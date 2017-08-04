import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import { Home } from '../src/index.js'

describe('<Home />', function () {
  it('should have an image to display the gravatar', function () {
    const wrapper = shallow((
      <Home>
        <div className="unique" />
      </Home>
    ));
    expect(wrapper.contains(<div className="unique" />)).to.equal(true)
  })
})