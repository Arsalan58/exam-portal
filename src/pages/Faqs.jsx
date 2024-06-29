import React, { useEffect, useState } from 'react';
import { Button, Grid, Modal, Box, TextField, Typography, Switch, FormControlLabel, IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from 'formik';
import axios from 'axios';
import FaqsCreationSchema from '../schemas/FaqsCreationSchema';

const Faqs = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);

    const formik = useFormik({
        initialValues: {
            question: '',
            answer: '',
            status: true
        },
        validationSchema: FaqsCreationSchema,
        onSubmit: async (values) => {
            if (isEditMode) {
                // Edit FAQ
                const formData = await axios.put(`https://genuine-guided-snipe.ngrok-free.app/panel/update/faq?id=${data[currentEditIndex].id}`, values, {
                    headers: {
                        "Authorization": localStorage.getItem("token"),
                        "ngrok-skip-browser-warning": true
                    }
                });
                const newData = [...data];
                newData[currentEditIndex] = values;
                setData(newData);
            } else {
                // Create FAQ
                const formData = await axios.post(`https://genuine-guided-snipe.ngrok-free.app/panel/create/faq`, values, {
                    headers: {
                        "Authorization": localStorage.getItem("token"),
                        "ngrok-skip-browser-warning": true
                    }
                });
                setData([...data, values]);
            }
            formik.resetForm();
            handleClose();
        }
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setIsEditMode(false);
        setCurrentEditIndex(null);
        formik.resetForm();
    };

    const handleDelete = async (index, id) => {
        await axios.delete(`https://genuine-guided-snipe.ngrok-free.app/panel/delete/faq?id=${id}`, {
            headers: {
                "Authorization": localStorage.getItem("token"),
                "ngrok-skip-browser-warning": true
            }
        });
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
    };

    const handleStatusChange = async (index, id, currentStatus) => {
        const updatedStatus = !currentStatus;
        await axios.put(`https://genuine-guided-snipe.ngrok-free.app/panel/status/faq-status?id=${id}`, { status: updatedStatus }, {
            headers: {
                "Authorization": localStorage.getItem("token"),
                "ngrok-skip-browser-warning": true
            }
        });
        const newData = [...data];
        newData[index].status = updatedStatus;
        setData(newData);
    };

    const handleEdit = (index) => {
        const faqToEdit = data[index];
        formik.setValues(faqToEdit);
        setIsEditMode(true);
        setCurrentEditIndex(index);
        handleOpen();
    };

    useEffect(() => {
        const retrieveInfo = axios.get("https://genuine-guided-snipe.ngrok-free.app/panel/retrieve/faq", {
            headers: {
                "Authorization": localStorage.getItem("token"),
                "ngrok-skip-browser-warning": true
            }
        })
        retrieveInfo.then(({ data: { data: { allData } } }) => {
            setData(allData);
        });
    }, []);

    return (
        <>
            <Grid container justifyContent={"flex-end"} p={3}>
                <Grid item>
                    <Button variant={"contained"} onClick={handleOpen}>Add FAQ</Button>
                </Grid>
            </Grid>
            <Grid container justifyContent={"flex-end"} p={3}>
                {
                    data.map((value, index) => (
                        <Grid item xs={12} m={2} key={index}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls={`panel${index + 1}-content`}
                                    id={`panel${index + 1}-header`}
                                >
                                    <Typography>{value.question}</Typography>
                                    <IconButton
                                        aria-label="edit"
                                        onClick={(e) => {
                                            handleEdit(index);
                                            e.stopPropagation();
                                        }}
                                        style={{ marginLeft: 'auto' }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        sx={{ color: "red" }}
                                        aria-label="delete"
                                        onClick={(e) => {
                                            handleDelete(index, value.id);
                                            e.stopPropagation();
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{value.answer}</Typography>
                                    <FormControlLabel
                                        control={<Switch checked={value.status == "0" ? false : true} onChange={() => handleStatusChange(index, value.id, value.status == "0" ? false : true)} />}
                                        // label="Active Status"
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    ))
                }
            </Grid>
            <Modal variant="form" open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}>
                    <Typography variant="h6" component="h2" mb={2}>
                        {isEditMode ? 'Edit FAQ' : 'Add New FAQ'}
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Question"
                            name="question"
                            value={formik.values.question}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.question && Boolean(formik.errors.question)}
                            helperText={formik.touched.question && formik.errors.question}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Answer"
                            name="answer"
                            value={formik.values.answer}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.answer && Boolean(formik.errors.answer)}
                            helperText={formik.touched.answer && formik.errors.answer}
                        />
                        <FormControlLabel
                            control={<Switch checked={formik.values.status == "0" ? false : true} onChange={(e)=>{
                                formik.setFieldValue("status",e.target.checked)
                            }} name="status" />}
                            label="Active Status"
                            sx={{ marginTop: 2, marginBottom: 2 }}
                        />
                        <Grid container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Button variant="contained" type="submit">
                                    {isEditMode ? 'Update' : 'Save'}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default Faqs;