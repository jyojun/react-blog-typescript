import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <form action="/post" method="POST" className="form form--lg">
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" required />
      </div>
      <div className="form__block">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </div>
      <div className="form__block">
        Don't have an account?
        <Link to="/signup" className="form__link">
          Sign Up
        </Link>
      </div>
      <div className="form__block">
        <input type="submit" value="로그인" className="form__btn--submit" />
      </div>
    </form>
  );
}
