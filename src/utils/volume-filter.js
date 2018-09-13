const volumeFilter = {};

volumeFilter.install = (Vue, options) => {
  Vue.filter('volume', function (value) {
    return Math.round(value * 100);
  });
};

export default volumeFilter;
