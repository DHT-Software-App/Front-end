const loading = require("assets/images/loading.gif");

type LoadingProps = {
	width: any;
};
export const Loading = ({ width }: LoadingProps) => {
	return <img src={loading} style={{ width }} />;
};