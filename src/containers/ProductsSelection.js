import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'
import ProductsList from 'components/ProductsList/ProductsList'
import ProductsBasket from 'components/ProductsBasket/ProductsBasket'
import { routerActions } from 'react-router-redux'
import { fetchProducts, toggleProductSelection } from 'redux/modules/products'

export class ProductsSelection extends React.Component {
  componentDidMount () {
    const { fetchProducts } = this.props
    fetchProducts()
  }

  render () {
    const {
      products,
      toggleProductSelection,
      submitProductsList
     } = this.props
    const sportsProducts = products
      .filter((product) => product.category === 'Sports')
    const newsProducts = products
      .filter((product) => product.category === 'News')
    const selectedProducts = products
      .filter((product) => product.selected)
    const submitHandler = (ev) => {
      ev.preventDefault
      submitProductsList(selectedProducts)
    }
    return (
      <div className='row'>
        <div className='col-xs-12 col-sm-6 col-md-4'>
          <ProductsList
            products={sportsProducts}
            toggleSelectionHandler={toggleProductSelection}
            title={'Sports'}
          />
        </div>
        <div className='col-xs-12 col-sm-6 col-md-4'>
          <ProductsList
            products={newsProducts}
            toggleSelectionHandler={toggleProductSelection}
            title={'News'}
          />
        </div>
        <div className='col-xs-12 col-sm-12 col-md-4'>
          <ProductsBasket
            products={selectedProducts}
            submitHandler={submitHandler}
          />
        </div>
      </div>
    )
  }
}

ProductsSelection.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  toggleProductSelection: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  submitProductsList: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    toggleProductSelection: (productName) => dispatch(toggleProductSelection(productName)),
    submitProductsList: (products) => {
      const baseURL = 'http://localhost:3000'
      // post request to /confirmation-page
      fetch(baseURL + '/api/checkout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(products.map((product) => {
          return {
            product: product.name,
            category: product.category
          }
        }))
      })
      .then(
        (res) => {
          if (res.ok) {
            dispatch(routerActions.push('/confirmation-page'))
          } else {
            // I would never do that in a real application :D
            alert('Error!')
          }
        }
      )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsSelection)
