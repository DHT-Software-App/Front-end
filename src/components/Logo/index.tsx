const logo = require("assets/images/logo.png");

export const Logo = ({ className, ...props }: { className: string }) => {
	return <img src={logo} className={className} {...props} />;
};
