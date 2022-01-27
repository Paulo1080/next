import styles from '../../styles/components/CardCourse.module.css'
import Link from 'next/link';
import api from '../../services/api'
import  Message  from '../Message';
import { ToastContainer} from 'react-toastify';

function CardCourse( {course} ) {

    async function handleDelete (id) {
        await api.delete(`/course/${id}`)
        .then(response => {
            Message(response.data.message);
            setTimeout(() => {
                location.reload();
            }, 2000)
        })
        .catch( error => {
            Message(error.response.data.message);
        })
    }

    return(
        <div className={styles.card} >
            <ToastContainer />
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <Link
                href={`/course/${course.slug}`}
            >
                <a>
                    Editar Curso
                </a>
            </Link>
            <a
                onClick={() => handleDelete(course._id)}
                className={styles.delete}
            >
                Excluir Curso
            </a>
        </div>
    )
}

export default CardCourse;