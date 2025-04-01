// import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    const navigateToMainPage = () => {
        navigate('/main');
    };

    return (
        <Container 
            className="d-flex flex-column justify-content-center align-items-center"
            style={{height: "100vh"}}
        >
            <h3>
                Welcome to MyHealth app. You can use this app 
                to monitor your diseases.
            </h3>

            <Button 
                variant="primary"
                className="mt-4"
                onClick={navigateToMainPage}
            >
                Get started →
            </Button>

            <h5 className="mt-4">
                Disclaimer: This app is not perfect yet. Be patience and stay tuned for the next update.
            </h5>
        </Container>
    );
}