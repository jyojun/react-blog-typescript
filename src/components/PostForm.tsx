import { doc, addDoc, getDoc, collection, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { TagType, PostProps, TAGS } from "./PostList";
import { db } from "firebaseApp";

export default function PostForm() {
  const params = useParams();
  const postId = params?.id;
  const [post, setPost] = useState<PostProps | null>(null);
  const [title, setTitle] = useState<string>("");
  const [tag, setTag] = useState<TagType>("Daily");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
  };

  useEffect(() => {
    if (postId) getPost(postId);
  }, [postId]);

  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setTag(post?.tag as TagType);
      setSummary(post?.summary);
      setContent(post?.content);
    }
  }, [post]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post && post.id) {
        // post 가 있는 경우, firestore 수정
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          title: title,
          tag: tag,
          summary: summary,
          content: content,
          updatedAt: new Date()?.toLocaleString("ko", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        });
        toast?.success("게시글을 수정했습니다.");
        navigate(`/posts/${post.id}`);
      } else {
        await addDoc(collection(db, "posts"), {
          title: title,
          tag: tag,
          summary: summary,
          content: content,
          createdAt: new Date()?.toLocaleString("ko", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          email: user?.email,
          uid: user?.uid,
        });
        toast?.success("게시글을 생성했습니다.");
        navigate("/");
      }
    } catch (e: any) {
      console.log(e);
      toast?.error(e?.code);
    }
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === "title") {
      setTitle(value);
    }

    if (name === "tag") {
      setTag(value as TagType);
    }

    if (name === "summary") {
      setSummary(value);
    }

    if (name === "content") {
      setContent(value);
    }
  };
  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={onChange}
          value={title}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor="tag">태그</label>
        <select name="tag" id="tag" onChange={onChange}>
          <option value="">태그를 선택해주세요.</option>
          {TAGS?.map((tag) => (
            <option value={tag} key={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          onChange={onChange}
          value={summary}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          onChange={onChange}
          value={content}
          required
        />
      </div>
      <div className="form__block">
        <input
          type="submit"
          value={post ? "수정" : "제출"}
          className="form__btn--submit"
        />
      </div>
    </form>
  );
}
