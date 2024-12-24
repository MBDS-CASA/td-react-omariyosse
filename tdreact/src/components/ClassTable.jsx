import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import classData from '../../data/class.json';

function ClassTable() {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Matière</TableCell>
                        <TableCell>Enseignant</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {classData.map((classe, index) => (
                        <TableRow key={index}>
                            <TableCell>{classe.id}</TableCell>
                            <TableCell>{classe.name}</TableCell>
                            <TableCell>{classe.teacher}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ClassTable;
