const express = require("express")
const MaincategoryRouter = require("../routes/maincategory.routes.js")
const SubcategoryRouter = require("../routes/subcategory.routes.js")
const BrandRouter = require("../routes/brand.routes.js")
const FeatureRouter = require("../routes/feature.routes.js")
const FaqRouter = require("../routes/faq.routes.js")
const NewsletterRouter = require("../routes/newsletter.routes.js")
const ContactUsRouter = require("../routes/contactus.routes.js")
const SettingRouter = require("../routes/setting.routes.js")
const ProductRouter = require("../routes/product.routes.js")
const UserRouter = require("../routes/user.routes.js")
const CartRouter = require("../routes/cart.routes.js")


// ab sabhi router ko combine krke eak file(index.routes.js) se export kr dege

const router = express.Router()

router.use("/maincategory", MaincategoryRouter)
router.use("/subcategory", SubcategoryRouter)
router.use("/brand", BrandRouter)
router.use("/feature", FeatureRouter)
router.use("/faq", FaqRouter)
router.use("/newsletter", NewsletterRouter)
router.use("/contactus", ContactUsRouter)
router.use("/setting", SettingRouter)
router.use("/product", ProductRouter)
router.use("/user", UserRouter)
router.use("/cart", CartRouter)


module.exports = router
