module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', { 
        // id가 기본적으로 들어있다.
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // 이모티콘 저장
    });
    Image.associate = (db) => {
        // 게시글이 1 이미지가 N
        db.Image.belongsTo(db.Post);
    };
    return Image;
}