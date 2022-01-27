import styles from '../../styles/pages/Courses.module.css';
import Header from '../../components/Header';
import CardCourse from '../../components/CardCourse';
import api from '../../services/api';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function Courses (courses) {

    const [coursesState, setCoursesState] = useState([]);

    useEffect(() => {
        setCoursesState(courses)
    }, [])

    return (
        <div className={styles.structure}>
        <Header />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Lista de cursos</h1>
                    <Link
                        href="/course"
                    >
                        <a className="btn btnPrimary">
                            Novo Curso
                        </a>
                    </Link>
                </div>
                
                <div className={styles.cardContainer}>
                  {
                      coursesState.map((courses, index) => (
                          <CardCourse key={index} course={course}/>
                      ))
                  }    
                </div>            
            </div>
        </div>
    )
}

export async function getStaticProps() {
    
    Cookies.get("over_token")

    let response = await api.get("/courses")

    api.headers.Authorizations


    return {
        props: {
            courses: response.data.courses.docs
        },
        revalidate: 10
    }
}

export default Courses;