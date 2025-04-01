import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { Button, CloseButton, Container, Dropdown, Form, Modal } from "react-bootstrap";
import { APIContext } from "../APIContext";

export default function PatientInfoUpdateModal({
    modalShow,
    handleClosePatientInfoModal,
    setPatientInfoUpdateStatus
}) {
    const apiURL = useContext(APIContext).apiURL;
    
    // get stored JWT token
    const token = localStorage.getItem("authToken");

    // Decode the token to get user id
    const decode = jwtDecode(token);
    const userId = decode.id;

    const [selectedPatientInfo, setSelectedPatientInfo] = useState(null);

    useEffect(() => {
        axios
        .get(`${apiURL}/userinfo/${userId}`)
        .then((res) => {
            setSelectedPatientInfo(res.data);
            // console.log(res.data);
        })
        .catch((error) => {
            console.log('Error:', error);
        })
    }, [apiURL, userId]);


    const handleChange = (e) => {
        setSelectedPatientInfo({ ...selectedPatientInfo, [e.target.name]: e.target.value });
    }

    
    const handleUpdatePatientInfo = (e) => {
        e.preventDefault();

        // Prepare data to be sent
        const updatedData = {
            id: userId,
            full_name: selectedPatientInfo.full_name,
            age: selectedPatientInfo.age,
            gender: selectedPatientInfo.gender,
            height: selectedPatientInfo.height,
            weight: selectedPatientInfo.weight,
            ongoing_med: selectedPatientInfo.ongoing_med
        };

        // Make API call to create patient info in DB
        axios
        .put(`${apiURL}/userinfo/${userId}`, updatedData)
        .then((res) => {
            console.log('Successfully update patient info', res.data);
            setPatientInfoUpdateStatus(true);
            handleClosePatientInfoModal();
        })
        .catch((error) => {
            console.log('Error', error);
        })
    };


    return (
        <>
            {selectedPatientInfo &&
                <Modal
                    show={modalShow === 'editPatientInfo'}
                    onHide={handleClosePatientInfoModal}
                    animation={false}
                    centered
                >
                    <Modal.Header>
                        <CloseButton
                            onClick={handleClosePatientInfoModal} 
                        />
                    </Modal.Header>
                    
                    <Modal.Body className="my-3 d-flex flex-column justify-content-center align-items-center">
                        <h2 
                            className="mb-4" 
                            style={{fontWeight: "bold"}}
                        >
                            Update Patient Info
                        </h2>

                        <Container>
                            <Form
                                className="d-flex flex-column gap-2 px-3"
                                onSubmit={handleUpdatePatientInfo}
                            >
                                <Form.Group>
                                    <Form.Control 
                                        type="text"
                                        name="full_name"
                                        placeholder="Enter full name"
                                        value={selectedPatientInfo.full_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control 
                                        type="number"
                                        name="age"
                                        placeholder="Enter age"
                                        value={selectedPatientInfo.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="d-flex gap-2">
                                    <Form.Control 
                                        type="text"
                                        name="gender"
                                        placeholder="Choose gender"
                                        value={selectedPatientInfo.gender}
                                        onChange={handleChange}
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
                                        name="height"
                                        placeholder="Enter height (cm)"
                                        value={selectedPatientInfo.height}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control 
                                        type="number"
                                        name="weight"
                                        placeholder="Enter weight (kg)"
                                        value={selectedPatientInfo.weight}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="ongoing_med"
                                        placeholder="Enter ongoing medication"
                                        value={selectedPatientInfo.ongoing_med}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Button className="mt-3" variant="success" type="submit">
                                    Update
                                </Button>
                            </Form>
                        </Container>
                    </Modal.Body>
                </Modal>
            }
        </>
    );
}