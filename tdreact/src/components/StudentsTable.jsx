import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import studentsData from '../../data/students.json'; // Importation des données des étudiants

function StudentsTable() {
    const [students, setStudents] = useState(studentsData);
    const [editingStudent, setEditingStudent] = useState(null);
    const [newName, setNewName] = useState('');
    const [newFirstname, setNewFirstname] = useState('');
    const [newEmail, setNewEmail] = useState('');

    // Fonction pour activer l'édition
    const handleEdit = (student) => {
        setEditingStudent(student.id);
        setNewName(student.lastname);
        setNewFirstname(student.firstname);
        setNewEmail(student.email);
    };

    // Fonction pour enregistrer les modifications
    const handleSave = (id) => {
        const updatedStudents = students.map((student) =>
            student.id === id
                ? { ...student, lastname: newName, firstname: newFirstname, email: newEmail }
                : student
        );
        setStudents(updatedStudents);
        setEditingStudent(null);
    };

    // Fonction pour supprimer un étudiant
    const handleDelete = (id) => {
        const updatedStudents = students.filter((student) => student.id !== id);
        setStudents(updatedStudents);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Prénom</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell>{student.id}</TableCell>
                            <TableCell>
                                {editingStudent === student.id ? (
                                    <TextField
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                ) : (
                                    student.lastname
                                )}
                            </TableCell>
                            <TableCell>
                                {editingStudent === student.id ? (
                                    <TextField
                                        value={newFirstname}
                                        onChange={(e) => setNewFirstname(e.target.value)}
                                    />
                                ) : (
                                    student.firstname
                                )}
                            </TableCell>
                            <TableCell>
                                {editingStudent === student.id ? (
                                    <TextField
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                ) : (
                                    student.email
                                )}
                            </TableCell>
                            <TableCell>
                                {editingStudent === student.id ? (
                                    <Button onClick={() => handleSave(student.id)}>Enregistrer</Button>
                                ) : (
                                    <Button onClick={() => handleEdit(student)}>Modifier</Button>
                                )}
                                <Button onClick={() => handleDelete(student.id)}>Supprimer</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default StudentsTable;
