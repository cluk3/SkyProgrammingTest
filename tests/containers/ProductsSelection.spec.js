import React from 'react'
import { ProductsSelection } from 'containers/ProductsSelection'
import ProductsList from 'components/ProductsList'
import ProductsBasket from 'components/ProductsBasket'
import { mount } from 'enzyme'

const fetchProducts = sinon.spy()
sinon.spy(ProductsSelection.prototype, 'componentDidMount')
const products = [
  {
    category: 'Sports',
    name: 'Arsenal TV',
    selected: true
  },
  {
    category: 'News',
    name: 'Sky News',
    selected: true
  },
  {
    category: 'News',
    name: 'Sky News',
    selected: false
  },
]
const selectedProducts = [
  {
    category: 'Sports',
    name: 'Arsenal TV',
    selected: true
  },
  {
    category: 'News',
    name: 'Sky News',
    selected: true
  }
]
const submit = sinon.spy()
const wrapper = mount(
  <ProductsSelection
    fetchProducts={fetchProducts}
    toggleProductSelection={sinon.spy()}
    submitProductsList={submit}
    products={products}
  />)
describe('(Container) ProductsSelection', () => {
  it('render a div with class "row"', () => {
    expect(wrapper.find('.row')).to.have.length(1)
  })
  it('should contain two ProductsList', () => {
    expect(wrapper.find(ProductsList)).to.have.length(2)
  })
  it('should contain a ProductsBasket', () => {
    expect(wrapper.find(ProductsBasket)).to.have.length(1)
  })
  it('should call componentDidMount', () => {
    expect(ProductsSelection.prototype.componentDidMount.calledOnce).to.be.true
  })
  it('should call fetchProducts once after mount', () => {
    expect(fetchProducts.calledOnce).to.be.true
  })
  it('should put in the basket only selected products', () => {
    expect(wrapper.find(ProductsBasket).props().products).to.deep.equal(selectedProducts)
  })
  it('pass submitHandler to ProductsBasket', () => {
    expect(wrapper.find(ProductsBasket).props().submitHandler).to.be.a.function
  })
})
