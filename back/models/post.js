module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      // MySQL에는 posts 테이블 생성
      // id가 기본적으로 들어있다.
      content: {
        type: DataTypes.TEXT, // 글자를 일단 무제한으로 늘려놓자.
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 이모티콘 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // post의 작성자
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: "Like" }); // post의 좋아요를 누른 사람들
    // 어떤 게시글의 리트윗 게시글을 구현하자.
    // as Retweet으로 해서 PostId에서 Retweet으로 바뀐다.
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};
