import React  from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'


const TodoModal = (props) => {
    const {title, description, endDate, selectedStatus, status, isSubmitingTodo} = props.todo
    return (
        <Modal show={props.show} onHide={props.onHide} backdrop={false} backdropClassName={'dark-black'} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', transition: 'all 0.3s linear' }}>
            <Modal.Header closeButton  onHide={props.onHide}>
                <Modal.Title>
                    { props.isEdit ? 'Update Task' : 'Add New Task'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="exampleForm.text">
                        <Form.Label>Todo Title:</Form.Label>
                        <Form.Control
                            value={title} 
                            onChange={props.onChange}
                            name="title" 
                            type="text" 
                            placeholder="Enter Title" 
                        />
                    </Form.Group>
                    {
                        (props.isEdit)
                        ?   <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Control 
                                    value={selectedStatus}
                                    onChange={props.onChange}
                                    as="select" 
                                    name="selectedStatus"
                                >
                                    <option hidden>Select Status</option>
                                    {
                                        status.map((value, index) =>  <option key={index} value={value}>
                                        {value}
                                        </option>
                                        )
                                    }
                                    
                                </Form.Control>
                            </Form.Group>
                        :   null
                    }
                    <Form.Group controlId="exampleForm.text">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control 
                            value={endDate}
                            onChange={props.onChange}
                            type="date" 
                            name="endDate" 
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.text">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            value={description}
                            onChange={props.onChange}
                            name="description" 
                            as="textarea" 
                            rows="3" 
                            placeholder="Enter Description..." 
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {
                    (props.isEdit)
                    ?<Button 
                        variant="primary" 
                        onClick={props.updateHandler}
                        disabled={isSubmitingTodo}
                    >
                        { isSubmitingTodo ?<Spinner animation="border" variant="light" /> :'Update' }
                    </Button>
                    :<Button 
                        variant="success" 
                        onClick={props.onSubmit}
                        disabled={isSubmitingTodo}
                    >
                        { isSubmitingTodo ?   <Spinner animation="border" variant="light" /> :'Submit' }   
                    </Button>
                }
                <Button variant="secondary" onClick={props.onHide}>
                    Clear
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TodoModal;