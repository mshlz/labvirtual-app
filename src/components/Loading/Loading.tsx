const LoadingComponent = ({ fullHeight = false, fullWidth = false }) => {
    return <>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: fullHeight && '100vh',
            width: fullWidth && '100vw',
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

const LoadingWrapper = ({ children, isLoading }) => {
    return  <>
    { isLoading && <LoadingComponent /> }
    <div className={isLoading && 'd-none'}>
        {children}
    </div>
    </>
}

export { LoadingComponent, LoadingWrapper }