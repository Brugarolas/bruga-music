const bus = {};

bus.install = (Vue, options) => {
  Vue.prototype.$bus = new Vue();
};

export default bus;
