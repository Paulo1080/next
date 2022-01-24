function Error({ statusCode }) {
    return (
      <p>
        {statusCode
          ? `Ocorreu o erro: ${statusCode} no servidor`
          : 'Ocorreu um erro no cliente'}
      </p>
    )
  }
  
  export const getInitialProps = async ({ res, err }) => {  
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
  
  export default Error