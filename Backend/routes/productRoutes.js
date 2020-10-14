import express from "express";
import {
  getProducts,
  getProductsByID,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts)
router
  .route("/:id")
  .get(getProductsByID)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

  router.route("/:id/reviews").post(protect, createProductReview)

export default router;
