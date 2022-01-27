import * as yup from 'yup';

async function CourseValidation(data){
    let schema = yup.object().shape({
        title: yup.string().required(),
        discription: yup.string().required(),
        slug: yup.string().required(),
        number: yup.number().required()

    });

    return await schema.isValid(data)
}

export default CourseValidation;