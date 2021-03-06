import dva from 'dva';
import createLoading from 'dva-loading'

import './index.less'

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/layout').default);
// require('./admin/models').default.forEach(key => {
//     app.model(key.default);
// });

// 4. Router
app.router(require('./router/index').default);

// 5. Start
app.start('#root');
