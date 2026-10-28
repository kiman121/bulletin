# Bulletin

A Next.js reader for the records produced by [html-records](https://github.com/kiman121/html-records) and served by [records-api](https://github.com/kiman121/records-api).

On a wide screen the list stays on the left and the open notice fills the page. On a phone you see the list first, then the notice, with a way back. Search filters the list and leaves the open notice in place when the search hides it. If the API is down, the page shows the saved sample and says so.

## Run

Start the API, then the reader:

```bash
# in records-api
npm start

# in bulletin
npm install
npm test
npm run dev
```

Open http://127.0.0.1:3001. `RECORDS_API_URL` overrides the default `http://127.0.0.1:3000`.
