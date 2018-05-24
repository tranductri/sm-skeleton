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
            allowNull: false,
            unique: 'uqc_code_tenant_id',
            validate: {
                len: [2, 10]
            }
        },
        apply_waiting_period: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        billing_type: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        salary_sum_assured: {
            type: DataTypes.BOOLEAN,
            validate: {
                hasMonth: () => {
                  // @Todo: Check the value of number of month when
                  // salary_sum_assured = true
                  // currently can not access context value.'this' is
                  // undefined
                    // if (this.salary_sum_assured === true) {
                    //     throw new Error('Invalid value');
                    // }
                }
            }
        },
        number_of_month: {
            type: DataTypes.INTEGER
        },
        apply_unit: {
            type: DataTypes.INTEGER
        },
        apply_type: {
            type: DataTypes.TEXT
        },
        currency: {
            type: DataTypes.TEXT
        },
        min_sum_assured: {
            type: DataTypes.BIGINT
        },
        max_sum_assured: {
            type: DataTypes.BIGINT
        },
        tenant_id: {
            type: DataTypes.UUID,
            unique: 'uqc_code_tenant_id'
        },
        created_by: {
            type: DataTypes.UUID
        },
        name: {
            type: DataTypes.UUID
        },
        description: {
            type: DataTypes.UUID
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'benefit',
        underscored: true
    });

    Benefit.associate = (models) => {
        Benefit.NameTranslation = Benefit.belongsTo(
          models.Translation,
          { as: 'nameTranslation', foreignKey: 'name' }
        );
        Benefit.DescTranslation = Benefit.belongsTo(
          models.Translation,
          { as: 'descTranslation', foreignKey: 'description' }
        );
    };

    return Benefit;
}
