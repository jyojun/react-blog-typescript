import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <Link to="/posts/new">New</Link>
      <Link to="/posts">Post</Link>
      <Link to="/profiles">Profile</Link>
    </footer>
  );
}
