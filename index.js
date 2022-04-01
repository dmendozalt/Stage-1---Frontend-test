let docs = [];

async function getData() {
  return await fetch('https://api.plos.org/search?q=title:DNA')
    .then((response) => response.json())
    .then((json) => {
      docs = json.response.docs;
    });
}

async function get() {
  await getData();
  console.log(docs);
}

get();
