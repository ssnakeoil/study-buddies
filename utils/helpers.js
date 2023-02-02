module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    todays_date: () => {
      let date = new Date().toDateString();
      return date;
    }
  };
  