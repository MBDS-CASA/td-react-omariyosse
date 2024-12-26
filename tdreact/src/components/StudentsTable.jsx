import React, { useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box, Typography,} from '@mui/material';
import studentsData from '../../data/students.json'; // Importation des données des étudiants

function StudentsTable() {
    const [students, setStudents] = useState(studentsData);
    const [editingStudent, setEditingStudent] = useState(null);
    const [newName, setNewName] = useState('');
    const [newFirstname, setNewFirstname] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [addName, setAddName] = useState('');
    const [addFirstname, setAddFirstname] = useState('');
    const [addEmail, setAddEmail] = useState('');

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

    // Fonction pour filtrer les étudiants
    const filteredStudents = students.filter(
        (student) =>
            student.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fonction pour ajouter un étudiant
    const handleAddStudent = () => {
        const newStudent = {
            id: students.length + 1, // Génère un ID unique
            lastname: addName,
            firstname: addFirstname,
            email: addEmail,
        };

        setStudents([...students, newStudent]);
        setAddName('');
        setAddFirstname('');
        setAddEmail('');
    };

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <TextField
                    label="Rechercher un étudiant"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Box>

            <TableContainer component={Paper} sx={{ mb: 3 }}>
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
                        {filteredStudents.map((student) => (
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

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Ajouter un nouvel étudiant</Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <TextField
                        label="Nom"
                        value={addName}
                        onChange={(e) => setAddName(e.target.value)}
                    />
                    <TextField
                        label="Prénom"
                        value={addFirstname}
                        onChange={(e) => setAddFirstname(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        value={addEmail}
                        onChange={(e) => setAddEmail(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleAddStudent}>
                        Ajouter
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default StudentsTable;
