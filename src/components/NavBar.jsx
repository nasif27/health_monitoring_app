import { useEffect } from "react";
import { Dropdown, DropdownButton, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

export default function NavBar({
    handleShowDisOptModal,
    setModalShow,
    // selectedPatientInfo,
    // setSelectedPatientInfo,
}) {
    const [authToken, setAuthToken] = useLocalStorage('authToken', '');
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate('/signin');
        }
    }, [authToken, navigate]);

    const handleSignOut = () => {
        setAuthToken('');
    };

    const handleShowPatientInfoUpdateModal = () => {
        setModalShow('editPatientInfo');
    };

    return (
        <Navbar bg="success" sticky="top">
            <Navbar.Collapse
                className="justify-content-between"
                style={{paddingRight: "15px", paddingLeft: "15px"}}
            >
                <Navbar.Brand style={{color: "white"}}>MyHealth</Navbar.Brand>
                
                {/* <Button 
                    variant="success"
                    onClick={handleShowDisOptModal}
                >
                    +
                </Button> */}

                {/* <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        :
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="">Profile</Dropdown.Item>
                        <Dropdown.Item href="">Setting</Dropdown.Item>
                        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}

                <DropdownButton
                    // as={ButtonGroup}
                    // id="dropdown-button-drop-down-centered"
                    align="end"
                    // drop="down-centered"
                    // className="py-1"
                    variant="success"
                    title={'Menu'}
                >
                    {/* <div className="d-flex flex-column justify-content-center align-items-center"> */}
                        <Dropdown.Item 
                            onClick={handleShowPatientInfoUpdateModal}
                        >
                            Update Patient Info
                        </Dropdown.Item>

                        <Dropdown.Item onClick={handleShowDisOptModal}>Add Diseases</Dropdown.Item>

                        <Dropdown.Item>Theme</Dropdown.Item>

                        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                    {/* </div> */}
                </DropdownButton>

            </Navbar.Collapse>
        </Navbar>
    );
}