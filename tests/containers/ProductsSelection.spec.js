import React from 'react'
import { ProductsSelection } from 'containers/ProductsSelection'
import ProductsList from 'components/ProductsList'
import ProductsBasket from 'components/ProductsBasket'
import { mount } from 'enzyme'

const fetchProducts = sinon.spy()
sinon.spy(ProductsSelection.prototype, 'componentDidMount')
const wrapper = mount(
  <ProductsSelection
    fetchProducts={fetchProducts}
    toggleProductSelection={sinon.spy()}
    submitProductsList={sinon.spy()}
    products={[]}
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
})
