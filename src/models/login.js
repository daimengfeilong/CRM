import { getPhoneNo,sendSms,userLogin } from '../services/login'
import { Message } from 'antd'


export default {
    namespace: 'login',
    state: {
        phoneNo: 0,
        captchaSrc:'',
        timeNumSms: 60,
        loading:false,
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        getCaptchaSrc(state, { payload }) {
            const captchaSrc = `/api/bycx-rece-service/aSysMsgCaptcha/getCodeImg?phoneNo=${state.phoneNo}&ts=${new Date().getTime()}`

            return {
                ...state,
                captchaSrc
            }
        },
    },
    effects: {
        *getPhone({ payload }, { call, put, select }) {
            const res = yield call(getPhoneNo, payload)

            if (res.code === '0000') {
                const phoneNo = res.result.phoneNo

                yield put({ type: 'getCaptchaSrc'})
                yield put({ type: 'save', payload: { phoneNo } })
            } else {
                Message.error(res.msg)
                yield put({ type: 'save', payload: { phoneNo: 0 } })
            }
        },
        *sendSms({ payload }, { call, put, select }) {
            const res = yield call(sendSms, payload)

            return res
        },
        *userLogin({ payload }, { call, put, select }) {
            const res = yield call(userLogin, payload)

            return res
        },
        *Interval({ payload = {} }, { put, call, select }) {
            const delay = (ms) => new Promise((resolve) => {setTimeout(resolve, ms)})

            //60秒倒计时... 
            let i = 60
            while (i > 0) {
                i--;
                const { hash } = window.location

                if( hash === '#/' || hash === '#/login' ){
                    yield call(delay, 1000);
                    yield put({
                        type: 'save',
                        payload: {
                            timeNumSms: i
                        }
                    })
                }
            }
        }
    }
}
