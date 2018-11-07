const captcha = ({ phoneNo }) => {
    return (
        <img style={{ width: '100%' }} src={`/dfs/bycx-rece-service/aSysMsgCaptcha/getCodeImg?phoneNo=${phoneNo}&ts=${new Date().getTime()}`} />
    )
}

export default captcha