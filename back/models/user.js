module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // MYSQL에는 users 테이블 생성
        // id가 기본적으로 들어있다.
        email: {
            // 문자열이여야 하고 30글자 이내여야 한다.
            type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: false, // 필수 true면 선택적
            unique: true, // 고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false, // 필수
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false, // 필수
        },
        // PostId: 1, 2, 5, 10, 15
        // CommentId
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
    });
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' }); // foreignKey부터 시작해서 as의 Followers를 찾는다.
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' }); // foreignKey부터 시작해서 as의 Followings를 찾는다.
    };
    return User;
}