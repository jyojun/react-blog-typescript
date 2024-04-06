import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        Blog
      </Link>
      <div>
        <Link to="/posts/new">New</Link>
        <Link to="/posts">Post</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </header>
  );
}
