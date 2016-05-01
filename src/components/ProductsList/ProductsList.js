import React, { PropTypes } from 'react'
import { listContainer, list } from './ProductsList.css'

const ProductsList = ({ products, title, toggleSelectionHandler }) => {
  const onChangeHandler = (productName) => () => toggleSelectionHandler(productName)
  const Products = products.map((product, i) => {
    return (
      <li key={i}>
        <div className='checkbox'>
          <label>
            <input checked={product.selected} onChange={onChangeHandler(product.name)} type='checkbox' />
            {product.name}
          </label>
        </div>
      </li>
    )
  })
  return (
    <div className={listContainer}>
      <h2>{title}</h2>
      <ul className={list}>
        {Products}
      </ul>
    </div>
  )
}

ProductsList.propTypes = {
  products: PropTypes.array,
  toggleSelectionHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default ProductsList
