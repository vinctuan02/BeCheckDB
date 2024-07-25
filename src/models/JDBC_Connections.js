import DataTypes from 'sequelize';
import { sequelize } from '../config/Database';

const JDBC_Connections = sequelize.define('JDBC_Connections', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    connection_name: {
        type: DataTypes.STRING,
        allowNull: true, // Cho phép giá trị null
    },
    jdbc_url: {
        type: DataTypes.STRING(1024),
        allowNull: true, // Cho phép giá trị null
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    type_database: {
        type: DataTypes.STRING(50),
        allowNull: true, // Cho phép giá trị null
    },
    host: {
        type: DataTypes.STRING(50),
        allowNull: true, // Cho phép giá trị null
    }
}, {
    tableName: 'JDBC_Connections',
    timestamps: false, // Nếu bảng không sử dụng các cột `createdAt` và `updatedAt`
});

export default JDBC_Connections;
