import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { PostProps } from "./PostList";
import { getDoc, doc } from "firebase/firestore";
import { db } from "firebaseApp";
import MarkDown from "marked-react";
import Loader from "./Loader";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const postId = params?.id;
  const getPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
  };
  const handleDelete = () => {
    console.log("delete");
  };
  useEffect(() => {
    if (postId) getPost(postId);
  }, [postId]);
  return (
    <>
      <div className="post__detail">
        {post ? (
          <div className="post__item">
            <div className="post__title">{post?.title}</div>
            <div className="post__profile-box">
              <div className="post__info">
                <div className="post__author-name">Posted by {post?.email}</div>
                <div className="post__date">{post?.createdAt}</div>
              </div>
              <div className="post__utils-box">
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
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
