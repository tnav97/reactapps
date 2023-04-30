import { Application } from 'express';
import { AppStartupOptions } from './types';

export default function runApp(app: Application, options: AppStartupOptions) {
  const { port, appName, setup = undefined, callback = undefined } = options;

  const startApp = () => {
    app.listen(port, () => {
      console.log(`${appName || 'App'} started on port ${port}`);
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  if (setup && typeof setup === 'function') {
    setup().then(() => {
      startApp();
    });
  } else {
    startApp();
  }
}
