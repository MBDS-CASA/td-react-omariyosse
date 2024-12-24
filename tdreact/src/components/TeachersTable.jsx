import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import teachersData from '../../data/teachers.json'; // Importation des données

function TeachersTable() {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Prénom</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Matière</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teachersData.map((teacher, index) => (
                        <TableRow key={index}>
                            <TableCell>{teacher.firstname}</TableCell>
                            <TableCell>{teacher.lastname}</TableCell>
                            <TableCell>{teacher.subject}</TableCell>
                            <TableCell>{teacher.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TeachersTable;
