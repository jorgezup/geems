const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            passaporte: DataTypes.STRING,
            cargo: DataTypes.STRING,
            is_admin: DataTypes.BOOLEAN,
        }, {
            sequelize
        })
    }
}

module.exports = User;