// import { Modal, CloseButton, Container, Form, Button } from "react-bootstrap";

// export default function HighBPUpdateModal({
//     modalShow,
//     handleCloseModal,
//     updateId,
//     handleUpdateHighBPData
// }) {
//     return (
//         <Modal
//             show={modalShow === 'updateHighBPData'}
//             onHide={handleCloseModal}
//             animation={false}
//             centered
//         >
//             <Modal.Header>
//                 <CloseButton
//                     // className="mt-3 mx-2 my-0"
//                     onClick={handleCloseModal} 
//                 />
//             </Modal.Header>
            
//             <Modal.Body className="my-3 d-flex flex-column justify-content-center align-items-center">
//                 <h2 
//                     className="mb-4 text-center" 
//                     style={{fontWeight: "bold"}}
//                 >
//                     Update High Blood Pressure Data
//                 </h2>

//                 <p 
//                     hidden={modalShow === 'createHighBPData'}
//                 >
//                     {`HighBP ID: ${updateId}`}
//                 </p>

//                 <Container>
//                 {/* const [date, setDate] = useState('');
//                     const [time, setTime] = useState('');
//                     const [systolic, setSystolic] = useState(null);
//                     const [dystolic, setDystolic] = useState(null);
//                     const [pulseRate, setPulseRate] = useState(null); */}

//                     <Form
//                         className="d-flex flex-column gap-3 px-3"
//                         onSubmit={handleUpdateHighBPData}
//                     >
//                         <Form.Group>
//                             <Form.Control 
//                                 type="text"
//                                 placeholder="Enter date (dd/mm/yyyy)"
//                                 // value={modalShow === 'updateHighBPData' ? date : null}
//                                 onChange={(e) => setNewDate(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group>
//                             <Form.Control 
//                                 type="text"
//                                 placeholder="Enter time"
//                                 onChange={(e) => setNewTime(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="d-flex gap-2">
//                             <Form.Control 
//                                 type="number"
//                                 placeholder="Enter systolic reading (mmHg)"
//                                 onChange={(e) => setNewSystolic(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group>
//                             <Form.Control 
//                                 type="number"
//                                 placeholder="Enter dystolic reading (mmHg)"
//                                 onChange={(e) => setNewDystolic(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group>
//                             <Form.Control 
//                                 type="number"
//                                 placeholder="Enter pulse rate reading"
//                                 onChange={(e) => setNewPulseRate(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>

//                         {/* <Form.Group>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Enter note (optional)"
//                                 // value={password}
//                                 // onChange={(e) => setOngoingMed(e.target.value)}
//                                 // required
//                             />
//                         </Form.Group> */}

//                         <Button className="mt-3" variant="success" type="submit">
//                             Update
//                         </Button>
//                     </Form>
//                 </Container>
//             </Modal.Body>
//         </Modal>
//     );
// }