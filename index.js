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
  solveTest();
}

function filterByArticleType(target) {
  // 1. Develop a function that prints by console the data filtering by "article_type" and get all the data that are different from "Research Article".
  // ○ Extra points, receive the value to filter by parameters.
  return docs.filter((doc) => doc.article_type === target);
}

function showAuthorDisplayByArticleScore(target) {
  // 2. Develop a function that prints by console all "author_display" with "score" greater than "6.0".
  // ○ Extra points, receive the value to filter by parameters.
  return docs
    .filter((doc) => doc.score > target)
    .map((doc) => {
      return { author_display: doc.author_display };
    });
}

function findById() {
  // Develop a function that gets the record with id "10.1371/journal.pgen.1006605" update "article_type" to "Newspaper" and print this by console.
  return docs.find((doc) => doc.id === '10.1371/journal.pgen.1006605');
}

function showAllArticleTypes() {
  // Develop a function that gets all the "article_type" without repeating and print it by console.
  let arrayArticleTypes = docs.map((doc) => {
    return doc.article_type;
  });

  return arrayArticleTypes.filter(
    (item, index) => arrayArticleTypes.indexOf(item) === index
  );
}

function showAllJournals() {
  // Develop a function that concatenates all the "journal" and prints them by console.
  // ○ Extra point, print all the "journal" without repeating.
  let arrayJournals = docs.map((doc) => {
    return doc.journal;
  });

  return arrayJournals
    .filter((item, index) => arrayJournals.indexOf(item) === index)
    .join(',');
}

function removeProperty(property) {
  // Develop a function that removes a property of the array "docs" and prints the new array by console.
  // ○ Extra point, receive the property to be removed by parameter.
  return docs.map((doc) => {
    delete doc[property];
    return doc;
  });
}

function showRange() {
  let startIndex = docs.findIndex(
    (doc) => doc.id === '10.1371/journal.pone.0047101'
  );
  let endIndex = docs.findIndex(
    (doc) => doc.id === '10.1371/journal.pgen.1000047'
  );
  let arrayRanged = [];

  for (let i = startIndex; i <= endIndex; i++) {
    arrayRanged.push(docs[i]);
  }

  return arrayRanged;
}

function addArray() {
  const array = [
    {
      id: '10.1371/journal.pone.0177149',
      journal: 'Wall Street',
      eissn: '1932-6203',
      publication_date: '2017-05-03T00:00:00Z',
      article_type: 'Newspaper',
      author_display: [
        'Irina Bruck',
        'Nalini Dhingra',
        'Matthew P. Martinez',
        'Daniel L. Kaplan',
      ],
      abstract: [
        '\nDpb11 is required for the initiation of DNA replication in budding yeast. We found that Dpb11 binds tightly to single-stranded DNA (ssDNA) or branched DNA structures, while its human homolog, TopBP1, binds tightly to branched-DNA structures. We also found that Dpb11 binds stably to CDK-phosphorylated RPA, the eukaryotic ssDNA binding protein, in the presence of branched DNA. A Dpb11 mutant specifically defective for DNA binding did not exhibit tight binding to RPA in the presence of DNA, suggesting that Dpb11-interaction with DNA may promote the recruitment of RPA to melted DNA. We then characterized a mutant of Dpb11 that is specifically defective in DNA binding in budding yeast cells. Expression of dpb11-m1,2,3,5,ΔC results in a substantial decrease in RPA recruitment to origins, suggesting that Dpb11 interaction with DNA may be required for RPA recruitment to origins. Expression of dpb11-m1,2,3,5,ΔC also results in diminished GINS interaction with Mcm2-7 during S phase, while Cdc45 interaction with Mcm2-7 is like wild-type. The reduced GINS interaction with Mcm2-7 may be an indirect consequence of diminished origin melting. We propose that the tight interaction between Dpb11, CDK-phosphorylated RPA, and branched-DNA may be required for the essential function of stabilizing melted origin DNA in vivo. We also propose an alternative model, wherein Dpb11-DNA interaction is required for some other function in DNA replication initiation, such as helicase activation.\n',
      ],
      title_display:
        'Dpb11 may function with RPA and DNA to initiate DNA replication',
      score: 7.018296,
    },
    {
      id: '10.1371/journal.pgen.1006699',
      journal: 'Wall Street',
      eissn: '1553-7404',
      publication_date: '2017-02-10T00:00:00Z',
      article_type: 'Newspaper',
      author_display: [
        'Concetta Cuozzo',
        'Antonio Porcellini',
        'Tiziana Angrisano',
        'Annalisa Morano',
        'Bongyong Lee',
        'Alba Di Pardo',
        'Samantha Messina',
        'Rodolfo Iuliano',
        'Alfredo Fusco',
        'Maria R. Santillo',
        'Mark T. Muller',
        'Lorenzo Chiariotti',
        'Max E. Gottesman',
        'Enrico V. Avvedimento',
      ],
      abstract: [''],
      title_display:
        'Correction: DNA Damage, Homology-Directed Repair, and DNA Methylation',
      score: 7.018296,
    },
  ];
  let newArray = [...docs];
  return newArray.concat(array);
}

function oddDocs() {
  let oddDocsArray = [];

  docs.forEach((doc, index) => {
    if (index % 2 !== 0) {
      oddDocsArray.push({
        id: doc.id,
        title: doc.title_display + ' - ' + doc.journal,
        score: doc.score,
        article_type: doc.article_type,
        authors: doc.author_display.join(' - '),
      });
    }
  });

  return sortBy(oddDocsArray, 'id');
}

function sortBy(array, parameter) {
  // Order descending
  return array.sort((a, b) => {
    if (a[parameter] > b[parameter]) {
      return 1;
    }
    if (a[parameter] < b[parameter]) {
      return -1;
    }
    return 0;
  });
}

function solveTest() {
  console.log('Punto 1:', filterByArticleType('Research Article'));
  console.log('Punto 2:', showAuthorDisplayByArticleScore(6.0));
  console.log('Punto 3:', findById());
  console.log('Punto 4:', showAllArticleTypes());
  console.log('Punto 5:', showAllJournals());
  console.log('Punto 6:', removeProperty('abstract'));
  console.log('Punto 7:', showRange());
  console.log('Punto 8:', addArray());
  console.log('Punto 9:', oddDocs());
}

get();
