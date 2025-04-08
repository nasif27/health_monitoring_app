import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import DiseasesOptionModal from "../components/DiseasesOptionModal";
import PatientInfoModal from "../components/PatientInfoModal";
import HighBPPage from "../components/HighBPPage";
import PatientInfoUpdateModal from "../components/PatientInfoUpdateModal";
import PatientInfoCard from "../components/PatientInfoCard";
import { Container } from "react-bootstrap";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
    const [modalShow, setModalShow] = useState(null);
    
    const [patientInfoUpdateStatus, setPatientInfoUpdateStatus] = useState(false);
    
    const [authToken, setAuthToken] = useLocalStorage('authToken', '');
    // const authToken = localStorage.getItem('authToken');

    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate("/signin");
        }
    }, [authToken, navigate]);

    const handleSignOut = () => {
        setAuthToken('');
    };

    const handleShowDisOptModal = () => {
        setModalShow('diseasesOption');
    };

    const handleClose = () => {
        setModalShow(null);
    };

    const handleShowPatientInfoModal = () => {
        setModalShow('patientInfo');
    };

    return (
        <>
            <NavBar 
                handleShowDisOptModal={handleShowDisOptModal}
                setModalShow={setModalShow}
                handleSignOut={handleSignOut}
                // selectedPatientInfo={selectedPatientInfo}
                // setSelectedPatientInfo={setSelectedPatientInfo}
            />

            <Container 
                className="d-flex flex-column justify-content-center align-items-center px-0"
                // style={{}}
            >
                <PatientInfoCard 
                    patientInfoUpdateStatus={patientInfoUpdateStatus}
                    setPatientInfoUpdateStatus={setPatientInfoUpdateStatus}
                />

                <HighBPPage
                    // patientInfoUpdateStatus={patientInfoUpdateStatus}
                    // setPatientInfoUpdateStatus={setPatientInfoUpdateStatus} 
                />
            </Container>

            <DiseasesOptionModal 
                modalShow={modalShow} 
                handleCloseDisOptModal={handleClose}
                handleShowPatientInfoModal={handleShowPatientInfoModal}
            />

            <PatientInfoModal
                modalShow={modalShow}
                handleClosePatientInfoModal={handleClose}
                handleShowDisOptModal={handleShowDisOptModal}
                // selectedPatientInfo={selectedPatientInfo}
                // setSelectedPatientInfo={setSelectedPatientInfo}
            />

            <PatientInfoUpdateModal 
                modalShow={modalShow}
                handleClosePatientInfoModal={handleClose}
                setPatientInfoUpdateStatus={setPatientInfoUpdateStatus}
            />
        </>
    );
}