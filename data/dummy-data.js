import Product from '../models/product';

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Червена тениска',
    'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
    'Червена тениска, идеална за дни с топли пурпурни залези.',
    29.99
  ),
  new Product(
    'p2',
    'u1',
    'Син килим',
    'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'Комбинира се отлично с червената ви тениска. Използва се за подова настилка, а не дреха',
    99.99
  ),
  new Product(
    'p3',
    'u2',
    'Чаша за кафе',
    'https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg',
    'Може да се използва и за чай!',
    8.99
  ),
  new Product(
    'p4',
    'u3',
    'Книга-LimitedEdition',
    'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
    "Какво пише вътре? Има ли значение? Тя е limited edition!",
    15.99
  ),
  new Product(
    'p5',
    'u3',
    'Мак',
    'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
    'Чудесен хардуер, кофти клавиатура и солидна цена. Купи сега, преди да пуснат нов модел!',
    2299.99
  ),
  new Product(
    'p6',
    'u1',
    'Писалка и тетрадка',
    'https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg',
    "Съвместими с всичко което искате да запишете... ако знаете да пишете.",
    5.49
  )
];

export default PRODUCTS;