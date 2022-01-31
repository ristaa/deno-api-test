import {Router, RouterContext} from './deps.ts'
import authController from './controllers/AuthController.ts';
import memeController from './controllers/MemeController.ts';

const router = new Router();

router.get("/", context => {
  context.response.body = "HeLLo WoRld";
})
.post("/api/login", authController.login)
.post("/api/register", authController.register)
.get("/api/meme", memeController.getAllForUser)
.get("/api/meme/:id", memeController.getSingle)
.post("/api/meme/create", memeController.create)
.put("/api/meme/:id", memeController.update)
.delete("/api/meme/:id", memeController.delete);

export default router;