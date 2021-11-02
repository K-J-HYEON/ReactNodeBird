module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', { // MySQL에는 comments 테이블 생성
        // id가 기본적으로 들어있다.
        // 게시글이든 사용자든 고유한 아이디가 붙는다.
        content: {
            type: DataTypes.TEXT, // 글자를 일단 무제한으로 늘려놓자.
            allowNull: false,
        },
        // UserId: 1
        // PostId: 3
        // 이 두 컬럼을 만들어준다.
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Comment);
    };
    return Comment;
}