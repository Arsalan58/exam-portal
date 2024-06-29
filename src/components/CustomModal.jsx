import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Modal,
    Backdrop,
    Fade,
    Grid,
    Switch,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { useFormik } from 'formik';
import ExamCreateSchema from '../schemas/ExamCreateSchema';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const CustomModal = ({ handleOpen, handleClose, open, row }) => {
    console.log(row)
    const [formValues, setFormValues] = useState({
        id: "",
        examName: '',
        courseName: '',
        examType: '',
        status: true
    });
    console.log(row)

    const { handleChange, handleSubmit, handleBlur, touched, errors, setErrors, setValues, resetForm, values, setTouched } = useFormik({
        initialValues: formValues,
        validationSchema: ExamCreateSchema,
        onSubmit: (value) => {
            handleClose()
            console.log(value)

        }
    })
    useEffect(() => {
        setValues(row)
    }, [row])


    return (
        (
            <Modal
                open={open}
                onClose={() => {
                    handleClose()
                    setTouched({})
                }}
                bgcolor="red"
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Exam Form
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Exam Name"
                                        name="examName"
                                        value={values?.examName}
                                        onChange={handleChange}
                                        variant="outlined"
                                        // required
                                        onBlur={handleBlur}
                                        error={touched.examName && Boolean(errors.examName)}
                                        helperText={touched.examName && errors.examName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Course Name"
                                        name="courseName"
                                        value={values?.courseName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.courseName && Boolean(errors.courseName)}
                                        helperText={touched.courseName && errors.courseName}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Exam Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            fullWidth
                                            name="examType"
                                            label="Exam Type"
                                            value={values?.examType}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.examType && Boolean(errors.examType)}
                                            helperText={touched.examType && errors.examType}
                                        >
                                            <MenuItem value={"SSC"}>
                                                SSC
                                            </MenuItem>
                                            <MenuItem value={"NEET"}>
                                                NEET
                                            </MenuItem>
                                            <MenuItem value={"MAINS"}>
                                                MAINS
                                            </MenuItem>
                                            <MenuItem value={"ADVANCED"}>
                                                ADVANCED
                                            </MenuItem>
                                            <MenuItem value={"CLAT"}>
                                                CLAT
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    {/* <Switch
                                        name="status"
                                        checked={values?.status}
                                        onChange={handleChange}

                                    /> */}
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        )
    )
}

export default CustomModal
