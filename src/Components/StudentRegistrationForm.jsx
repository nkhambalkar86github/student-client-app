import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Header } from "./Header";
import { useState } from "react";
import { saveStudent } from "../Service/StudentService";

export function StudentRegistrationForm() {
    const [formData,setFormData] = useState({roll:"",name:"",marks:"",gender:""});

    const [isSubmitted,setIsSubmitted]= useState(false);

   

    const handleChange=(e)=>{

        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
          e.preventDefault();
        try {
            const result = await saveStudent(formData);
            setFormData({roll:"",name:"",marks:"",gender:""});
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
            }, 2000);
            console.log(result.message);
        } catch (error) {
            console.log(error);
        }
      }
     

    return (
        <Container>
            <Header text="Register student here"></Header>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter Roll</Form.Label>
                            <Form.Control type="text" value={isSubmitted?formData.roll:null} placeholder="Enter roll" name="roll" onKeyUp={handleChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter Name</Form.Label>
                            <Form.Control type="text"  value={isSubmitted?formData.name:null} placeholder="Enter name" name="name" onKeyUp={handleChange}  />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter Marks</Form.Label>
                            <Form.Control type="text"  value={isSubmitted?formData.marks:null} placeholder="Enter marks" name="marks" onKeyUp={handleChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4}>
                        <Form.Group className="mb-3">
                        <Form.Label>Select Gender</Form.Label>
                            <Form.Check
                                type="radio"
                                label="Male"
                                name="gender"                                
                                value="male"
                                onChange={handleChange} 
                            />
                            <Form.Check
                                type="radio"
                                label="Female"
                                name="gender"
                                value="female"
                                onChange={handleChange} 
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={3}>
                        <Button type="submit" variant="primary">Register</Button>
                    </Col>
                </Row>                
            </Form>
            <Row className="mt-3">
                <Col lg={4}>
                {isSubmitted?<Alert variant="success">Student Registered</Alert>:null}
                </Col>
            </Row>
        </Container>
    )
}