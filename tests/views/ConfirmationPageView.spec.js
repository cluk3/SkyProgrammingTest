import React from 'react'
import ConfirmationPage from 'views/ConfirmationPageView'
import { shallow } from 'enzyme'

const wrapper = shallow(<ConfirmationPage />)
describe('(View) ConfirmationPage', () => {
  it('should render a div with class "text-center"', () => {
    expect(wrapper.type()).to.eql('div')
    expect(wrapper.hasClass('text-center')).to.be.true
  })
})
