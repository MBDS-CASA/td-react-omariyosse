import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import notesData from '../../data/notes.json';

function NotesTable() {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Étudiant</TableCell>
                        <TableCell>Course</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Note</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notesData.map((note, index) => (
                        <TableRow key={index}>
                            <TableCell>{note.student.firstname} {note.student.lastname}</TableCell>
                            <TableCell>{note.course}</TableCell>
                            <TableCell>{note.date}</TableCell>
                            <TableCell>{note.grade}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default NotesTable;
