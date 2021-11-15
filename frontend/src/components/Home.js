import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate}  from "react-router-dom";
import Global from "./Global";


export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    async function getToken() {

      try {
        const response = await axios.get(
          Global.baseUrl + `/token?code=${code}&client_id=${Global.client_id}&client_secret=${Global.client_secret}`);

        localStorage.setItem('token', response.data.access_token)
        
      } catch (error) {
        console.log(error);
      }
    }
    getToken()
    
  }, [code]);

  return <div>{navigate("/repositories")}</div>;
}
