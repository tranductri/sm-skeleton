/**
* Example model
* @module models/example
*/

/**
* Example model - create and export the database model for the example
* including all assosiations and classmethods assiciated with this model.
* @memberof  module:models/Example
* @param  {Object} sequelize description
* @param  {Object} DataTypes description
*/

export default function (sequelize, DataTypes) {
    const Translation = sequelize.define('Translation', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        tenant_id: {
            type: DataTypes.UUID,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'translation',
        underscored: true
    });

    Translation.associate = (models) => {
        Translation.hasMany(
            models.TranslationEntry,
            { as: 'entries', foreignKey: 'translation_id' }
        );
    };

    return Translation;
}
