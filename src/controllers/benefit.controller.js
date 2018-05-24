import CRUD from './CRUD';
import BenefitService from '../services/benefit.services';


class BenefitController extends CRUD {
    /**
     * list - List all objects in the database
     *
     * @function list
     * @memberof  module:controllers/CRUD
     * @param  {Object} req  Express request object
     * @param  {Object} res  Express response object
     * @param  {Function} next Express next middleware function
     */
    list(req, res, next) {
        BenefitService.listBenefits({
            search: req.query.search || '',
            limit: req.query.limit,
            offset: req.query.offset
        })
        .then(res.json.bind(res))
        .catch(next);
    }

        /**
     * retrieve - Retrieves a single item by ID.
     *
     * @function retrieve
     * @memberof module:controllers/CRUD
     * @param  {Object} req  Express request object
     * @param  {Object} res  Express response object
     * @param  {Function} next Express next middleware function
     */
    retrieve(req, res, next) {
        BenefitService.findBenefit(req.params.id)
        .then(item => { res.json(item); })
        .catch(next);
    }

    /**
     * create - creates a new entity.
     *
     * @function create
     * @memberof module:controllers/CRUD
     * @param  {Object} req  Express request object
     * @param  {Object} res  Express response object
     * @param  {Function} next Express next middleware function
     */
    create(req, res, next) {
        BenefitService.addBenefit(req.body)
        .then(item => res.status(201).json(item))
        .catch(next);
    }

    /**
     * update - Updates a single item given ID and that it exists.
     *
     * @function update
     * @memberof module:controllers/CRUD
     * @param  {Object} req  Express request object
     * @param  {Object} res  Express response object
     * @param  {Function} next Express next middleware function
     */
    update(req, res, next) {
        BenefitService.updateBenefit(req.params.id, req.body)
        .then((item) => res.status(201).json(item))
        .catch(next);
    }
}

export default BenefitController;
