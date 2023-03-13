import{Router}from "express";
import { RoleController } from "./controllers/RoleController";
import { UserRole } from "./controllers/UserRoleController";
import { UserController } from "./controllers/UserController";
import { SessionController } from "./controllers/SessionController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { UserAccess } from "./controllers/UserAccess";
import { can, is } from "./middlewares/permissions";
import { PermissionsPrivate } from "./common/utils/permissions";
import { RolesPrivate } from "./common/utils/roles";

const router=Router();

const userController=new UserController();
const sessionController=new SessionController();
const roleController=new RoleController();
const userAccess =new UserAccess();
// const userRole=new UserRole();

router.post("/user",userController.criar);
router.post("/login",sessionController.login);
router.get("/user",authMiddleware, userController.consultar);
router.post("/acesso",authMiddleware,userAccess.criar)
router.put("/user/:id",authMiddleware,is([RolesPrivate.admin]),userController.atualizar);
// router.delete("/user/:id",userController.deletar);
router.get("/user/:id", authMiddleware,can([PermissionsPrivate.usuarioPesquisar]),userController.pesquisar);
//router.get("/user/:id", authMiddleware,is([RolesPrivate.admin]),userController.pesquisar)

// router.post("/role",roleController.criar);
router.get("/role",roleController.consultar);
// router.put("/role/:id",roleController.atualizar);
// router.delete("/role/:id",roleController.deletar);
// router.get("/role/:id",roleController.pesquisar);

// router.post("/NN",userRole.criar);
// router.get("/NN",userRole.consultar);
// router.put("/NN/:id",userRole.atualizar);
// router.delete("/NN/:id",userRole.deletar);
// router.get("/NN/:id",userRole.pesquisar);

export {router};