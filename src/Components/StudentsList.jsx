import { Button, Container, Modal, Table } from "react-bootstrap";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import { deleteStudent, fetchStudents } from "../Service/StudentService";
import { useNavigate, useParams } from "react-router-dom";
export function StudentsList() {


    const [students,setStudents] = useState([]);

    const [showDialog,setShowDialog] = useState(false);

    const [selectRoll,setSelectRoll] = useState("");

    const navigate = useNavigate();

    const openModalDialog=()=>{
      setShowDialog(true);
    }

    const closeModalDialog=()=>{
      setShowDialog(false);
    }




    async function populateStudentList() {
        try {
            const data = await fetchStudents();
            setStudents(data.students);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        populateStudentList();
    },[]);

   const handleStudentsDelete=async()=>{
      try {
        await deleteStudent(selectRoll);
        populateStudentList();
        closeModalDialog();
      } catch (error) {
        console.log(error);
      }
    }

   

    return (
        <Container>
            <Header text="List of all the students"></Header>
            {students.length!==0?
            <Table className="mt-4">
                <thead>
                    <tr>
                        <th>Roll</th>
                        <th>Name</th>
                        <th>Marks</th>
                        <th>Gender</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((std)=>{
                            return(
                                <tr>
                                    <td>{std.roll}</td>
                                    <td>{std.name}</td>
                                    <td>{std.marks}</td>
                                    <td>{std.gender}</td>
                                    <td>
                                        <Button variant="danger" onClick={()=>{ 
                                            openModalDialog()
                                            setSelectRoll(std.roll);
                                         }}>Delete</Button> &nbsp;&nbsp;&nbsp;
                                        <Button variant="primary" onClick={()=>{
                                            navigate(`/edit/${std.roll}`);
                                        }}>Edit</Button>
                                    </td>
                                </tr>
                            )

                        })
                    }
                </tbody>
            </Table>:<p>No students found</p>}

            <Modal show={showDialog} onHide={closeModalDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete student with roll no {selectRoll} ?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={()=>{
            handleStudentsDelete();
          }} >
            Yes
          </Button>
          <Button variant="danger" onClick={closeModalDialog}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

        </Container>
    )
}