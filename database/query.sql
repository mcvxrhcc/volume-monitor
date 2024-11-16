SELECT coin,
       count(*)
FROM volumes
WHERE net_vol_btc > 0
  AND net_vol_percent > 1
GROUP BY coin
HAVING count(*) > 1
ORDER BY count(*) DESC;


