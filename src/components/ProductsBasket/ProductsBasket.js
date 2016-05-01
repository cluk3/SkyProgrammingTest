import React, { PropTypes} from 'react'
import { basketContainer, submitButton } from './ProductsBasket.css'

const ProductsBasket = ({ products, submitHandler }) => {
  const Products = products
    .sort((a, b) => a.selectedAt - b.selectedAt)
    .map((product, i) => {
      return (
        <li key={i}>{product.name}</li>
      )
    })
  return (
    <div className={basketContainer}>
      <h2>Basket</h2>
      <ul id='basket'>
        {Products}
      </ul>
      <button
        className={'btn btn-default ' + submitButton}
        type='submit'
        onClick={submitHandler}
        disabled={products.length === 0}
      >
        Checkout
      </button>
    </div>
  )
}

ProductsBasket.propTypes = {
  products: PropTypes.array,
  submitHandler: PropTypes.func.isRequired
}

export default ProductsBasket
