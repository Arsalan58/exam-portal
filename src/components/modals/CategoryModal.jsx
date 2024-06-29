import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, Switch, FormControlLabel
} from '@mui/material';

const CategoryModal = ({ handleClose, open }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

    const initialValues = {
        name: '',
        status: true,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        status: Yup.boolean().required('Status is required'),
    });

    const onSubmit = async (values, { resetForm }) => {
        try {
            const response = await axios.post("https://genuine-guided-snipe.ngrok-free.app/panel/create/category", values, {
                "ngrok-skip-content-warning": true,
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            console.log(response)
            resetForm();
            setSnackbarMessage(response.data.message);
            setOpenSnackbar(true);
            setSnackbarSeverity('success');

            handleClose();
        } catch (error) {
            setSnackbarMessage(error.message);
            setOpenSnackbar(true);
            setSnackbarSeverity('error');

            console.error(error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Category</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched, values, setFieldValue }) => (
                            <Form>
                                <Field
                                    sx={{ marginY: 1 }}
                                    name="name"
                                    as={TextField}
                                    label="Name"
                                    fullWidth
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={<ErrorMessage name="name" />}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={values.status}
                                            onChange={(event) => setFieldValue('status', event.target.checked)}
                                            name="status"
                                            color="primary"
                                        />
                                    }
                                    label="Status"
                                />
                                <DialogActions>
                                    <Button onClick={handleClose} color="secondary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CategoryModal;
