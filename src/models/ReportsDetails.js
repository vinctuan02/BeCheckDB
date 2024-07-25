import DataTypes from 'sequelize';
import { sequelize } from '../config/Database';
import Report from './Report';
import JDBC_Connections from './JDBC_Connections';

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
    source_connection_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sink_connection_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Report_Details',
    timestamps: false, // Nếu bảng không sử dụng các cột `createdAt` và `updatedAt`
});

// Định nghĩa mối quan hệ
Report.hasMany(ReportDetails, { foreignKey: 'report_id' });
ReportDetails.belongsTo(Report, { foreignKey: 'report_id' });

JDBC_Connections.hasMany(ReportDetails, { foreignKey: 'source_connection_id', as: 'SourceConnection' });
ReportDetails.belongsTo(JDBC_Connections, { foreignKey: 'source_connection_id', as: 'SourceConnection' });

JDBC_Connections.hasMany(ReportDetails, { foreignKey: 'sink_connection_id', as: 'SinkConnection' });
ReportDetails.belongsTo(JDBC_Connections, { foreignKey: 'sink_connection_id', as: 'SinkConnection' });

export default ReportDetails;
