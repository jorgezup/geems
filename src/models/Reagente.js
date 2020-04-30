const { Model, DataTypes } = require('sequelize')

class Reagente extends Model {
    static init(sequelize) {
        super.init({
            nome_comum: DataTypes.TEXT,
            nome_oficial: DataTypes.TEXT,
            formula_molecular: DataTypes.TEXT,
            marca: DataTypes.TEXT,
            lote: DataTypes.TEXT,
            validade: DataTypes.DATE,
            estado: DataTypes.TEXT,
            quantidade: DataTypes.INTEGER,
            localizacao: DataTypes.TEXT,
            incompatibilidade: DataTypes.TEXT,
            controlado: DataTypes.TEXT,
            orgao: DataTypes.TEXT,
            info_adicionais: DataTypes.TEXT,
        }, {
           sequelize 
        })
    }
}

module.exports = Reagente