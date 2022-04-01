let docs = [];

async function getData() {
  return await fetch("https://api.plos.org/search?q=title:DNA")
    .then((response) => response.json())
    .then((json) => {
      docs = json.response.docs;
    });
}

function filterDocsBy(property, target) {
  // 1. Develop a function that prints by console the data filtering by "article_type" and get all the data that are different from "Research Article".
  // ○ Extra points, receive the value to filter by parameters.
  return docs.filter((doc) => doc[property] === target);
}

async function get() {
  await getData();
  console.log(docs);
  console.log("Punto 1", filterDocsBy("article_type", "Research Article"));
}
get();
