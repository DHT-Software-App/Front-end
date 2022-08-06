import { SignForm } from "components/Sign/Form"
import { useAuth } from "hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export const Sign = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  return isAuthenticated !== undefined ? <div className="min-h-screen grid place-content-center bg-blue-dark">
    <SignForm />
  </div> : <>Loading</>
}