import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Yup from 'yup';
import { nanoid } from '@reduxjs/toolkit';
import { useSearchParams } from 'react-router-dom';

const CKEditorField = ({ field, form, ...props }) => {
    const handleChange = (event, editor) => {
        form.setFieldValue(field.name, editor.getData());
    };

    return (
        <CKEditor
            editor={ClassicEditor}
            data={field.value}
            onChange={handleChange}
            {...props}
        />
    );
};

const validationSchema = Yup.object({
    question: Yup.string().required('Question is required'),
    optionA: Yup.string().required('Option A is required'),
    optionB: Yup.string().required('Option B is required'),
    optionC: Yup.string().required('Option C is required'),
    optionD: Yup.string().required('Option D is required'),
    correctAnswer: Yup.string().required('Please select a correct answer')
});

const QuestionAnswerForm = ({initialValues, rows, setRows }) => {
    const [params, setSearchParams] = useSearchParams()
    const [data, setData] = useState({})

    console.log(initialValues,"=============================initialvalues")
    const formik = useFormik({
        initialValues: data,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            values.id = nanoid();
            values.courseId = params.get("exam-id")
            setSubmitting(false);
            console.log(values)
            localStorage.setItem("questions", localStorage.getItem("questions") ? JSON.stringify([...JSON.parse(localStorage.getItem("questions")), values]) : JSON.stringify([values]));
            resetForm();
        }
    });
    // console.log(formik.values,"formik")

    useEffect(()=>{
        setData(initialValues)
    console.log(formik.values)

    },[initialValues])

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Create Question
                </Typography>
                <Box mb={3}>
                    <CKEditor
                        editor={ClassicEditor}
                        data={formik.values.question}
                        onChange={(event, editor) => formik.setFieldValue('question', editor.getData())}
                    />
                    {formik.touched.question && formik.errors.question ? (
                        <div style={{ color: 'red' }}>{formik.errors.question}</div>
                    ) : null}
                </Box>
                <Grid container spacing={2}>
                    {['A', 'B', 'C', 'D'].map((option) => (
                        <Grid item xs={12} key={option}>
                            <Typography variant="h6">{`Option ${option}`}</Typography>
                            <CKEditor
                                editor={ClassicEditor}
                                data={formik.values[`option${option}`]}
                                onChange={(event, editor) => formik.setFieldValue(`option${option}`, editor.getData())}
                            />
                            {formik.touched[`option${option}`] && formik.errors[`option${option}`] ? (
                                <div style={{ color: 'red' }}>{formik.errors[`option${option}`]}</div>
                            ) : null}
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formik.values.correctAnswer === `option${option}`}
                                        onChange={() => formik.values.correctAnswer ? formik.setFieldValue('correctAnswer', ""): formik.setFieldValue('correctAnswer', `option${option}`)}
                                    />
                                }
                                label="Correct Answer"
                            />
                        </Grid>
                    ))}
                    {formik.touched.correctAnswer && formik.errors.correctAnswer ? (
                        <div style={{ color: 'red' }}>{formik.errors.correctAnswer}</div>
                    ) : null}
                </Grid>
                <Box mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export default QuestionAnswerForm;
