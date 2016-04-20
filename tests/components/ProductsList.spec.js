import React from 'react'
import ProductsList from 'components/ProductsList'
import { shallow } from 'enzyme'

const products = [
  {
    category: 'Sports',
    name: 'Arsenal TV',
    selected: true
  }
]
const toggleSelectionHandler = sinon.spy()
const wrapper = shallow(<ProductsList products={products} title='Sports' toggleSelectionHandler={toggleSelectionHandler}/>)
describe('(Component) ProductsList', () => {
  it('should render a div', () => {
    expect(wrapper.type()).to.eql('div')
  })
  it('should have one product', () => {
    expect(wrapper.find('li')).to.have.length(1)
  })
  it('should call toggleSelectionHandler when checkbox is clicked', () => {
    wrapper.find('input[type="checkbox"]').simulate('change')
    expect(toggleSelectionHandler.calledOnce).to.be.true
  })
})
