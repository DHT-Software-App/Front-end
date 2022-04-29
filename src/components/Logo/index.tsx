export const Logo = ({ className, ...props }: { className: string }) => {
	return (
		<img
			src="http://www.dryhitec.com/assets/img/logo.png"
			className={className}
			{...props}
		/>
	);
};
