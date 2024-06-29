import * as Yup from "yup"

const ExamCreateSchema = Yup.object().shape({
    examName: Yup.string().required('Exam name is required'),
    courseName: Yup.string().required('Course name is required'),
    examType: Yup.string().required('Exam type is required'),
});
export default ExamCreateSchema;