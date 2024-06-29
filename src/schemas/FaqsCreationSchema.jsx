import * as Yup from 'yup';

const FaqsCreationSchema = Yup.object().shape({
    question: Yup.string().required('Question is required'),
    answer: Yup.string().required('Answer is required'),
    status: Yup.boolean().required('Status is required'),
});

export default FaqsCreationSchema;