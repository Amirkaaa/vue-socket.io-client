/**
 * shitty logger class
 */
export default new class VueSocketIoClientLogger {

  constructor() {
    this.debug = false;
    this.prefix = '%cvue-Socket-io: ';
  }

  info(text, data = '') {

    if(this.debug) window.console.info(this.prefix+`%c${text}`, 'color: blue; font-weight: 600', 'color: #333333', data);

  }

  error() {

    if(this.debug) window.console.error(this.prefix, ...arguments);

  }

  warn() {

    if(this.debug) window.console.warn(this.prefix, ...arguments);

  }

  event(text, data = ''){

    if(this.debug) window.console.info(this.prefix+`%c${text}`, 'color: blue; font-weight: 600', 'color: #333333', data);

  }

}
