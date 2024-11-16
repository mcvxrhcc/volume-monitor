import { add, format, formatISO, fromUnixTime, getUnixTime } from 'date-fns';

function toHumanTime(unixTime) {
  return format(fromUnixTime(unixTime), 'HH:mm:ss dd-MM-yyyy');
}

function toRow(data) {
  const [
    coin,
    pings,
    netVolBTC,
    netVolPercent,
    recentTotalVolBTC,
    recentVolPercent,
    recentNetVol,
    t,
  ] = data.split('|');

  return {
    coin,
    pings: +pings,
    netVolBTC: parseFloat(netVolBTC),
    netVolPercent: parseFloat(netVolPercent),
    recentTotalVolBTC: parseFloat(recentTotalVolBTC),
    recentVolPercent: parseFloat(recentVolPercent),
    recentNetVol: parseFloat(recentNetVol),
    t: getUnixTime(formatISO(add(new Date(t), { hours: 7 }))),
  };
}

export { toRow, toHumanTime };
