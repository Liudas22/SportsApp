import { Button } from "react-bootstrap";
import "./HomePage.css"
import {Paths} from "../../constants/Paths"

function HomePage() {

  const token = localStorage.getItem("accessToken");

  const random = (e) => {
    e.preventDefault();



    fetch(Paths.Api_URL + 'Get', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
  };

  return (
    <div className="HomePage" >
      {/* <Button onClick={(e) => random(e, token)}>
        Random funkcija
      </Button> */}
    </div>
  );
}

export default HomePage;