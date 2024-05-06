import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  // 브라우저 창 크기에 따라 메뉴 상태를 조정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo" onClick={closeMenu}>
        Blog
      </Link>
      <button className="menu-toggle" onClick={toggleMenu}>
        <div className={`hamburger ${isMenuOpen ? "open" : ""}`}></div>
      </button>
      <div className={`menu-links ${isMenuOpen ? "show" : ""}`}>
        <Link to="/posts/write" onClick={closeMenu}>
          New
        </Link>
        <Link to="/posts" onClick={closeMenu}>
          Post
        </Link>
        <Link to="/profile" onClick={closeMenu}>
          Profile
        </Link>
      </div>
    </header>
  );
}
