import { Link } from "react-router-dom";

export default function PostDetail() {
  return (
    <>
      <div className="post__detail">
        <div className="post__box">
          <div className="post__title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
          <div className="post__profile-box">
            <div className="post__info">
              <div className="post__author-name">Posted by {"Hyojun Park"}</div>
              <div className="post__date">Mar 16. 2024 02:53 PM</div>
            </div>
            <div className="post__utils-box">
              <div className="post__edit">
                <Link to={`/posts/edit/1`}>Edit</Link>
              </div>
              <div className="post__delete">Delete</div>
            </div>
          </div>
          <div className="post__content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            imperdiet tortor non malesuada tempor. Donec gravida eleifend nunc,
            id cursus dui dapibus eget. Cras vestibulum tellus quis arcu blandit
            dignissim. Curabitur tincidunt ex sed quam tempus dignissim. Quisque
            eget suscipit mauris. Nullam a faucibus neque, luctus suscipit eros.
            Quisque vel urna egestas, luctus ligula in, pellentesque risus. Sed
            id metus et felis sollicitudin lacinia sit amet in orci. Ut
            ultricies nibh eu condimentum venenatis.
          </div>
        </div>
      </div>
    </>
  );
}
