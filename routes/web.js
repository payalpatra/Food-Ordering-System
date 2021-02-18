const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");
const adminOrderController = require("../app/http/controllers/admin/orderController");
const statusController = require("../app/http/controllers/admin/statusController");
// Middlewares
const admin = require("../app/http/middleware/admin");
const guest = require("../app/http/middleware/guest");
const auth = require("../app/http/middleware/auth");

// Routes
function initRoutes(app) {
  // ----- Home Route ----- //
  app.get("/", homeController().index);

  // ----- Cart Route ----- //
  app.get("/cart", cartController().index);
  app.post("/update-cart", cartController().update);

  // ----- Register Route ----- //
  app.get("/register", guest, authController().register);
  app.post("/register", authController().postRegister);

  // ----- Login Route ----- //
  app.get("/login", guest, authController().login);
  app.post("/login", authController().postLogin);

  // ----- Logout Route ----- //
  app.post("/logout", authController().logout);

  // ----- Customer's Place Orders Route ----- //
  app.post("/orders", auth, orderController().store);

  // ----- Customer's Orders Route ----- //
  app.get("/customer/orders", auth, orderController().index);

  // ----- Admin Orders Route ----- //
  app.get("/admin/orders", admin, adminOrderController().index);

  // ----- Admin Orders status Route ----- //
  app.post("/admin/orders/status", admin, statusController().update);
}
module.exports = initRoutes;
