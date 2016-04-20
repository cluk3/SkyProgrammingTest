import reducer, {
  initialState,
  fetchProducts,
  toggleProductSelection,
  setProductsList,
  TOGGLE_PRODUCT_SELECTION,
  FETCH_PRODUCTS,
  SET_PRODUCTS_LIST
} from 'redux/modules/products'

const products = [
  {
    category: 'Sports',
    name: 'Arsenal TV',
    selected: false
  }
]

const fetchedProduct = [
  {
    category: 'Sports',
    product: 'Arsenal TV'
  }
]

describe('(Redux) Products', () => {
  it('should export a constant TOGGLE_PRODUCT_SELECTION.', () => {
    expect(TOGGLE_PRODUCT_SELECTION).to.equal('TOGGLE_PRODUCT_SELECTION')
  })

  it('should export a constant FETCH_PRODUCTS.', () => {
    expect(FETCH_PRODUCTS).to.equal('FETCH_PRODUCTS')
  })

  it('should export a constant SET_PRODUCTS_LIST.', () => {
    expect(SET_PRODUCTS_LIST).to.equal('SET_PRODUCTS_LIST')
  })

  describe('(Reducer)', () => {
    it('should sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })

    it('should be a function.', () => {
      expect(reducer).to.be.a('function')
    })

    it('should return the previous state if an action was not matched.', () => {
      let state = reducer(undefined, {})
      expect(state).to.deep.equal(initialState)
      state = reducer(state, {type: '@@@@@@@'})
      expect(state).to.deep.equal(initialState)
    })

    it('should not mutate the state', () => {
      const state = reducer(undefined, {})
      reducer(state, setProductsList(fetchedProduct))
      expect(state).to.deep.equal(initialState)
    })
  })

  describe('(Action Creator) setProductsList', () => {
    it('should be exported as a function.', () => {
      expect(setProductsList).to.be.a('function')
    })

    it('should return an action with type "SET_PRODUCTS_LIST".', () => {
      expect(setProductsList()).to.have.property('type', SET_PRODUCTS_LIST)
    })

    it('should assign the first argument to the "products" property.', () => {
      expect(setProductsList(fetchedProduct)).to.have.deep.property('products', fetchedProduct)
    })

    it('should default the "products" property to [] if not provided.', () => {
      expect(setProductsList().products).to.eql([])
    })
  })

  describe('(Action Creator) toggleProductSelection', () => {
    it('should be exported as a function.', () => {
      expect(toggleProductSelection).to.be.a('function')
    })

    it('should return an action with type "TOGGLE_PRODUCT_SELECTION".', () => {
      expect(toggleProductSelection()).to.have.property('type', TOGGLE_PRODUCT_SELECTION)
    })

    it('should assign the first argument to the "productName" property.', () => {
      expect(toggleProductSelection('Sky News')).to.have.property('productName', 'Sky News')
    })
  })

  describe('(Action Creator) fetchProducts', () => {
    let _globalState
    let _dispatchSpy

    beforeEach(() => {
      _globalState = {
        products: reducer(undefined, {})
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          products: reducer(_globalState.products, action)
        }
      })
    })

    it('should be exported as a function.', () => {
      expect(fetchProducts).to.be.a('function')
    })

    it('should return a function (is a thunk).', () => {
      expect(fetchProducts()).to.be.a('function')
    })

    it('should return a promise from that thunk that gets fulfilled.', () => {
      return fetchProducts()(_dispatchSpy).should.eventually.be.fulfilled
    })
  })

  describe('(Action Handler) TOGGLE_PRODUCT_SELECTION', function () {
    it('should toggle the "selected" property of the product with name specified by action productName\'s "value"', () => {
      let state = reducer(products, toggleProductSelection('Arsenal TV'))
      expect(state[0].selected).to.be.true
      state = reducer(state, toggleProductSelection('Arsenal TV'))
      expect(state[0].selected).to.be.false
    })
  })

  describe('(Action Handler) SET_PRODUCTS_LIST', function () {
    it('should set the produc list', () => {
      let state = reducer(undefined, setProductsList(fetchedProduct))
      expect(state).to.deep.equal(products)
    })
  })
})
