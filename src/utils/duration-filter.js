import formatDuration from 'format-duration';

const formatDurationFilter = {};

formatDurationFilter.install = (Vue, options) => {
  Vue.filter('duration', function (value) {
    return formatDuration(value * 1000);
  });
};

export default formatDurationFilter;
