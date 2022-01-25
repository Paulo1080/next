import styles from '../../styles/pages/Courses.module.css';
import Header from '../../components/Header';
import CardCourse from '../../components/CardCourse';
import api from '../../services/api';

function Courses () {
    return (
        <div className={styles.structure}>
        <Header />
            <div className={styles.container}>
                <h1>Lista de cursos</h1>
                <div className={styles.cardContainer}>
                  <CardCourse />  
                </div>            
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    
    let response = await api.get("/courses")



    return {
        props: {},
    }
}

export default Courses;