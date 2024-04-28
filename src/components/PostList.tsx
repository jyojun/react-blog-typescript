import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import MarkDown from "marked-react";
import AuthContext from "context/AuthContext";

interface PostListProps {
  hasNavigation?: boolean;
}

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
}

type TabType = "all" | "my";

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);
  const getPosts = async () => {
    setPosts([]);
    const data = await getDocs(collection(db, "posts"));

    data?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj] as PostProps[]);
    });
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            나의 글
          </div>
        </div>
      )}
      <div className="post__list">
        {posts?.length > 0 ? (
          posts.map((post, index) => (
            <div className="post__item" key={index}>
              <Link to={`/posts/${post?.id}`}>
                <h2 className="post__title">{post?.title}</h2>
              </Link>
              <div className="post__profile-box">
                <div className="post__info">
                  <div className="post__author-name">
                    Posted by {post?.email}
                  </div>
                  <div className="post__date">{post?.createdAt}</div>
                </div>
                {post?.email === user?.email && (
                  <div className="post__utils-box">
                    <div className="post__edit">
                      <Link to={`/posts/edit/${post.id}`}>Edit</Link>
                    </div>
                    <div className="post__delete">Delete</div>
                  </div>
                )}
              </div>
              <div className="post__content post__text--pre-wrap">
                {post?.summary}
              </div>
            </div>
          ))
        ) : (
          <div className="post__no-post">No Posts</div>
        )}
      </div>
    </>
  );
}
