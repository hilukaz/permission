import{Router}from "express";
// import { CategoryController } from "./controllers/CategoryController";
// import { ProductCategory } from "./controllers/ProductCategoryController";
import { UserController } from "./controllers/UserController";
import { SessionController } from "./controllers/SessionController";
import { authMiddleware } from "./middlewares/authMiddleware";


const router=Router();

const userController=new UserController();
const sessionController=new SessionController();
// const categoryController=new CategoryController();
// const productCategory=new ProductCategory();

router.post("/user",userController.criar);
router.post("/login",sessionController.login);
router.get("/user",authMiddleware, userController.consultar);
// router.put("/product/:id",productController.atualizar);
// router.delete("/product/:id",productController.deletar);
// router.get("/product/:id",productController.pesquisar);

// router.post("/category",categoryController.criar);
// router.get("/category",categoryController.consultar);
// router.put("/category/:id",categoryController.atualizar);
// router.delete("/category/:id",categoryController.deletar);
// router.get("/category/:id",categoryController.pesquisar);

// router.post("/NN",productCategory.criar);
// router.get("/NN",productCategory.consultar);
// router.put("/NN/:id",productCategory.atualizar);
// router.delete("/NN/:id",productCategory.deletar);
// router.get("/NN/:id",productCategory.pesquisar);

export {router};