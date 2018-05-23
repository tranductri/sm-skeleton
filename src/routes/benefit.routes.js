import BenefitController from '../controllers/benefit.controller';
import bindControllerToCRUDRoutes from './helpers';

const controller = new BenefitController();
export default bindControllerToCRUDRoutes(controller);
