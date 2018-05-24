import db from '../models';
import BaseService from './base.services';
import { ResourceNotFoundError } from '../components/errors';

class TranslationService extends BaseService {

    static findTranslation(id) {
        return db.Translation.findOne({
            include: [{ model: db.TranslationEntry, as: 'entries', duplicating: false }],
            where: { id }
        }).then(item => {
            if (!item) throw new ResourceNotFoundError('Translation');
            return item;
        });
    }

    static updateTranslation(id, data) {
        return TranslationService.findTranslation(id).then((translation) => {
            translation.updateAttributes(
              data,
              { attributes: { exclude: [db.Translation.Entries] } }
            )
            .then((updatedTranslation) => {
                const entries = data.entries;
                if (entries) {
                    entries.map((entry) => {
                        const updatableEntry = updatedTranslation.entries.find((translationEntry) =>
                          translationEntry.language === entry.language);
                        if (updatableEntry) {
                            return updatableEntry.updateAttributes(entry);
                        }
                        return db.TranslationEntry.create({
                            ...entry,
                            translation_id: updatedTranslation.id
                        });
                    });
                }

                return updatedTranslation;
            });
        });
    }
}

export default TranslationService;
