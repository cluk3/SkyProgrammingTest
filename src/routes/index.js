import React from 'react'
import { Route } from 'react-router'
import PageLayout from 'layouts/PageLayout/PageLayout'
import ProductSelectionView from 'views/ProductSelectionView/ProductSelectionView'
import ConfirmationPageView from 'views/ConfirmationPageView/ConfirmationPageView'

export default (store) => (
  <Route path='/' component={PageLayout}>
    <Route path='product-selection' component={ProductSelectionView}/>
    <Route path='confirmation-page' component={ConfirmationPageView}/>
  </Route>
)
