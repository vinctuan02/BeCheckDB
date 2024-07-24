import DataTypes from 'sequelize'
import { sequelize } from '../config/Database'
import Report from './Report';

const ReportDetails = sequelize.define('ReportDetails', {
    detail_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    report_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    schemaSourceName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    schemaSinkName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataSourceName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataSinkName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Report_Details',
    timestamps: false, // Nếu bảng của bạn không sử dụng các cột `createdAt` và `updatedAt`
});

Report.hasMany(ReportDetails, { foreignKey: 'report_id' });
ReportDetails.belongsTo(Report, { foreignKey: 'report_id' });

export default ReportDetails;
