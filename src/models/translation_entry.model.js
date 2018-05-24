export default function (sequelize, DataTypes) {
    return sequelize.define('TranslationEntry', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        translation_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'translation',
            },
            unique: 'uqc_translation_id_language'
        },
        language: {
            type: DataTypes.TEXT,
            allowNull: true,
            unique: 'uqc_translation_id_language'
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true
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
        tableName: 'translation_entry',
        underscored: true
    });
}

