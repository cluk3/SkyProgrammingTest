import r from 'koa-router'
import catalogueService from '../methods/catalogueService'
import checkoutService from '../methods/checkoutService'
import customerLocServiceStub from '../methods/customerLocServiceStub'

const router = r()
router.get('/api/catalogue-service', catalogueService)
router.get('/api/customer-location-service', customerLocServiceStub)
router.post('/api/checkout', checkoutService)
export default router
