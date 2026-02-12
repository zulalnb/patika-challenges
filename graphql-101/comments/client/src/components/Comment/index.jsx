import "./index.css";

function Comment({ author, avatar, content }) {
  return (
    <div className="ant-comment">
      <div className="ant-comment-inner">
        {avatar && (
          <div className="ant-comment-avatar">
            <img src={avatar} alt={author} />
          </div>
        )}
        <div className="ant-comment-content">
          <div className="ant-comment-content-author">
            {author && (
              <span className="ant-comment-content-author-name">{author}</span>
            )}
          </div>
          {content && (
            <div className="ant-comment-content-detail">
              <p>{content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
