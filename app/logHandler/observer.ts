import { Subscription } from 'rxjs';

import type { Sorted } from './parser';
import { logManager, watchStateManager } from './manager';

function createObserver(type: 'box' | 'state', cb?: () => Subscription) {
  return {
    next: (value: Sorted) => {
      logManager(type, value, cb);
    },
    complete: () => {
      const message = `${type} 🔚 工作结束`;
      console.log(message);
      watchStateManager('complete', message);
    },
    error: (err: Error) => {
      const message = `${type} ❌ 工作出现了问题: ${err}`;
      console.log(message);
      watchStateManager('error', message);
    },
  };
}

export default createObserver;
