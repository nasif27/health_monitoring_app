import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { Button, CloseButton, Container, Dropdown, Form, Modal } from "react-bootstrap";
import { APIContext } from "../APIContext";

export default function PatientInfoModal({
    modalShow,
    handleClosePatientInfoModal,
    handleShowDisOptModal,
    // selectedPatientInfo,
    // setSelectedPatientInfo,
}) {
    const apiURL = useContext(APIContext).apiURL;

    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [ongoingMed, setOngoingMed] = useState('');

    const handleCreatePatientInfo = (e) => {
        e.preventDefault();

        // get stored JWT token
        const token = localStorage.getItem("authToken");

        // Decode the token to get user id
        const decode = jwtDecode(token);
        const userId = decode.id;

        // Prepare data to be sent
        const data = {
            id: userId,
            full_name: fullName,
            age: age,
            gender: gender,
            height: height,
            weight: weight,
            ongoing_med: ongoingMed
        };

        // Make API call to create patient info in DB
        axios
        .put(`${apiURL}/userinfo/${userId}`, data)
        .then((res) => {
            // setSelectedPatientInfo(res.data);
            // console.log(selectedPatientInfo);
            console.log('Successfully create patient info', res.data);
            handleClosePatientInfoModal();
        })
        .catch((error) => {
            console.log('Error', error);
        })
    };


    return (
        <Modal
            show={modalShow === 'patientInfo'}
            onHide={handleClosePatientInfoModal}
            animation={false}
            centered
        >
            <Modal.Header>
                <CloseButton
                    // className="mt-3 mx-2 my-0"
                    onClick={handleClosePatientInfoModal} 
                />
            </Modal.Header>
            
            <Modal.Body className="my-3 d-flex flex-column justify-content-center align-items-center">
                {/* <CloseButton
                    className="d-flex justify-content-end align-items-end" 
                    onClick={handleClosePatientInfoModal} 
                /> */}
                <h2 
                    className="mb-4" 
                    style={{fontWeight: "bold"}}
                >
                    Patient Info
                </h2>

                <Container>
                    <Form
                        className="d-flex flex-column gap-2 px-3"
                        onSubmit={handleCreatePatientInfo}
                    >
                        <Form.Group>
                            <Form.Control 
                                type="text"
                                placeholder="Enter full name"
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control 
                                type="number"
                                placeholder="Enter age"
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="d-flex gap-2">
                            <Form.Control 
                                type="text"
                                placeholder="Choose gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            />

                            <Dropdown>
                                <Dropdown.Toggle variant="secondary"></Dropdown.Toggle>
                    
                                <Dropdown.Menu>
                                    <Dropdown.Item>Male</Dropdown.Item>
                                    <Dropdown.Item>Female</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control 
                                type="number"
                                placeholder="Enter height (cm)"
                                onChange={(e) => setHeight(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control 
                                type="number"
                                placeholder="Enter weight (kg)"
                                onChange={(e) => setWeight(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter ongoing medication"
                                onChange={(e) => setOngoingMed(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* <Button className="mt-3" variant="success" type="submit">
                            Add
                        </Button>

                        <Container 
                            className="d-flex justify-content-between px-0 mt-3"
                        >
                            <Button 
                                style={{color: 'blue', background: 'none', border: 'none', padding: 0}}
                                onClick={handleShowDisOptModal}
                            >
                                Back
                            </Button>

                            <Button 
                                style={{color: 'red', background: 'none', border: 'none', padding: 0}}
                                onClick={handleClosePatientInfoModal}
                            >
                                Cancel
                            </Button>
                        </Container> */}

                        <Container 
                            className="d-flex justify-content-between px-0 mt-3"
                        >
                            <Button 
                                variant="primary"
                                onClick={handleShowDisOptModal}
                            >
                                ⟪ Back
                            </Button>

                            <Button variant="success" type="submit">
                                Proceed ⟫
                            </Button>
                        </Container>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    );
}