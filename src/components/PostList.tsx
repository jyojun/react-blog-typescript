import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType;
}

export interface CommentInterface {
  content: string;
  uid: string;
  email: string;
  createdAt: string;
}

export interface PostProps {
  id?: string;
  title: string;
  tag?: TagType;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  uid: string;
  comments?: CommentInterface[];
}

type TabType = "all" | "my" | "Daily" | "Studies" | "Hobbies" | "Travels";

export type TagType = "Daily" | "Studies" | "Hobbies" | "Travels";
export const TAGS: TagType[] = ["Daily", "Studies", "Hobbies", "Travels"];

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    setPosts([]);
    let postsRef = collection(db, "posts");
    let postsQuery = query(postsRef, orderBy("createdAt", "desc"));

    if (activeTab === "my" && user) {
      // 로그인 된 유저의 글 만 조회
      postsQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
    } else if (activeTab === "all") {
      // 모든 글 조회
      postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    } else {
      postsQuery = query(
        postsRef,
        where("tag", "==", activeTab),
        orderBy("createdAt", "desc")
      );
    }
    const data = await getDocs(postsQuery);

    data?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj] as PostProps[]);
    });
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));
      toast.success("게시글이 삭제되었습니다.");
      getPosts();
    }
  };

  useEffect(() => {
    getPosts();
  }, [activeTab]);
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
          {TAGS?.map((tag) => (
            <div
              role="presentation"
              key={tag}
              onClick={() => setActiveTab(tag)}
              className={activeTab === tag ? "post__navigation--active" : ""}
            >
              {tag}
            </div>
          ))}
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
                    {post?.tag && <div className="post__tag">{post?.tag}</div>}
                    <div className="post__edit">
                      <Link to={`/posts/edit/${post.id}`}>Edit</Link>
                    </div>
                    <div
                      className="post__delete"
                      role="presentation"
                      onClick={() => handleDelete(post.id as string)}
                    >
                      Delete
                    </div>
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
