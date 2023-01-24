module.exports = (sequelize, Sequelize) => {
    return sequelize.define("products", {
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            make: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            details: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            deadline: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            ended: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            tableName: 'products',
        });
}