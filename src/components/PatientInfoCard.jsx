import { useContext, useEffect, useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { APIContext } from "../APIContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function PatientInfoCard({patientInfoUpdateStatus, setPatientInfoUpdateStatus}) {
    const apiURL = useContext(APIContext).apiURL;
    const profilePic = 'https://wallpapers.com/images/featured/iron-man-superhero-ponky3hlfivddo2m.jpg';
    const profilePicRing = ['green', 'orange', 'red'];  // depends on BP reading

    const token = localStorage.getItem("authToken");
    const decode = jwtDecode(token);
    const userId = decode.id;


    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [ongoingMed, setOngoingMed] = useState('');

    const [updatedFullName, setUpdatedFullName] = useState('');
    const [updatedAge, setUpdatedAge] = useState(null);
    const [updatedGender, setUpdatedGender] = useState('');
    const [updatedHeight, setUpdatedHeight] = useState(null);
    const [updatedWeight, setUpdatedWeight] = useState(null);
    const [updatedOngoingMed, setUpdatedOngoingMed] = useState('');

    // run once
    useEffect(() => {
        // const token = localStorage.getItem("authToken");

        if (token && patientInfoUpdateStatus === false) {
            // const decode = jwtDecode(token);
            // const userId = decode.id;

            axios
            .get(`${apiURL}/userinfo/${userId}`)
            .then((res) => {
                setFullName(res.data.full_name);
                setAge(res.data.age);
                setGender(res.data.gender);
                setHeight(res.data.height);
                setWeight(res.data.weight);
                setOngoingMed(res.data.ongoing_med);
            })
            .catch((error) => {
                console.log("Error:", error);
            })
        } else if (token && patientInfoUpdateStatus === true) {
            axios
            .get(`${apiURL}/userinfo/${userId}`)
            .then((res) => {
                setUpdatedFullName(res.data.full_name);
                setUpdatedAge(res.data.age);
                setUpdatedGender(res.data.gender);
                setUpdatedHeight(res.data.height);
                setUpdatedWeight(res.data.weight);
                setUpdatedOngoingMed(res.data.ongoing_med);
                setPatientInfoUpdateStatus(null);
            })
            .catch((error) => {
                console.log("Error:", error);
            })
        }
    }, [apiURL, token, userId, patientInfoUpdateStatus, setPatientInfoUpdateStatus]);

    return (
        <>
            <Card
                className="mt-4 py-4 px-0" 
                style={{backgroundColor: 'grey'}}
            >
                <Card.Body className="py-0">
                    <Row>
                        <Col 
                            className="d-flex justify-content-center align-items-center p-0"
                            // style={{width: '100px'}}
                        >
                            <Image
                                src={profilePic}
                                roundedCircle
                                style={{
                                    width: 130,
                                    height: 130,
                                    border: `5px solid ${profilePicRing[0]}`,
                                }}
                            />
                        </Col>

                        <Col className="d-flex flex-column text-white" style={{paddingLeft: 15, paddingRight: 10}}>
                            <p className="mb-0">
                                <strong>Full Name: </strong>{patientInfoUpdateStatus === false ? fullName : updatedFullName}
                            </p>
                            <p className="mb-0">
                                <strong>Age: </strong>{patientInfoUpdateStatus === false ? age : updatedAge} y/o
                            </p>
                            <p className="mb-0">
                                <strong>Gender: </strong>{patientInfoUpdateStatus === false ? gender : updatedGender}
                            </p>
                            <p className="mb-0">
                                <strong>Height: </strong>{patientInfoUpdateStatus === false ? height : updatedHeight} cm
                            </p>
                            <p className="mb-0">
                                <strong>Weight: </strong>{patientInfoUpdateStatus === false ? weight : updatedWeight} kg
                            </p>
                            <p className="mb-0">
                                <strong>Ongoing Medication: </strong>{patientInfoUpdateStatus === false ? ongoingMed : updatedOngoingMed}
                            </p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}