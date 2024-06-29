import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Divider } from '@mui/material';
import { useFormik } from 'formik';
import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Yup from "yup"
import QuestionAnswerForm from '../QuestionAnswerForm';
import { useDispatch, useSelector } from 'react-redux';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export default function Mcqs({ initialValues, open, rows, setOpen, handleClickOpen, handleClose, setRows }) {
    console.log(initialValues,"666666666666666")
    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                maxWidth={"lg"}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Add Questions?"}</DialogTitle>
                <Divider />
                <DialogContent>
                    <QuestionAnswerForm initialValues={initialValues} rows={rows} setRows={setRows}/>
                </DialogContent>
            </Dialog>
        </>
    );
}
