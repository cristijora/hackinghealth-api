// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
let initialPeriods = [{
  period: 1,
  title: '0-3 luni',
  active: false
},
  {period: 2, title: '3-6 luni', active: true},
  {period: 3, title: '6-9 luni', active: false},
  {period: 4, title: '9-12 luni', active: false},
  {period: 5, title: '1-2 ani', active: false},
]
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function periods(hook) {
    const user = hook.params.user;
    hook.data = {
      userId: user._id,
      periods: initialPeriods
    }
    return Promise.resolve(hook);
  };
};
