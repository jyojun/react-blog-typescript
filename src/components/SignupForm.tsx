import { Link } from "react-router-dom";

export default function SignupForm() {
  return (
    <form action="/post" method="POST" className="form form--lg">
      <h1 className="form__title">회원가입</h1>
      <div className="form__block">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" required />
      </div>
      <div className="form__block">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </div>
      <div className="form__block">
        <label htmlFor="password_confirm">Confirm Password</label>
        <input
          type="password"
          name="password_confirm"
          id="password_confirm"
          required
        />
      </div>
      <div className="form__block">
        Already have an account?
        <Link to="/login" className="form__link">
          Login
        </Link>
      </div>
      <div className="form__block">
        <input type="submit" value="로그인" className="form__btn--submit" />
      </div>
    </form>
  );
}
