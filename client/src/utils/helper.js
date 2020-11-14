import moment from 'moment';

export const makeActionCreator = (type, ...argNames) => {
  return {
    type,
    create: (...args) => {
      const action = { type };
      argNames.forEach((arg, index) => {
        action[argNames[index]] = args[index]
      });
      return action;
    }
  }
}

export const currencyInformation = (data, selectedDate) => {
  const selectMonth = selectedDate[0];
  const selectDay = parseInt(selectedDate[1]);
  const selectedDateInfo = data.filter((item) => {
    const date = moment(item.date, 'MMM DD, YYYY')
    const month = date.format('MMM');
    const day = parseInt(date.format('DD'));
    return selectDay === day && selectMonth === month;
  });

  const selectedDateChanges =  selectedDateInfo.map(item => parseFloat(item.close));
  const oneDayBeforeDate = moment(`${selectMonth} ${selectDay}, 2019`).subtract(1, 'd').format('MMM DD, YYYY');
  const lastDayData = data.filter(item => item.date === oneDayBeforeDate);
  const lastDayChanges = lastDayData.map(item => item.close);
  
  const seventhBeforeDate = moment(`${selectMonth} ${selectDay}, 2019`).subtract(7, 'd').format('MMM DD, YYYY');
  const sevenDaysData = data.filter(item => item.date === seventhBeforeDate);
  const sevenDaysChanges =  sevenDaysData.map(item => item.close);
  
  const oneMonthBeforeDate = moment(`${selectMonth} ${selectDay}, 2019`).subtract(1, 'months').format('MMM DD, YYYY');
  const oneMonthData = data.filter(item => item.date === oneMonthBeforeDate);
  const lastMonthChanges = oneMonthData.map(item => item.close);

  const coin = selectedDateInfo.map(item => item.currency);
  const price = selectedDateInfo.map(item => item.close);
  const dailyDiff = selectedDateInfo.map((item, index) => {
    if (typeof item.close && typeof lastDayChanges[index] === 'string') {
      const close = numberStringToFloat(item.close)
      const lastDayClose = numberStringToFloat(lastDayChanges[index]);
      return (lastDayClose - close) / 100;
    } else {
      return (lastDayChanges[index] - item.close) / 100;
    }
  });

  const weeklyDiff = sevenDaysChanges.map((item, index) => {
    if (typeof item && typeof selectedDateChanges[index] === 'string') {
      const close = numberStringToFloat(item)
      const lastWeekClose = numberStringToFloat(selectedDateChanges[index]);
      
      return (lastWeekClose - close) / 100;
    } else {
      return (selectedDateChanges[index] - item) / 100;
    }
  });

  const monthlyDiff = lastMonthChanges.map((item, index) => {
    if (typeof item && typeof selectedDateChanges[index] === 'string') {
      const close = numberStringToFloat(item)
      const lastMonthClose = numberStringToFloat(selectedDateChanges[index]);
      return (lastMonthClose - close) / 100;
    } else {
      return (selectedDateChanges[index] - item) / 100;
    }
  });

  const dailyVolume = selectedDateInfo.map(item => item.volume);
  const dailyMktCap= selectedDateInfo.map(item => item.marketCap);

  return coin.map((item, index) => {
    return {
      coin: item ? item : '',
      price: price[index] ? price[index] : '',
      dailyDiff: dailyDiff[index] ? dailyDiff[index].toFixed(1) : '',
      weeklyDiff: weeklyDiff[index] ? weeklyDiff[index].toFixed(1) : '', 
      monthlyDiff: monthlyDiff[index] ? monthlyDiff[index].toFixed(1) : '',
      dailyVolume: dailyVolume[index] ? dailyVolume[index] : '',
      dailyMktCap: dailyMktCap[index] ? dailyMktCap[index] : '',
    }
  });
}

const numberStringToFloat = (string) => {
  return parseFloat(string.replace(/,/g, ""));
}