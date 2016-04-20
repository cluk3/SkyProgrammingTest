import fetch from 'isomorphic-fetch'

// Constants
export const TOGGLE_PRODUCT_SELECTION = 'TOGGLE_PRODUCT_SELECTION'
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const SET_PRODUCTS_LIST = 'SET_PRODUCTS_LIST'

// Action Creators
export function toggleProductSelection (productName) {
  return {
    type: TOGGLE_PRODUCT_SELECTION,
    productName
  }
}

export function setProductsList (products) {
  return {
    type: SET_PRODUCTS_LIST,
    products: products || []
  }
}

export function fetchProducts () {
  return (dispatch) => {
    const baseURL = 'http://localhost:3000'
    // GET /api/customer-location-service to retrieve locationID
    return fetch(baseURL + '/api/customer-location-service', {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(
      (res) => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(res)
        }
      }
    )
    // GET /api/catalogue-service to retrieve products list
    .then(
      (json) => {
        const { locationID } = json.data
        const query = `?locationID=${locationID}`
        return fetch(baseURL + '/api/catalogue-service' + query, {
          method: 'get',
          headers: {
            'Accept': 'application/json'
          }
        })
      }
    )
    .then(
      (res) => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(res)
        }
      }
    )
    .then(
      (json) => {
        const products = json.data.channels
        dispatch(setProductsList(products))
      }
    )
    .catch(
      (err) => {
        console.log(err)
      }
    )
  }
}

// Reducer
export const initialState = []
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS_LIST:
      return action.products.map((product) => {
        return {
          category: product.category,
          name: product.product,
          selected: false
        }
      })
    case TOGGLE_PRODUCT_SELECTION:
      return state.map((product) => {
        if (product.name === action.productName) {
          return {
            ...product,
            selected: !product.selected
          }
        }
        return product
      })
    default:
      return state
  }
}
