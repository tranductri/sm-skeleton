import Sequelize from 'sequelize';
import db from '../models';
import BaseService from './base.services';
import TranslationService from './translation.service';
import { ResourceNotFoundError, ValidationError } from '../components/errors';

class BenefitService extends BaseService {
    static listBenefits(filter) {
        const search = filter.search || '';
        return db.Benefit.findAndCountAll({
            include: [
                {
                    model: db.Translation,
                    as: 'nameTranslation',
                    include: [{ model: db.TranslationEntry, as: 'entries', duplicating: false }]
                }, {
                    model: db.Translation,
                    as: 'descTranslation',
                    include: [{ model: db.TranslationEntry, as: 'entries', duplicating: false }]
                }
            ],
            where: {
                $or: [
                    { '$nameTranslation.entries.text$': { $iLike: `%${search}%` } },
                    { '$descTranslation.entries.text$': { $iLike: `%${search}%` } }
                ]
            },
            limit: filter.limit,
            offset: filter.offset
        });
    }

    static findBenefit(id) {
        return db.Benefit.findOne({
            include: [
                {
                    model: db.Translation,
                    as: 'nameTranslation',
                    include: [{ model: db.TranslationEntry, as: 'entries', duplicating: false }]
                }, {
                    model: db.Translation,
                    as: 'descTranslation',
                    include: [{ model: db.TranslationEntry, as: 'entries', duplicating: false }]
                }
            ],
            where: { id }
        }).then(item => {
            if (!item) throw new ResourceNotFoundError('Benefit');
            return item;
        });
    }

    static addBenefit(data) {
        return db.Benefit.create(data, {
            include: [
                {
                    association: db.Benefit.NameTranslation,
                    include: [db.Translation.Entries]
                },
                {
                    association: db.Benefit.DescTranslation,
                    include: [db.Translation.Entries]
                }
            ]
        }).catch(Sequelize.ValidationError, err => {
            throw new ValidationError(err);
        });
    }

    static updateBenefit(id, data) {
        return BenefitService.findBenefit(id).then((benefit) => {
            benefit.updateAttributes(data);
            return benefit;
        }).then((updatedBenefit) => {
            const nameData = data.nameTranslation;
            if (nameData) {
                TranslationService.updateTranslation(
                      updatedBenefit.nameTranslation.id,
                      nameData
                    );
            }
            const descData = data.descTranslation;
            if (descData) {
                updatedBenefit.descTranslation.updateAttributes(descData);
            }

            return updatedBenefit;
        });
    }
}

export default BenefitService;
