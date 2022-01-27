import { useEffect, useState } from 'react';
import styles from '../../styles/pages/Course.module.css';
import Header from '../../components/Header';
import CourseValidation from '../../utils/validation/CourseValidation';
import api from '../../services/api';
import Message from '../../components/Message';
import { ToastContainer } from 'react-toastify';
import { passThroughSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';
import { useRouter } from 'next/router'

function Course() {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [slugState, setSlugState] = useState('');
    const [number, setNumber] = useState();
    const [type, setType] = useState('');
    const router = useRouter();

    async function handleSubmit() {
        e.preventDefault();
        const { slug } = router.query;
        if (!slug) {
            const data = {
                title,
                description,
                slug: slugState,
                number,
                type
            }

            let validation = await CourseValidation(data);

            if (!validation) {
                Message("Por favor, preencha todos os campos! 😊 ")
            } else {
                await api.post("/course", data)
                    .then(response => {
                        Message(response.data.message);
                        setTimeout(() => {
                            router.push("/course");
                        },2000);
                    })
                    .catch(error => {
                        Message(error.response.data.message);
                    })
            }
        } else{
            const data = {
                _id: id,
                title,
                description,
                slug: slugState,
                number,
                type
            }

            let validation = await CourseValidation(data);

            if (!validation) {
                Message("Por favor, preencha todos os campos! 😊 ")
            } else {
                await api.put("/course", data)
                    .then(response => {
                        Message(response.data.message);
                        setTimeout(() => {
                            router.push('/courses');
                        }, 2000);
                    })
                    .catch(error => {
                        Message(error.response.data.message);
                    })
            }

        }




    }

    useEffect(() => {
        if(router.query.slug){
            setId(data.course_id._id);
            setTitle(data.course_id.title);
            setDescription(data.course_id.description);
            setSlugState(data.course_id.slug);
            setNumber(data.course_id.number);
            setType(data.course_id.type);
        }
        
    }, [])

    return (
        <div className={styles.structure}>
            <Header />
            <ToastContainer />
            <div className={styles.container}>
                <h1>Adicionar um curso</h1>
                <form className={styles.formContainer}>
                    <input
                        type="text"
                        className={styles.input}
                        name="title"
                        placeholder="Nome do Curso"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                    <textarea
                        className={styles.input}
                        name="description"
                        cols="30"
                        rows="10"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder="Descrição do curso"
                    >
                    </textarea>
                    <input
                        type="text"
                        className={styles.input}
                        name="slug"
                        onChange={(e) => setSlugState(e.target.value)}
                        value={slugState}
                        placeholder="Slug"
                        required

                    />
                    <input
                        type="number"
                        className={styles.input}
                        name="number"
                        onChange={(e) => setNumber(e.target.value)}
                        value={number}
                        placeholder="Ordem"
                        required
                    />
                    <select
                        className={styles.select}
                        name="type"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                        required
                    >
                        <option value="">Selecione uma opção</option>
                        {
                            type == "bootcamp" ?
                                <>
                                    <option value="bootcamp" select>Bootcamp</option>
                                    <option value="graduacao">Gradução</option>
                                    <option value="free">Cursos Livres</option>
                                </>
                                : type == "graduacao" ?
                                <>
                                    <option value="bootcamp" >Bootcamp</option>
                                     <option value="graduacao " select>Gradução</option>
                                     <option value="free">Cursos Livres</option>
                                </>
                                : type == "FREE" ?
                                <>
                                     <option value="bootcamp" >Bootcamp</option>
                                     <option value="graduacao " >Gradução</option>
                                     <option value="free" select>Cursos Livres</option>
                                </>
                                :
                                <>
                                    <option value="bootcamp" >Bootcamp</option>
                                    <option value="graduacao " >Gradução</option>
                                    <option value="free" >Cursos Livres</option>
                                </>
                        }
                    </select>
                    <button
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                        className="btn btnPrimary"
                    >Salvar</button>
                </form>
            </div>
        </div>
    )
}

export async function getStaticPaths() {

    //chamada a api para buscar todos os caminhos
    return {
        paths: [],
        fallBack: true
    }
}

export const getServerSideProps = async (context) => {

    const { slug } = context.query;

}


if (slug) {
    let response = await api.get(`/courses/${slug[0]}`)

    return {
        props: {
            data: response.data.courses.docs[0]
        }

    }
} else {

    return {
        props: {}
    }
}

export default Course;