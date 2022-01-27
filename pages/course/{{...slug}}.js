import { useEffect, useState } from 'react';
import styles from '../../styles/pages/Course.module.css';
import Header from '../../components/Header';
import CourseValidation from '../../utils/validation/CourseValidation';
import api from '../../services/api';
import Message from '../../components/Message';
import { ToastContainer } from 'react-toastify';
import { passThroughSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';


function Course () {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ slug, setSlug ] = useState('');
    const [ number, setNumber ] = useState();
    const [ type, setType ] = useState('');

    async function handleSubmit(){
        e.preventDefault();

        const data = {
            title,
            description,
            slug,
            number,
            type
        }

        let validation = await CourseValidation(data);

        if(!validation) {
            Message("Por favor, preencha todos os campos! 😊 ")
        }else{
            await api.post("/course", data)
            .then(response => {
                Message(response.data.message);
            })
            .catch(error => {
                Message(error.response.data.message);
        })
        }

        
    }
/*
    useEffect(() => {
        console.log(title)
    }, [title])
*/
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
                        name ="title" 
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
                        onChange={(e) => setSlug(e.target.value)}
                        value={slug} 
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
                      <option value="bootcamp">Bootcamp</option>
                      <option value="graduacao">Gradução</option>
                      <option value="free">Cursos Livres</option>  
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

export async function getStaticPaths () {
    
    //chamada a api para buscar todos os caminhos
    return { 
        paths: [],
        fallBack: true
    }   
}

export async function getStaticProps(context) {
    
    const { slug } = context.params;

    let response = await api.get(`/courses/${slug[0]}`)

    


    return {
        props: {
            courses: response.data.courses.docs
        },
        revalidate: 1
    }
}

export default Course;