import React from 'react'
import ProductsBasket from 'components/ProductsBasket'
import { shallow } from 'enzyme'

const products = [
  {
    category: 'Sports',
    name: 'Arsenal TV',
    selected: true,
    selectedAt: Date.now()
  },
  {
    category: 'News',
    name: 'Sky News',
    selected: true,
    selectedAt: Date.now() + 10000
  },
]
const submitHandler = sinon.spy()
const wrapper = shallow(<ProductsBasket products={products} submitHandler={submitHandler}/>)
describe('(Component) ProductsBasket', () => {
  it('should render a div', () => {
    expect(wrapper.type()).to.eql('div')
  })
  it('should have two products', () => {
    expect(wrapper.find('li')).to.have.length(2)
  })
  it('should have button enabled when there are products in the basket', () => {
    expect(wrapper.find('button')).to.not.be.disabled()
  })
  it('should have button disabled when there are no products in the basket', () => {
    const emptyBasket = shallow(<ProductsBasket products={[]} submitHandler={submitHandler}/>)
    expect(emptyBasket.find('button')).to.be.disabled()
  })
  it('should call submitHandler when button in clicked', () => {
    wrapper.find('button').simulate('click')
    expect(submitHandler.calledOnce).to.be.true
  })
  it('should put last selected product at bottom', () => {
    expect(wrapper.find('li').last().text()).to.equal('Sky News')
  })
})
