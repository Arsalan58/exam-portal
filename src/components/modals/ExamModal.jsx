import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Switch, FormControlLabel, Select, MenuItem, InputLabel, Snackbar, Alert
} from '@mui/material';

const ExamModal = ({ open, handleClose, row, setRows }) => {
    const [categories, setCategories] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const isEditable = Boolean(row.id)

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        console.log("adnasduigasdbhasd", "============================asdas")
        try {
            const response = axios.get("https://genuine-guided-snipe.ngrok-free.app/panel/retrieve/category", {
                headers: {
                    "ngrok-skip-browser-warning": true,
                    "Authorization": localStorage.getItem("token"),
                }
            }).then(({ data: { data: { allData } } }) => {
                console.log(allData, "======================categories")
                setCategories(allData); // Assuming your API response has an array of categories
            }) // Replace with your API endpoint
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const initialValues = {
        title: row.title || '',
        instructions: row.instructions || '',
        examStartAt: "2024-06-25T11:06:18.000Z" || '',
        examEndAt: row.examEndAt || '',
        examDuration: row.examDuration || '',
        searchTags: row.searchTags || [],
        viewSolutions: row.viewSolutions || false,
        examResult: row.examResult || '',
        cutOff: row.cutOff || '',
        maxMarks: row.maxMarks || '',
        passMessage: row.passMessage || '',
        failMessage: row.failMessage || '',
        status: row.status == 0 ? false : true || true,
        categoryId: row.categoryId || '',
        mode: row.mode || '',
        fee: row.fee || '',
        negativeMarking: row.negativeMarking || '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        instructions: Yup.string().required('Instructions are required'),
        examStartAt: Yup.date().required('Start Date/Time is required'),
        examEndAt: Yup.date().required('End Date/Time is required'),
        examDuration: Yup.number().required('Duration is required').positive('Duration must be a positive number'),
        examResult: Yup.string().required('Exam Result is required'),
        cutOff: Yup.number().required('Cut Off is required').positive('Cut Off must be a positive number'),
        maxMarks: Yup.number().required('Max Marks is required').positive('Max Marks must be a positive number'),
        passMessage: Yup.string().required('Pass Message is required'),
        failMessage: Yup.string().required('Fail Message is required'),
        status: Yup.boolean().required('Status is required'),
        categoryId: Yup.string().required('Category is required'),
        mode: Yup.string().required('mode is required'),
        fee: Yup.string().required('fee is required'),
        negativeMarking: Yup.string().required('negativeMarking is required'),
    });

    const onSubmit = async (values, { resetForm }) => {
        try {
            // Simulate API call to create exam
            // Replace with actual API endpoint
            row.id ? axios.put(`https://genuine-guided-snipe.ngrok-free.app/panel/update/exam?id=${row.id}`, values, {
                headers: {
                    "ngrok-skip-content-warning": true,
                    "Authorization": localStorage.getItem("token")
                }
            }).then((value) => {
                console.log(value)
                setSnackbarMessage('Exam updated successfully!');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setRows((prev) => {
                    return [...prev, values]
                })
                resetForm();
                handleClose();
            }) : axios.post("https://genuine-guided-snipe.ngrok-free.app/panel/create/exam", values, {
                headers: {
                    "ngrok-skip-content-warning": true,
                    "Authorization": localStorage.getItem("token")
                }
            }).then((value) => {
                console.log(value)
                setSnackbarMessage('Exam created successfully!');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setRows((prev) => {
                    return [...prev, values]
                })
                resetForm();
                handleClose();
            })
        } catch (error) {
            setSnackbarMessage('There was an error creating the exam!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            console.error('Error creating exam:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            {isEditable ? <DialogTitle>Edit Exam</DialogTitle> : <DialogTitle>Add Exam</DialogTitle>}
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched, values, setFieldValue }) => (
                        <Form className='examFormModal'>
                            <Field
                                name="title"
                                as={TextField}
                                label="Title"
                                fullWidth
                                error={touched.title && Boolean(errors.title)}
                                helperText={<ErrorMessage name="title" />}
                            />
                            <Field
                                name="instructions"
                                as={TextField}
                                label="Instructions"
                                fullWidth
                                multiline
                                rows={4}
                                error={touched.instructions && Boolean(errors.instructions)}
                                helperText={<ErrorMessage name="instructions" />}
                            />
                            <Field
                                name="examStartAt"
                                as={TextField}
                                type="datetime-local"
                                label="Start Date/Time"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={touched.examStartAt && Boolean(errors.examStartAt)}
                                helperText={<ErrorMessage name="examStartAt" />}
                            />
                            <Field
                                name="examEndAt"
                                as={TextField}
                                type="datetime-local"
                                label="End Date/Time"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={touched.examEndAt && Boolean(errors.examEndAt)}
                                helperText={<ErrorMessage name="examEndAt" />}
                            />
                            <Field
                                name="examDuration"
                                as={TextField}
                                label="Duration (in minutes)"
                                fullWidth
                                type="number"
                                error={touched.examDuration && Boolean(errors.examDuration)}
                                helperText={<ErrorMessage name="examDuration" />}
                            />
                            <Field
                                name="searchTags"
                                as={TextField}
                                label="Search Tags"
                                fullWidth
                                multiline
                                rows={2}
                                error={touched.searchTags && Boolean(errors.searchTags)}
                                helperText={<ErrorMessage name="searchTags" />}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.viewSolutions}
                                        onChange={(event) => setFieldValue('viewSolutions', event.target.checked)}
                                        name="viewSolutions"
                                        color="primary"
                                    />
                                }
                                label="View Solutions"
                            />
                            <Field
                                name="examResult"
                                as={TextField}
                                label="Exam Result"
                                fullWidth
                                error={touched.examResult && Boolean(errors.examResult)}
                                helperText={<ErrorMessage name="examResult" />}
                            />
                            <Field
                                name="cutOff"
                                as={TextField}
                                label="Cut Off"
                                fullWidth
                                type="number"
                                error={touched.cutOff && Boolean(errors.cutOff)}
                                helperText={<ErrorMessage name="cutOff" />}
                            />
                            <Field
                                name="maxMarks"
                                as={TextField}
                                label="Max Marks"
                                fullWidth
                                type="number"
                                error={touched.maxMarks && Boolean(errors.maxMarks)}
                                helperText={<ErrorMessage name="maxMarks" />}
                            />
                            <Field
                                name="passMessage"
                                as={TextField}
                                label="Pass Message"
                                fullWidth
                                multiline
                                rows={2}
                                error={touched.passMessage && Boolean(errors.passMessage)}
                                helperText={<ErrorMessage name="passMessage" />}
                            />
                            <Field
                                name="failMessage"
                                as={TextField}
                                label="Fail Message"
                                fullWidth
                                rows={2}
                                error={touched.failMessage && Boolean(errors.failMessage)}
                                helperText={<ErrorMessage name="failMessage" />}
                            />
                            <Field
                                name="mode"
                                as={TextField}
                                label="Mode"
                                fullWidth
                                rows={2}
                                error={touched.mode && Boolean(errors.mode)}
                                helperText={<ErrorMessage name="mode" />}
                            />
                            <Field
                                name="fee"
                                as={TextField}
                                label="Fee"
                                fullWidth
                                rows={2}
                                error={touched.fee && Boolean(errors.fee)}
                                helperText={<ErrorMessage name="fee" />}
                            />
                            <Field
                                name="negativeMarking"
                                as={TextField}
                                label="Negetive Marking"
                                fullWidth
                                multiline
                                rows={2}
                                error={touched.negativeMarking && Boolean(errors.negativeMarking)}
                                helperText={<ErrorMessage name="negativeMarking" />}
                            />
                            <Field
                                name="status"
                                as={TextField}
                                select
                                label="Status"
                                fullWidth
                                error={touched.status && Boolean(errors.status)}
                                helperText={<ErrorMessage name="status" />}
                            >
                                <MenuItem value={true}>Active</MenuItem>
                                <MenuItem value={false}>Inactive</MenuItem>
                            </Field>
                            <Field
                                name="categoryId"
                                as={TextField}
                                select
                                label="Category"
                                fullWidth
                                error={touched.categoryId && Boolean(errors.categoryId)}
                                helperText={<ErrorMessage name="categoryId" />}
                            >
                                {categories.map(category => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Field>
                            <DialogActions>
                                <Button onClick={handleClose} color="secondary">
                                    Cancel
                                </Button>
                                {row.id ? <Button type="submit" color="primary">
                                    Update
                                </Button> : <Button type="submit" color="primary">
                                    Submit
                                </Button>}
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default ExamModal;
