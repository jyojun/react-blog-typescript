import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { useContext } from "react";
import { toast } from "react-toastify";

const onSignout = async () => {
  try {
    const auth = getAuth(app);
    await signOut(auth);
    toast.success("로그아웃에 성공하였습니다.");
  } catch (error: any) {
    console.log(error);
    toast.error(error?.code);
  }
};

export default function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image">
          <img
            src="https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png"
            alt="profile_img"
          />
        </div>
        <div>
          <div className="profile__name">{user?.displayName || "사용자"}</div>
          <div className="profile__email">{user?.email}</div>
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
      <div role="presentation" className="profile__logout" onClick={onSignout}>
        로그아웃
      </div>
    </div>
  );
}
