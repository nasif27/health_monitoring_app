import axios from "axios";
import { useContext, useState } from "react";
import { Alert, Button, Container, Modal } from "react-bootstrap";
import { APIContext } from "../APIContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function DiseasesOptionModal({
    modalShow, 
    handleCloseDisOptModal,
    handleShowPatientInfoModal
}) {
    const apiURL = useContext(APIContext).apiURL;

    const navigate = useNavigate();

    const token = localStorage.getItem("authToken");
    const decode = jwtDecode(token);
    const userId = decode.id;

    const [diseaseType, setDiseaseType] = useState('');
    const [disAlertShow, setDisAlertShow] = useState(false);

    // if no patient info, navigate to patient info modal...else navigate to disease main page
    const handleNavigateToMainPage = (e) => {
        e.preventDefault();

        // const diseaseType = e.target.name;

        // require Async
        // const res = await axios.get(`${apiURL}/userinfo/${userId}`);

        // if (!res.data.full_name && !res.data.age && !res.data.gender && !res.data.height && !res.data.weight && !res.data.ongoing_med) {
        //     console.log(res.data);
        //     handleShowPatientInfoModal();
        // } else {
        //     console.log('Ada');
        //     navigate('/');
        // }

        // do not require Async
        axios
        .get(`${apiURL}/userinfo/${userId}`)
        .then((res) => {
            if (!res.data.full_name && !res.data.age && !res.data.gender && !res.data.height && !res.data.weight && !res.data.ongoing_med) {
                console.log(res.data);
                handleShowPatientInfoModal();
            } else {
                console.log(`${e.target.name} Data Already Exist`);
                setDiseaseType(e.target.name);
                handleCloseDisOptModal();
                navigate('/main');
                setDisAlertShow(true);
            }
        })
        .catch((error) => {
            console.log("Error", error);
        })
    };

    return (
        <>
            <Modal
                show={modalShow === 'diseasesOption'}
                onHide={handleCloseDisOptModal}
                animation={false}
                centered
            >
                {/* <Modal.Header closeButton></Modal.Header> */}
                <Modal.Body 
                    className="d-flex flex-column justify-content-center align-items-center my-2"
                >
                    <h2 className="mb-4">Choose Disease</h2>

                    <Container className="d-flex flex-column gap-2">
                        <Button
                            name="High Blood Pressure" 
                            variant="success"
                            onClick={handleNavigateToMainPage}
                        >
                            High Blood Pressure
                        </Button>
                        <Button variant="success" disabled>Diabetes (coming soon!)</Button>
                        <Button variant="success" disabled>Anxiety Disorder (coming soon!)</Button>
                    </Container>

                    <Button 
                        className="mt-4"
                        variant="danger"
                        onClick={handleCloseDisOptModal}
                    >
                        Cancel
                    </Button>
                </Modal.Body>
            </Modal>

            <Alert 
                show={disAlertShow === true} 
                variant="danger" 
                className="fixed-top text-center"
                onClose={() => setDisAlertShow(false)} 
                dismissible
            >
                <Alert.Heading>Oopss!</Alert.Heading>
                <p>
                    {diseaseType} Data Already Exist
                </p>
            </Alert>
        </>
    );
}