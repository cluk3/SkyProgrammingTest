import React from 'react'
import { shallow } from 'enzyme';
import {pageContainer} from 'layouts/PageLayout/PageLayout.css'
import PageLayout from 'layouts/PageLayout'
import ProductSelectionView from 'views/ProductSelectionView'

const wrapper = shallow(<PageLayout />)

describe('(Layout) PageLayout', () => {
  it('should render a div with class "page-container"', () => {
    expect(wrapper.type()).to.eql('div')
    expect(wrapper.hasClass(pageContainer)).to.be.true
  })
  it('should contain an header', () => {
    expect(wrapper.find('#header')).to.have.length(1)
  })
  it('should contain a page content', () => {
    expect(wrapper.find('#page-content')).to.have.length(1)
  })
  it('should contain a footer', () => {
    expect(wrapper.find('#footer')).to.have.length(1)
  })
  it('should render children', () => {
    const wrapperWithChild = shallow(<PageLayout><div>Child</div></PageLayout>)
    expect(wrapperWithChild.props().children).to.exist
  })
})
