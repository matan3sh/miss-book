const gDefaultBooks = [
  {
    id: 'GXj93KOkqZoC',
    title: 'Hacking',
    subtitle: 'Digital Media and Technological Determinism',
    authors: ['Tim Jordan', 'Puki Ben David'],
    publishedDate: 2008,
    description:
      'Hacking provides an introduction to the community of hackers and an analysis of the meaning of hacking in twenty-first century societies.',
    pageCount: 160,
    categories: ['Computers', 'Hack'],
    thumbnail: 'http://coding-academy.org/books-photos/1.jpg',
    language: 'en',
    listPrice: {
      amount: 19,
      currencyCode: 'ILS',
      isOnSale: true,
    },
  },
  {
    id: 'JYOJa2NpSCq',
    title: 'morbi',
    subtitle: 'lorem euismod dictumst inceptos mi',
    authors: ['Barbara Cartland'],
    publishedDate: 1978,
    description:
      'aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor',
    pageCount: 129,
    categories: ['Computers', 'Hack'],
    thumbnail: 'http://coding-academy.org/books-photos/14.jpg',
    language: 'sp',
    listPrice: {
      amount: 44,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: '1y0Oqts35DQ',
    title: 'at viverra venenatis',
    subtitle: 'gravida libero facilisis rhoncus urna etiam',
    authors: ['Dr. Seuss'],
    publishedDate: 1999,
    description:
      'lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant',
    pageCount: 972,
    categories: ['Computers', 'Hack'],
    thumbnail: 'http://coding-academy.org/books-photos/2.jpg',
    language: 'he',
    listPrice: {
      amount: 108,
      currencyCode: 'ILS',
      isOnSale: false,
    },
  },
  {
    id: 'kSnfIJyikTP',
    title: 'dictum',
    subtitle:
      'augue eu consectetur class curabitur conubia ligula in ullamcorper',
    authors: ['Danielle Steel'],
    publishedDate: 1978,
    description:
      'interdum inceptos mauris habitant primis neque tempus lacus morbi auctor cras consectetur euismod vehicula neque netus enim vivamus augue molestie imperdiet tincidunt aliquam',
    pageCount: 303,
    categories: ['Computers', 'Hack'],
    thumbnail: 'http://coding-academy.org/books-photos/16.jpg',
    language: 'en',
    listPrice: {
      amount: 30,
      currencyCode: 'EUR',
      isOnSale: true,
    },
  },
  {
    id: 'f4iuVmbuKCC',
    title: 'sem himenaeos aptent',
    subtitle: 'interdum per habitasse luctus purus est',
    authors: ['Dr. Seuss'],
    publishedDate: 2011,
    description:
      'et vehicula faucibus amet accumsan lectus cras nulla cubilia arcu neque litora mi habitasse quis amet augue facilisis sed',
    pageCount: 337,
    categories: ['Computers', 'Hack'],
    thumbnail: 'http://coding-academy.org/books-photos/12.jpg',
    language: 'sp',
    listPrice: {
      amount: 19,
      currencyCode: 'USD',
      isOnSale: false,
    },
  },
  {
    id: 'U2rfZO6oBZf',
    title: 'mi ante posuere',
    subtitle:
      'sapien curae consectetur ultrices fringilla blandit ipsum curae faucibus',
    authors: ['Leo Tolstoy'],
    publishedDate: 1978,
    description:
      'senectus habitant nam imperdiet nostra elit dapibus nisl adipiscing in',
    pageCount: 748,
    categories: ['Computers', 'Hack'],
    thumbnail: 'http://coding-academy.org/books-photos/1.jpg',
    language: 'en',
    listPrice: {
      amount: 91,
      currencyCode: 'USD',
      isOnSale: true,
    },
    reviews: [
      {
        id: 'ghf125',
        fullName: 'Book Reader 1',
        rate: 1,
        readAt: Date.now(),
        textArea: 'Bla Bla Bla',
      },
      {
        id: 'geg57h',
        fullName: 'Book Reader 2',
        rate: 5,
        readAt: Date.now(),
        textArea: 'Bla2 Bla2 Bla2',
      },
    ],
  },
];

function getDefaultData() {
  return gDefaultBooks;
}

export default {
  getDefaultData,
};
