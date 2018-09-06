const lowercaseFilter = {};

lowercaseFilter.install = (Vue, options) => {
  Vue.filter('lowercase', function (value) {
    return value.toLowerCase();
  });
};

export default lowercaseFilter;
