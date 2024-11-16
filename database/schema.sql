begin;
  
create table if not exists volumes (
  id integer primary key autoincrement,
  coin text,
  pings integer,
  net_vol_btc real,
  net_vol_percent real,
  recent_total_vol_btc real,
  recent_vol_percent real,
  recent_net_vol real,
  created_at integer
);

commit;
