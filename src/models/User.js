const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            passaporte: DataTypes.STRING,
            is_admin: DataTypes.BOOLEAN,
            reset_token: DataTypes.TEXT,
            reset_token_expires: DataTypes.TEXT,
            disabled: DataTypes.BOOLEAN
        }, {
            sequelize,
        })
    }

    static associate(models) {
        this.belongsTo(models.Papel, { foreignKey: 'papel_id', as: 'papel'})
    }
}

module.exports = User;