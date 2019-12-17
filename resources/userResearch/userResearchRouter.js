const router = require('express').Router();
const userResearchController = require('./userResearchController');

router.post('/signed', userResearchController.signedUrl)
router.get('/:id', userResearchController.getResearchById)
router.get('/project/:id', userResearchController.getResearchByProjectId)
router.post('/', userResearchController.createUserResearch)
router.delete('/:id', userResearchController.deleteUserResearchById)


module.exports = router;