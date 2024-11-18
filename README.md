- `pm2 start app.js` to run process that:
  - Fetch data
  - Insert data into db
  - Discord notify
- `node server.js` then go to `http://localhost:3000` to view chart

**TODO**

- Noti in web
- Query builder in BE
- VACUUM sqlite every x days (reduce size and noise)
  - cronjob?
