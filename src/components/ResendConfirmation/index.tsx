import { resend_pin_request } from "actions/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "components/Loading";

type ResendConfirmationProps = {
  to: string;
};

export const ResendConfirmation = ({ to }: ResendConfirmationProps) => {
  const dispatch = useDispatch();
  const [forwarded, setForwarded] = useState(false);
  const { loading } = useSelector(({ auth }: any) => auth);

  const resend = () => {
    dispatch(resend_pin_request(to));

    setForwarded(true);
  };

  return (
    <>
      {loading ? (
        <Loading width={25} />
      ) : (
        <button
          id="enable-account"
          disabled={forwarded}
          className=" bg-blue-light text-white uppercase text-xs font-semibold px-4 py-2 rounded-sm whitespace-nowrap disabled:bg-slate-100 disabled:text-slate-300"
          onClick={resend}
        >
          {forwarded ? "forwarded" : "resend confirmation"}
        </button>
      )}
    </>
  );
};