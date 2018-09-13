const numberFormatFilter = {};

const units = ['', 'K', 'M', 'G'];

numberFormatFilter.install = (Vue, options) => {
  Vue.filter('humanNumber', function (value) {
    let numValue = Number(value);
    let count = 0;

    while (numValue > 1000) {
      numValue = numValue / 1000.0;
      count++;
    }

    return (Number.isInteger(numValue) ? numValue : numValue.toFixed(2)) + units[count];
  });
};

export default numberFormatFilter;
