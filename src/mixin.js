export default {

  /**
   *  Assign runtime callbacks
   */
  beforeCreate() {

    if (!this.sockets) this.sockets = {};

    if (typeof this.$VueSocketIoClient === 'object') {
      for (const namespace of Object.keys(this.$VueSocketIoClient)) {
        this.sockets[namespace] = {
          subscribe: (event, callback) => {
            this.$VueSocketIoClient[namespace].emitter.addEventListener(event, callback, this);
          },
          unsubscribe: (event) => {
            this.$VueSocketIoClient[namespace].emitter.removeEventListener(event, this);
          }
        }
      }
    } else {
      this.$VueSocketIoClient.emitter.addEventListener(event, callback, this);
      this.$VueSocketIoClient.emitter.removeEventListener(event, this);
    }
  },

  /**
   * Register all socket events
   */
  mounted() {

    if (this.$options.sockets) {

      if (typeof this.$VueSocketIoClient === 'object') {
        for (const namespace of Object.keys(this.$VueSocketIoClient)) {
          if (this.$options.sockets[namespace]) {
            Object.keys(this.$options.sockets[namespace]).forEach(event => {

              if (event !== 'subscribe' && event !== 'unsubscribe') {
                this.$VueSocketIoClient[namespace].emitter.addEventListener(event, this.$options.sockets[namespace][event], this);
              }

            });
          }
        }
      } else {
        Object.keys(this.$options.sockets).forEach(event => {

          if (event !== 'subscribe' && event !== 'unsubscribe') {
            this.$VueSocketIoClient.emitter.addEventListener(event, this.$options.sockets[event], this);
          }

        });
      }
    }

  },

  /**
   * Unsubscribe when component unmount
   */
  beforeDestroy() {

    if (this.$options.sockets) {

      if (typeof this.$VueSocketIoClient === 'object') {
        for (const namespace of Object.keys(this.$VueSocketIoClient)) {
          if (this.$options.sockets[namespace]) {
            Object.keys(this.$options.sockets[namespace]).forEach(event => {

              this.$VueSocketIoClient[namespace].emitter.removeEventListener(event, this);

            });
          }
        }
      } else {
        Object.keys(this.$options.sockets).forEach(event => {

          this.$VueSocketIoClient.emitter.removeEventListener(event, this);

        });
      }

    }

  }

}
