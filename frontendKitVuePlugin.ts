import quasar from '../quasar/ui/src/vue-plugin.js';
import Loading from '../quasar/ui/src/plugins/Loading.js';
import * as quasarComponents from '../quasar/ui/src/index.prod.js';

export default function(app, options) {
  app.use(quasar, {
    plugins: {
      Loading
    },
    config: {
      loading: {}
    }
  });
  Object.keys(quasarComponents).forEach((key) => {
    app.component(key, quasarComponents[key]);
  });
}
