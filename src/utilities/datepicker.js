const DateTime = easepick.DateTime;
const today = new DateTime();
const start = new DateTime("2011-01-01");

const picker = new easepick.create({
  element: "#datepicker",
  css: ["https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css"],
  zIndex: 10,
  AmpPlugin: {
    dropdown: {
      months: true,
      years: true,
    },
    resetButton: true,
  },
  plugins: ["AmpPlugin", "RangePlugin", "PresetPlugin"],
});

picker.setStartDate(start);
picker.setEndDate(today);

function getEndString() {
  var end = getEnd();
  var endYear = end.getFullYear();
  var endMonth = end.getMonth() + 1;
  var finalMonth = ("0" + endMonth).slice(-2);
  var endDay = end.getDate();
  var finalDay = ("0" + endDay).slice(-2);
  return endYear + "-" + finalMonth + "-" + finalDay;
}

function getStartString() {
  var start = getStart();
  var startYear = start.getFullYear();
  var startMonth = start.getMonth() + 1;
  var finalMonth = ("0" + startMonth).slice(-2);
  var startDay = start.getDate();
  var finalDay = ("0" + startDay).slice(-2);
  return startYear + "-" + finalMonth + "-" + finalDay;
}

function getStart() {
  return picker.getStartDate();
}

function getEnd() {
  return picker.getEndDate();
}
