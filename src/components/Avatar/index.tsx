import { Link } from "react-router-dom";
const defaultAvatar = require("assets/images/avatar.png");

export const Avatar = ({ link, src = defaultAvatar, ...props }: any) => {
  return (
    <div>
      {link ? (
        <Link to={link}>
          <img src={src} {...props} />
        </Link>
      ) : (
        <img src={src} {...props} />
      )}
    </div>
  );
};