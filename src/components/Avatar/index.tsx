import { Link } from "react-router-dom";

export const Avatar = ({ link, src = "", ...props }: any) => {
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
