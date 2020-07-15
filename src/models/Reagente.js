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
            estado: DataTypes.ENUM({values: ['sólido', 'líquido']}),
            quantidade: DataTypes.INTEGER,
            incompatibilidade: DataTypes.TEXT,
            controlado: DataTypes.BOOLEAN,
            orgao_controle_id: DataTypes.INTEGER,
            info_adicionais: DataTypes.TEXT,
        }, {
           sequelize 
        })
    }
    static associate(models) {
        this.belongsTo(models.Local, { foreignKey: 'local_armazenamento_id', as: 'local_armazenamento'})
        this.belongsTo(models.User, { foreignKey: 'created_by_user_id' })
        // this.belongsTo(models.Orgao, { foreignKey: 'orgao_controle_id'})
    }
}

module.exports = Reagente