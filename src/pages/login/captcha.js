const captcha = ({ dispatch,captchaSrc }) => {
    return (
        <img style={{ width: '100%' }} src={captchaSrc} onClick={() => dispatch({type:'login/getCaptchaSrc'})} />
    )
}

export default captcha