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
    const Benefit = sequelize.define('Benefit', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        code: {
            type: DataTypes.TEXT,
            allowNull: true,
            unique: 'uqc_code_tenant_id'
        },
        apply_waiting_period: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        billing_type: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        salary_sum_assured: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        number_of_month: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: '0'
        },
        apply_unit: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        apply_type: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        currency: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        min_sum_assured: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        max_sum_assured: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        tenant_id: {
            type: DataTypes.UUID,
            allowNull: true,
            unique: 'uqc_code_tenant_id'
        },
        created_by: {
            type: DataTypes.UUID,
            allowNull: true
        },
        name: {
            type: DataTypes.UUID,
            allowNull: true
        },
        description: {
            type: DataTypes.UUID,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'benefit',
        underscored: true
    });

    Benefit.associate = (models) => {
        Benefit.belongsTo(
          models.Translation,
          { as: 'nameTranslations', foreignKey: 'name' }
        );
        Benefit.belongsTo(
          models.Translation,
          { as: 'descriptionTranslations', foreignKey: 'description' }
        );
    };

    return Benefit;
}
