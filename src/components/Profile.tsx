import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image">
          <img src="https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png" />
        </div>
        <div>
          <div className="profile__name">박효준</div>
          <div className="profile__email">test@test.com</div>
          <div className="profile__university">
            Hankuk University of Foreign Studies
          </div>
          <div className="profile__description">
            Hyojun Park is a student of computer science at Hankuk Univeristy of
            Foreign Studies. His research interests include distributed
            robotics, mobile computing and programmable matter. He leads the
            Robotic Neurobiology group, which develops self-reconfiguring
            robots, systems of self-organizing robots, and mobile sensor
            networks.
          </div>
        </div>
      </div>
      <Link to="/" className="profile__logout">
        로그아웃
      </Link>
    </div>
  );
}
