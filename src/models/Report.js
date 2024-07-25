import DataTypes from 'sequelize';
import { sequelize } from '../config/Database';

const Report = sequelize.define('Report', {
    report_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    reportName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    fileName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'Reports', // Tên của bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng timestamps (createdAt, updatedAt)
});

export default Report;
