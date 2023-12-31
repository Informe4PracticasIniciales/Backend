import { DataTypes } from 'sequelize'
import sequelize from '../db/config';
import { Post, User } from '.';


export const Comment = sequelize.define('Comment', {
    idComment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: DataTypes.TEXT
    }
})


// * Foreign key idPost in Comment
Post.hasMany(Comment, { foreignKey: 'idPost' });

User.hasMany(Comment, { foreignKey: 'idUser' });
Comment.belongsTo(User, { foreignKey: 'idUser' });
