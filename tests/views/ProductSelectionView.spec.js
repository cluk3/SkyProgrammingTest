import React from 'react'
import ProductSelectionView from 'views/ProductSelectionView'
import ProductsSelection from 'containers/ProductsSelection'
import { shallow } from 'enzyme'

const wrapper = shallow(<ProductSelectionView />)
describe('(View) ProductSelection', () => {
  it('should render a div with class "container"', () => {
    expect(wrapper.type()).to.eql('div')
    expect(wrapper.hasClass('container')).to.be.true
  })
  it('should contain ProductsSelection', () => {
    expect(wrapper.contains(<ProductsSelection />)).to.be.true
  })
})
