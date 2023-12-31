'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Cart, { foreignKey: 'userID' });
            this.hasMany(models.Order, { foreignKey: 'userID' });
            this.hasMany(models.Wishlist, { foreignKey: 'userID' });
            this.hasMany(models.PaymentMethod, { foreignKey: 'userID' });
            this.hasMany(models.Sales, { foreignKey: 'userID' });
            this.hasOne(models.Profile, { foreignKey: 'userID' });
            this.hasOne(models.RefreshToken, { foreignKey: 'userID' });
        }
    }
    User.init(
        {
            userID: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            firstName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            lastName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            email: {
                unique: true,
                allowNull: false,
                type: DataTypes.STRING,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            address: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            phone: {
                allowNull: true,
                type: DataTypes.BIGINT,
            },
            dateRegistered: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'User',
            hooks: {
                afterCreate: async (user, options) => {
                    // Assuming that the role is stored in `options.role`
                    // You can adjust this according to how you are passing the role
                    const role = options.role;

                    await sequelize.models.Profile.create({
                        userID: user.userID,
                        role: role,
                    });
                },
                beforeDestroy: async (user, options) => {
                    // Assuming that the role is stored in `options.role`
                    // You can adjust this according to how you are passing the role
                    const { sequelize } = user;

                    // delete associated Profile
                    await sequelize.models.Profile.destroy({
                        where: { userID: user.userID },
                    });

                    // delete associated RefreshToken
                    await sequelize.models.RefreshToken.destroy({
                        where: { userID: user.userID },
                    });
                },
            },
        }
    );
    return User;
};
