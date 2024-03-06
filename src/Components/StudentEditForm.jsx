import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStudentByRoll, updateStudent } from "../Service/StudentService";

export function StudentEditForm(){
    const [formData,setFormData] = useState({roll:"",name:"",marks:"",gender:""});

    const [isSubmitted,setIsSubmitted]= useState(false);    

    const params = useParams();

   

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
          e.preventDefault();
        try {
            const result = await updateStudent(formData,params.roll);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
            }, 2000);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
      }

       const populateStudentState=async()=>{

        try {
           const result= await fetchStudentByRoll(params.roll);          
           setFormData(result.student);
        } catch (error) {
            console.log(error);
        }        

      }

     
      useEffect(()=>{
        populateStudentState();
      },[]);

    return (
        <Container>
            <Header text="Update student here"></Header>
            {formData?
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter Roll</Form.Label>
                            <Form.Control type="text" value={formData.roll} placeholder="Enter roll" name="roll" onChange={handleChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter Name</Form.Label>
                            <Form.Control type="text"  value={formData.name} placeholder="Enter name" name="name" onChange={handleChange}  />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter Marks</Form.Label>
                            <Form.Control type="text"  value={formData.marks} placeholder="Enter marks" name="marks" onChange={handleChange} />
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
                                checked={formData.gender==="male"?true:false}
                            />
                            <Form.Check
                                type="radio"
                                label="Female"
                                name="gender"
                                value="female"
                                onChange={handleChange} 
                                checked={formData.gender==="female"?true:false}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={3}>
                        <Button type="submit" variant="primary">Update</Button>
                    </Col>
                </Row>                
            </Form>:<p>No data found for given roll no</p>}
            <Row className="mt-3">
                <Col lg={4}>
                {isSubmitted?<Alert variant="success">Updated Successfully</Alert>:null}
                </Col>
            </Row>
        </Container>
    )
}