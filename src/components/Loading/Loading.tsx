const LoadingComponent = () => {
    return <>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            position: 'relative',
            flexDirection: 'column'
        }}>
            <span style={{
                fontSize: '1.8rem',
                marginBottom: '.2rem'
            }}>
                <i className="fa fa-spinner fa-spin"></i>
            </span>
            <h1>Carregando</h1>
        </div>
    </>
}

export { LoadingComponent }