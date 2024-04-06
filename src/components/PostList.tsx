import { useState } from "react";
import { Link } from "react-router-dom";

interface PostListProps {
  hasNavigation?: boolean;
}

type TabType = "all" | "my";

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
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
        {[...Array(10)].map((e, index) => (
          <div className="post__item" key={index}>
            <Link to={`/posts/${index}`}>
              <h2 className="post__title">
                Translation of Lorem Ipsum {index}
              </h2>
              <div className="post__profile-box">
                <div className="post__info">
                  <div className="post__author-name">
                    Posted by {"Hyojun Park"}
                  </div>
                  <div className="post__date">Mar 16. 2024 02:53 PM</div>
                </div>
                <div className="post__utils-box">
                  <div className="post__edit">Edit</div>
                  <div className="post__delete">Delete</div>
                </div>
              </div>
              <div className="post__content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                imperdiet tortor non malesuada tempor. Donec gravida eleifend
                nunc, id cursus dui dapibus eget. Cras vestibulum tellus quis
                arcu blandit dignissim. Curabitur tincidunt ex sed quam tempus
                dignissim. Quisque eget suscipit mauris. Nullam a faucibus
                neque, luctus suscipit eros. Quisque vel urna egestas, luctus
                ligula in, pellentesque risus. Sed id metus et felis
                sollicitudin lacinia sit amet in orci. Ut ultricies nibh eu
                condimentum venenatis.
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
