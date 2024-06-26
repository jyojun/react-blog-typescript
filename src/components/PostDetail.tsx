import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PostProps } from "./PostList";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import MarkDown from "marked-react";
import Loader from "./Loader";
import { toast } from "react-toastify";
import Comments from "./Comments";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const postId = params?.id;
  const navigate = useNavigate();

  const getPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
  };
  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글이 삭제되었습니다.");
      navigate("/");
    }
  };
  useEffect(() => {
    if (postId) getPost(postId);
  }, [postId]);
  return (
    <>
      <div className="post__detail">
        {post ? (
          <>
            <div className="post__item">
              <div className="post__title">{post?.title}</div>
              <div className="post__profile-box">
                <div className="post__info">
                  <div className="post__author-name">
                    Posted by {post?.email}
                  </div>
                  <div className="post__date">{post?.createdAt}</div>
                </div>
                <div className="post__utils-box">
                  {post?.tag && <div className="post__tag">{post?.tag}</div>}
                  <div className="post__edit">
                    <Link to={`/posts/edit/${post?.id}`}>Edit</Link>
                  </div>
                  <div
                    className="post__delete"
                    role="presentation"
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </div>
              <div className="post__content post__text--pre-wrap">
                <MarkDown>{post?.content}</MarkDown>
              </div>
            </div>
            <Comments post={post} getPost={getPost} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
