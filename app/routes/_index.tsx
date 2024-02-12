import './../styles/App.css';
import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export default function Index() {
  const navigate = useNavigate();

	useEffect(() => {
		navigate('/contacts/main', { replace: true })
		return;
	}, [navigate])

  return (
    <></>
  );
}
