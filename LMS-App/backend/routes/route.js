const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');
const { adminRegister, adminLogIn, getAdminDetail} = require('../controllers/admin-controller.js');


//** Admin **//

router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);
router.get("/Admin/:id", getAdminDetail)
// router.delete("/Admin/:id", deleteAdmin)
// router.put("/Admin/:id", updateAdmin)


module.exports = router;