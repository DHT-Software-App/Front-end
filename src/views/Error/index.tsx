import { Link } from "react-router-dom";

type ErrorProps = {
  title: string;
  description: string;
  code: number;
};

export const Error = ({
  code,
  description,
  title
}: ErrorProps) => {
  return <div className="h-full flex flex-col items-center justify-center">

    <h1 className="uppercase text-6xl font-bold mb-10">{title}</h1>
    <p className="font-semibold text-zinc-600 text-2xl mb-4">{description}</p>
    <p className="font-semibold text-zinc-500 text-xl mb-16">Código de Error: {code}</p>

    <Link to="/" className="bg-blue font-bold text-base uppercase rounded-sm px-8 py-3 text-white hover:cursor-pointer">GO TO HOMEPAGE</Link>
  </div>
}