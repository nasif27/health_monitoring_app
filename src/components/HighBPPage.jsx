import { Button, Container, Table, Modal, Form, CloseButton, DropdownButton, Dropdown } from "react-bootstrap";
// import PatientInfoCard from "./PatientInfoCard";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { APIContext } from "../APIContext";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";

export default function HighBPPage() {
    const apiURL = useContext(APIContext).apiURL;

    // JWT
    const token = localStorage.getItem("authToken");
    const decode = jwtDecode(token);
    const userId = decode.id;

    const [highBPData, setHighBPData] = useState([]);   // backend
    // const [highBPDataArray, setHighBPDataArray] = useState([]);   //frontend

    // const [updateId, setUpdateId] = useState(null);
    // const [selectedData, setSelectedData] = useState({});
    const [formData, setFormData] = useState({id: null, input_date: '', input_time: '', systolic: null, dystolic: null, pulse_rate: null});
    const [updatingItem, setUpdatingItem] = useState(null);

    const [modalShow, setModalShow] = useState(null);


    const handleShowCreateModal = () => {
        setModalShow('createHighBPData');
    };
    
    const handleShowUpdateModal = (item) => {
        // setUpdateId(id);
        // setSelectedData(item);
        setFormData(item);
        setUpdatingItem(item);
        setModalShow('updateHighBPData');
    };

    const handleCloseModal = () => {
        // setFormData({});
        // setUpdatingItem(null);
        setModalShow(null);
        // setSelectedData(null);
        // setUpdateId(null);
    };

    // // convert date format from dd/mm/yyyy  to  yyyy-mm-dd
    // const convertDateFormat = (dateString) => {
    //     const [dd, mm, yyyy] = dateString.split('/');
    //     return `${yyyy}-${mm}-${dd}`;
    // };

    // Sort table by date & time
    // const sortHighBPData = () => {
    //     // const sortedData = [...highBPData].sort((a, b) => new Date(`${a.input_date} ${a.input_time}`) - new Date(`${b.input_date} ${b.input_time}`));
    //     const sortedData = [...highBPData].sort((a, b) => new Date(a.input_date) - new Date(b.input_date));
    //     console.log(sortedData);
    //     setHighBPData(sortedData);
    // };
    
    // GET/READ
    useEffect(() => {
        if (token) {
            axios
            .get(`${apiURL}/highBP/user/${userId}`)
            .then((res) => {
                // setHighBPData(res.data);
                const rawData = res.data;
                const sortedData = rawData.sort((a, b) => new Date(`${a.input_date} ${a.input_time}`) - new Date(`${b.input_date} ${b.input_time}`));
                setHighBPData(sortedData);
            })
            .catch((error) => {
                console.log('Error:', error);
            })
        }
    }, [apiURL, token, userId, highBPData]);    // highBPData need to be put inside dependencies, so that it can be sorted in real-time

    
    // POST/CREATE
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [systolic, setSystolic] = useState(null);
    const [dystolic, setDystolic] = useState(null);
    const [pulseRate, setPulseRate] = useState(null);

    
    const handleCreateHighBPData = (e) => {
        e.preventDefault();
        
        console.log('date', date);
        
        const data = {
            input_date: date,
            input_time: time,
            systolic: parseInt(systolic),
            dystolic: parseInt(dystolic),
            pulse_rate: parseInt(pulseRate),
        };

        // Make API call to create highBP post to DB
        axios
        .post(`${apiURL}/highBP/user/${userId}`, data)
        .then((res) => {
            // const rawData = res;
            // const sortedData = rawData.sort((a, b) => new Date(`${a.input_date} ${a.input_time}`) - new Date(`${b.input_date} ${b.input_time}`));
            // setHighBPData([...highBPData, sortedData]);
            setHighBPData([...highBPData, res.data]);
            console.log('Succefully create highBP data', res.data);
            handleCloseModal();
        })
        .catch((error) => {
            console.error('Error', error);
        })
    };

    // PUT/UPDATE
    // const currentHighBPData = highBPData.filter((item) => item.id === updateId)[0];
    // const [newDate, setNewDate] = useState('');
    // const [newTime, setNewTime] = useState('');
    // const [newSystolic, setNewSystolic] = useState('');
    // const [newDystolic, setNewDystolic] = useState('');
    // const [newPulseRate, setNewPulseRate] = useState('');

    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const handleUpdateHighBPData = (e) => {
        e.preventDefault();

        if (updatingItem) {
            const updatedData = {
                input_date: formData.input_date,
                input_time: formData.input_time,
                systolic: parseInt(formData.systolic),
                dystolic: parseInt(formData.dystolic),
                pulse_rate: parseInt(formData.pulse_rate),
            };

            // Make API call to create highBP post to DB
            axios
            .put(`${apiURL}/highBP/${updatingItem.id}`, updatedData)
            .then((res) => {
                // const newHighBPData = highBPData.find(data => data.id === res.data.id)[0];
                // const newHighBPDataArr = highBPData.map(data => ({
                //     ...data,
                //     input_date: updatedData.input_date,
                //     input_time: updatedData.input_time,
                //     systolic: updatedData.systolic,
                //     dystolic: updatedData.dystolic,
                //     pulse_rate: updatedData.pulse_rate
                // }));    // this will return array form
    
                // if (newHighBPData) {
                //     setHighBPData(newHighBPDataArr);
                // }
    
                setHighBPData(highBPData.map((item) => item.id === updatingItem.id ? formData : item));
                console.log('Successfully update highBP data', res.data);
                // console.log(newHighBPData);
                // console.log(newHighBPDataArr);
                setFormData({});
                setUpdatingItem(null);
                handleCloseModal();
            })
            .catch((error) => {
                console.error('Error', error);
            })
        }
    };

    // name="date"
    // name="time"
    // name="systolic"
    // name="dystolic"
    // name="pulseRate"

    // const handleChange = (e) => {
    //     const { name, value, type } = e.target;

    //     const numFields = ["systolic", "dystolic", "pulseRate"];
    //     const strFields = ["date", "time"];
    //     setSelectedData((prev) => ({
    //         ...prev,
    //         // [name]: ["systolic", "dystolic", "pulseRate"].includes(name) ? parseInt(value) : value,
    //         // [name]: ["date", "time"].includes(name) ? value : parseInt(value),
    //         [name]: numFields.includes(name) ? parseInt(value) : value,
    //         [type]: strFields.includes(type) ? value : parseInt(value)
    //     }));
    // };

    // DELETE
    const handleDeleteHighBPData = async (id) => {
        try {
            if (token) {
                const res = await axios.delete(`${apiURL}/highBP/${id}`);
                const newHighBPData = highBPData.filter(data => data.id !== id);
                setHighBPData(newHighBPData);
                console.log(res.data);
                // console.log(newHighBPData);
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    // ChartJS
    // Register required components
    ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

    const chartDate = highBPData.map(data => (
        `${new Date(data.input_date).toLocaleDateString('en-GB')}\n(${data.input_time})`
    ));

    const chartSystolic = highBPData.map(data => (
        data.systolic
    ));

    const chartDystolic = highBPData.map(data => (
        data.dystolic
    ));

    const chartPulseRate = highBPData.map(data => (
        data.pulse_rate
    ));

    const chartData = {
        // labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        labels: chartDate,
        datasets: [
            {
                label: 'Systolic',
                // data: [120, 127, 130, 125, 120],
                data: chartSystolic,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tensions: 0.3,  // curve effect
            },

            {
                label: 'Dystolic',
                data: chartDystolic,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tensions: 0.3,  // curve effect
            },

            {
                label: 'Pulse Rate',
                data: chartPulseRate,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(60, 179, 113, 1)',
                tensions: 0.3,  // curve effect
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,     // Allows manual height adjustment
        plugins: {
            legend: { 
                display: true,
                position: 'top',    // Position: 'top', 'bottom', 'left', 'right'
                labels: {
                    color: 'black',     // legend text color
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
        },
        scales: {
            y: { beginAtZero: true },
            x: {    // used for scrollable feature
                ticks: {
                    autoSkip: false,    // prevent skipping labels
                },
            },
        },
    };

    // const LineChart = () => <Line data={chartData} options={options} />;

    return (
        <>
            <Container className="d-flex flex-column justify-content-center align-items-center">
                {/* <PatientInfoCard 
                    patientInfoUpdateStatus={patientInfoUpdateStatus} 
                    setPatientInfoUpdateStatus={setPatientInfoUpdateStatus} 
                /> */}

                {/* <Button className="mt-5" onClick={sortHighBPData}>Sort by Date & Time</Button> */}
                {/* Table */}
                <div 
                    className="mt-5"
                    style={{ maxHeight: '400px', overflowY: 'auto'}}
                >
                    <Table 
                        className="text-center" 
                        striped 
                        bordered
                        responsive 
                        hidden={highBPData.length === 0}
                        hover
                    >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Systolic (mmHg)</th>
                                <th>Dystolic (mmHg)</th>
                                <th>Pulse Rate</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {highBPData.map((data) => (
                                <tr key={data.id}>
                                    <td>{highBPData.findIndex(item => item.id === data.id) + 1}</td>
                                    <td>{new Date(data.input_date).toLocaleDateString('en-GB')}</td>
                                    {/* <td>{data.input_date}</td> */}
                                    <td>{data.input_time}</td>
                                    <td>{data.systolic}</td>
                                    <td>{data.dystolic}</td>
                                    <td>{data.pulse_rate}</td>
                                    <td className="d-flex gap-2">
                                        {/* <Button
                                            variant="secondary"
                                            onClick={() => handleShowUpdateModal(data)}
                                        >
                                            Edit
                                        </Button>

                                        <Button 
                                            variant="danger"
                                            onClick={() => handleDeleteHighBPData(data.id)}
                                        >
                                            Delete
                                        </Button> */}

                                        <DropdownButton
                                            // as={ButtonGroup}
                                            // id="dropdown-button-drop-down-centered"
                                            // align="end"
                                            drop="start"
                                            // className="py-1"
                                            variant="secondary"
                                            title={'Action'}
                                        >
                                            {/* <div className="d-flex flex-column justify-content-center align-items-center"> */}
                                            <Dropdown.Item className="d-flex flex-column gap-2">
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => handleShowUpdateModal(data)}
                                                >
                                                    Edit
                                                </Button>

                                                <Button 
                                                    variant="danger"
                                                    onClick={() => handleDeleteHighBPData(data.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </Dropdown.Item>
                                            {/* </div> */}

                                            {/* <Dropdown.Item>
                                            </Dropdown.Item> */}
                                        </DropdownButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
  
                {/* used for scrollable feature on ChartJS */}
                <div 
                    style={{ width: '80%', overflowX: 'auto' }} 
                    className="my-5"
                    hidden={highBPData.length === 0}
                >
                    <div style={{ height: '800px', width: '1500px' }}>
                        {/* this is where line chart will be displayed */}
                        <Line 
                            data={chartData} 
                            options={options}
                        />
                    </div>
                </div>

                <Button
                    variant="success"
                    className="rounded-circle"
                    style={{position: 'fixed', top: '50%', left: '90%'}}
                    onClick={handleShowCreateModal}
                >
                    +
                </Button>
            </Container>

            <Modal
                show={modalShow === 'createHighBPData'}
                onHide={handleCloseModal}
                animation={false}
                centered
            >
                <Modal.Header>
                    <CloseButton
                        // className="mt-3 mx-2 my-0"
                        onClick={handleCloseModal} 
                    />
                </Modal.Header>
                
                <Modal.Body className="my-3 d-flex flex-column justify-content-center align-items-center">
                    <h2 
                        className="mb-4 text-center" 
                        style={{fontWeight: "bold"}}
                    >
                        Create High Blood Pressure Data
                    </h2>

                    <Container>
                    {/* const [date, setDate] = useState('');
                        const [time, setTime] = useState('');
                        const [systolic, setSystolic] = useState(null);
                        const [dystolic, setDystolic] = useState(null);
                        const [pulseRate, setPulseRate] = useState(null); */}

                        <Form
                            className="d-flex flex-column gap-3 px-3"
                            onSubmit={handleCreateHighBPData}
                        >
                            <Form.Group>
                                <Form.Control 
                                    type="date"
                                    placeholder="Enter date (dd/mm/yyyy)"
                                    // value={modalShow === 'updateHighBPData' ? date : null}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control 
                                    type="time"
                                    placeholder="Enter time"
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="d-flex gap-2">
                                <Form.Control 
                                    type="number"
                                    placeholder="Enter systolic reading (mmHg)"
                                    onChange={(e) => setSystolic(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control 
                                    type="number"
                                    placeholder="Enter dystolic reading (mmHg)"
                                    onChange={(e) => setDystolic(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control 
                                    type="number"
                                    placeholder="Enter pulse rate reading"
                                    onChange={(e) => setPulseRate(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            {/* <Form.Group>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter note (optional)"
                                    // value={password}
                                    // onChange={(e) => setOngoingMed(e.target.value)}
                                    // required
                                />
                            </Form.Group> */}

                            <Button className="mt-3" variant="success" type="submit">
                                Create
                            </Button>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>

            <Modal
                show={modalShow === 'updateHighBPData'}
                onHide={handleCloseModal}
                animation={false}
                centered
            >
                <Modal.Header>
                    <CloseButton
                        // className="mt-3 mx-2 my-0"
                        onClick={handleCloseModal} 
                    />
                </Modal.Header>
            
                <Modal.Body className="my-3 d-flex flex-column justify-content-center align-items-center">
                    <h2 
                        className="mb-4 text-center" 
                        style={{fontWeight: "bold"}}
                    >
                        Update High Blood Pressure Data
                    </h2>

                    {/* <p>{`HighBP ID: ${updateId}`}</p> */}
                    {/* <p>{`HighBP ID: ${selectedData.id}`}</p> */}

                    <Container>
                        {/* const [date, setDate] = useState('');
                            const [time, setTime] = useState('');
                            const [systolic, setSystolic] = useState(null);
                            const [dystolic, setDystolic] = useState(null);
                            const [pulseRate, setPulseRate] = useState(null);
                        */}

                        {updatingItem && (
                            <Form
                                className="d-flex flex-column gap-3 px-3"
                                onSubmit={handleUpdateHighBPData}
                            >
                                <Form.Group>
                                    <Form.Control 
                                        type="date"
                                        placeholder="Enter date (dd/mm/yyyy)"
                                        // value={modalShow === 'updateHighBPData' ? date : null}
                                        name="input_date"
                                        // value={selectedData.input_date}
                                        value={formData.input_date}
                                        // onChange={(e) => setNewDate(e.target.value)}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                

                                <Form.Group>
                                    <Form.Control 
                                        type="time"
                                        placeholder="Enter time"
                                        name="input_time"
                                        // value={selectedData.input_time}
                                        value={formData.input_time}
                                        // onChange={(e) => setNewTime(e.target.value)}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control 
                                        type="number"
                                        placeholder="Enter systolic reading (mmHg)"
                                        name="systolic"
                                        // value={selectedData.systolic}
                                        value={formData.systolic}
                                        // onChange={(e) => setNewSystolic(e.target.value)}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control 
                                        type="number"
                                        placeholder="Enter dystolic reading (mmHg)"
                                        name="dystolic"
                                        // value={selectedData.dystolic}
                                        value={formData.dystolic}
                                        // onChange={(e) => setNewDystolic(e.target.value)}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control 
                                        type="number"
                                        placeholder="Enter pulse rate reading"
                                        name="pulse_rate"
                                        // value={selectedData.pulse_rate}
                                        value={formData.pulse_rate}
                                        // onChange={(e) => setNewPulseRate(e.target.value)}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                
                                {/* <Form.Group>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter note (optional)"
                                        // value={password}
                                        // onChange={(e) => setOngoingMed(e.target.value)}
                                        // required
                                    />
                                </Form.Group> */}

                                <Button 
                                    className="mt-3" 
                                    variant="success" 
                                    type="submit"
                                >
                                    Update
                                </Button>
                            </Form>
                        )}
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}