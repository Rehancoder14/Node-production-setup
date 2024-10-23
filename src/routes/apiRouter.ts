import {Router} from 'express';
import apiController from '../controller/apiController';
import resumeController from '../controller/resumeController';
const router = Router();
// config api
router.route('/self').get(apiController.self);
router.route('/health').get(apiController.health);

// application api
router.route('/resume').get(resumeController.getResume);
router.route('/resume/skills').post(resumeController.addSkills);
router.route('/resume/personal-details').post(resumeController.addPersonalDetails);

export default router;