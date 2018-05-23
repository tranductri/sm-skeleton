import CRUD from './CRUD';
import db from '../models';

class BenefitController extends CRUD {
    constructor() {
        super(db.Benefit, 'benefit');
    }

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
        this.Model.findAll({
            include: [
                {
                    model: db.Translation,
                    as: 'nameTranslations',
                    include: [{ model: db.TranslationEntry, as: 'entries' }]
                }, {
                    model: db.Translation,
                    as: 'descriptionTranslations',
                    include: [{ model: db.TranslationEntry, as: 'entries' }]
                }
            ]
        })
        .then(res.json.bind(res))
        .catch(next);
    }
}

export default BenefitController;
