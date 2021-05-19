const {
  Category,
  Status,
  Client,
  Admin,
  Product,
  Order,
  OrdersProduct,
} = require("../database/index");
const hash = require("../database/bcrypt");
const { response } = require("express");

const categoriesSeed = [
  "Imagen y Sonido",
  "Cocina",
  "Climatizacion",
  "Limpieza",
  "Otros",
];

const statusesSeed = ["En proceso", "Pago", "Cancelado"];

const clientsSeed = [
  {
    name: "Kevin",
    lastName: "Mullin",
    email: "kevinmullinf@gmail.com",
    password: "kevin",
    direction: "Mi casa",
    phone: "094210283",
  },
  {
    name: "Test",
    lastName: "Testy",
    email: "test@hotmail.com",
    password: "Test",
    direction: "Testland 404",
    phone: "097000000",
  },
];

const adminsSeed = [
  {
    name: "Kevin",
    lastName: "Mullin",
    email: "kevinmullinf@gmail.com",
    password: "kevin",
  },
  {
    name: "Test",
    lastName: "Testy",
    email: "test@hotmail.com",
    password: "Test",
  },
];

const productsSeed = [
  {
    name: "Smart TV Samsung 75 2020 QLED 4K HDR",
    description:
      "Los colores son tan reales como deberían ser. Con la exclusiva tecnología de punto cuántico de Samsung, QLED aumenta el volumen de color en un 100 %, de modo que disfrutarás de colores realistas en escenas oscuras o brillantes. Experimenta escenas reales. El sistema Direct Full Array 8X de QLED controla finamente la retroiluminación para crear contrastes impecables y una luz óptima. Prepárate para experimentar una mayor profundidad y ver los objetos como nunca antes.",
    img: "https://www.estrategiaynegocios.net/csp/mediapool/sites/dt.common.streams.StreamServer.cls?STREAMOID=RDGJtT2_wvbyq5AjPJET4c$daE2N3K4ZzOUsqbU5sYsJwndwh_25dutpI2C1IJwl6FB40xiOfUoExWL3M40tfzssyZqpeG_J0TFo7ZhRaDiHC9oxmioMlYVJD0A$3RbIiibgT65kY_CSDiCiUzvHvODrHApbd6ry6YGl5GGOZrs-&CONTENTTYPE=image/jpeg",
    price: 202500,
    stock: 20,
    highlight: false,
    slug: "smart-tv-samsung-75-2020-qled-4k-hdr",
    category: 1,
  },
  {
    name: "Smart TV Panavox 65 4K HDR",
    description:
      "TV & Monitor Smart LED con conexión a internet, con un nivel por encima de la media, la mejor opcion en relación calidad y precio.",
    img: "https://http2.mlstatic.com/D_NQ_NP_609578-MLU45062894964_032021-W.jpg",
    price: 39990,
    stock: 40,
    highlight: true,
    slug: "smart-tv-panavox-65-4k-hdr",
    category: 1,
  },
  {
    name: "Smart TV Panavox 32",
    description: "TV & Monitor Smart LED con conexión a internet.",
    img: "https://api.carlosgutierrez.com.uy/fotos/fotos/201156/ppal-desktop-1x.jpg",
    price: 9900,
    stock: 60,
    highlight: true,
    slug: "smart-tv-panavox-32",
    category: 1,
  },
  {
    name: "Smart TV Samsung 85 2021 QLED 8K",
    description:
      "Los colores son tan reales como deberían ser. Con la exclusiva tecnología de punto cuántico de Samsung, QLED aumenta el volumen de color en un 100 %, de modo que disfrutarás de colores realistas en escenas oscuras o brillantes. Experimenta escenas reales. El sistema Direct Full Array 8X de QLED controla finamente la retroiluminación para crear contrastes impecables y una luz óptima. Prepárate para experimentar una mayor profundidad y ver los objetos como nunca antes.",
    img: "https://icdn.dtcn.com/image/digitaltrends_es/samsung-q900r-85-inch-8k-qled-tv-review-9.jpg",
    price: 560500,
    stock: 10,
    highlight: false,
    slug: "smart-tv-samsung-85-2021-qled-8k",
    category: 1,
  },
  {
    name: "Refrigerador Panavox Black Inverter",
    description:
      "Magnifica heladera con 2 Puertas con temperatura independiente. Capacidad 450 lts.",
    img: "https://api.carlosgutierrez.com.uy/fotos/fotos/186548/ppal-desktop-1x.jpg",
    price: 34450,
    stock: 40,
    highlight: false,
    slug: "refrigerador-panavox-black-inverter",
    category: 2,
  },
  {
    name: "Refrigerador Acero Inox Samsung Side",
    description: "Excelente heladera con 2 Puertas. Capacidad 712 lts.",
    img: "https://http2.mlstatic.com/D_NQ_NP_863932-MLU32027898359_082019-O.webp",
    price: 165550,
    stock: 20,
    highlight: false,
    slug: "refrigerador-acero-inox-samsung-side",
    category: 2,
  },
  {
    name: "Cocina Panavox SuperGas 4 hornallas.",
    description: "Cocina a supergas con horno y 4 hornallas.",
    img: "https://api.carlosgutierrez.com.uy/fotos/fotos/34946/ppal6-desktop-1x.jpg",
    price: 10850,
    stock: 60,
    highlight: false,
    slug: "cocina-panavox-supergas-4-hornallas",
    category: 2,
  },
  {
    name: "Anafe Samsung Vidrio Templado.",
    description: "Anafe 4 hornallas, excelente calidad.",
    img: "https://http2.mlstatic.com/D_NQ_NP_853903-MLU41730485006_052020-O.jpg",
    price: 21175,
    stock: 40,
    highlight: false,
    slug: "anafe-samsung-vidrio-templado",
    category: 2,
  },
  {
    name: "Microondas Panavox",
    description: "Microondas panavox con grill, con capacidad de 28lts.",
    img: "https://ventasalbion.com/wp-content/uploads/2021/01/D_947234-MLU43910176096_102020-F-2.jpg",
    price: 3650,
    stock: 120,
    highlight: true,
    slug: "microondas-panavox",
    category: 2,
  },
  {
    name: "Chimenea Panavox",
    description: "Extractor y purificador Panavox Lion con luz incorporada.",
    img: "https://api.carlosgutierrez.com.uy/fotos/fotos/164791/ppal-desktop-1x.jpg",
    price: 4580,
    stock: 45,
    highlight: false,
    slug: "chimenea-panavox",
    category: 2,
  },
  {
    name: "Aire Acondicionado James 12000 BTU",
    description: "Aire Acondicionado James Inverter de 12000 btu.",
    img: "https://www.dimm.com.uy/imgs/productos/_original_71616.jpg?r=5283",
    price: 18900,
    stock: 160,
    highlight: true,
    slug: "aire-acondicionado-james-12000-btu",
    category: 3,
  },
  {
    name: "Aire Acondicionado James 18000 BTU",
    description: "Aire Acondicionado James Inverter de 18000 btu.",
    img: "https://images-ti-vm1.tiendainglesa.com.uy/medium/P376432-1.jpg?20170830115850,Aire-Acondicionado-JAMES-Inverter-12.000-Btu-en-Tienda-Inglesa",
    price: 25600,
    stock: 60,
    highlight: false,
    slug: "aire-acondicionado-james-18000-btu",
    category: 3,
  },
  {
    name: "Calientacama Bronx 1 plaza",
    description: "Calientacama Bronx de 1 plaza con 3 niveles de calor.",
    img: "https://api.carlosgutierrez.com.uy/fotos/fotos/36054/ppal-desktop-1x.jpg",
    price: 750,
    stock: 120,
    highlight: true,
    slug: "calientacama-bronx-1-plaza",
    category: 3,
  },
  {
    name: "Calientacama Bronx 2 plazas",
    description: "Calientacama Bronx de 2 plazas con 3 niveles de calor.",
    img: "https://api.carlosgutierrez.com.uy/fotos/fotos/36055/ppal-desktop-1x.jpg",
    price: 1350,
    stock: 120,
    highlight: true,
    slug: "calientacama-bronx-2-plazas",
    category: 3,
  },
  {
    name: "Estufa SuperGas Bronx",
    description: "holis",
    img: "https://api.carlosgutierrez.com.uy/fotos/fotos/53195/ppal-desktop-1x.jpg",
    price: 3200,
    stock: 80,
    highlight: true,
    slug: "estufa-supergas-bronx",
    category: 3,
  },
  {
    name: "Aspiradora Panavox",
    description: "Aspiradora Panavox de 1600W.",
    img: "https://api.carlosgutierrez.com.uy/fotos/fotos/10729/ppal-desktop-1x.jpg",
    price: 2695,
    stock: 40,
    highlight: false,
    slug: "aspiradora-panavox",
    category: 4,
  },
  {
    name: "Aspiradora Robot Panavox",
    description: "Aspiradora Robot Panavox",
    img: "https://api.carlosgutierrez.com.uy/fotos/fotos/10735/ppal-desktop-1x.jpg",
    price: 6995,
    stock: 40,
    highlight: false,
    slug: "aspiradora-robot-panavox",
    category: 4,
  },
  {
    name: "Lavasecarropas Automatico LG",
    description:
      "Lavasecarropas automatico LG capacidad 22kg de carga frontal, secado 13kg. Control mediante smartphone.",
    img: "https://http2.mlstatic.com/D_NQ_NP_630782-MLA45638051691_042021-O.webp",
    price: 89990,
    stock: 20,
    highlight: false,
    slug: "lavasecarropas-automatico-lg",
    category: 4,
  },
  {
    name: "Lavarropas LG Inverter",
    description: "Lavarropas LG Inverter capcacidad 9kg.",
    img: "https://www.pcm.com.uy/content/images/thumbs/0011509_lavarropas-lg-16-kg-wt16-digital-inverter-turbo-drum_625.jpeg",
    price: 9900,
    stock: 35,
    highlight: true,
    slug: "lavarropas-lg-inverter",
    category: 4,
  },
  {
    name: "Secarropas LG Inverter",
    description: "Secarropas LG Inverter capacidad 9kg.",
    img: "http://http2.mlstatic.com/D_803953-MLA31579459748_072019-O.jpg",
    price: 11900,
    stock: 25,
    highlight: false,
    slug: "secarropas-lg-inverter",
    category: 4,
  },
  {
    name: "Home Theatre Sony Bdv",
    description:
      "Déjate llevar por un audio de alta resolución más natural con los altavoces Magnetic Fluid.",
    img: "https://http2.mlstatic.com/D_NQ_NP_719967-MLU32588499613_102019-O.webp",
    price: 32540,
    stock: 70,
    highlight: false,
    slug: "home-theatre-sony-bdv",
    category: 1,
  },
  {
    name: "Home Cinema Sony Soundbar 5.1 ",
    description: "Déjate llevar por un audio de alta resolución.",
    img: "https://http2.mlstatic.com/D_NQ_NP_603292-MLU41831351868_052020-O.webp",
    price: 14590,
    stock: 45,
    highlight: true,
    slug: "home-cinema-sony-soundbar-5.1",
    category: 1,
  },
  {
    name: "Sony Playstation 5 Standard Edition",
    description:
      "CPU x86-64-AMD Ryzen “Zen 2” con 8 núcelos y 16 subprocesos, y una frecuencia variable de hasta 3,5 GHz. GPU con 10,3 TFLOPS de potencia, con 36 CUs a una frecuencia variable de hasta 2,23 GHz, basada en AMD Radeon RDNA 2. 16 GB de memoria GDDR6.",
    img: "https://s.fenicio.app/f/xuruuy/productos/ps5-standard-1_1920-1200_1600460638_430.jpg",
    price: 71190,
    stock: 30,
    highlight: true,
    slug: "sony-playstation-5-standard-edition",
    category: 5,
  },
  {
    name: "Microsoft XBOX Series X",
    description:
      "CPU Procesador de 8 núcleos a 3,8 GHz personalizado con microarquitectura AMD Zen 2 y fotolitografía de 7 nm, GPU Procesador gráfico personalizado con 52 unidades de cálculo a 1,825 GHz, microarquitectura AMD RDNA 2 y 12 TFLOPS, MEMORIA 16 GB GDDR6 con bus de 320 bits",
    img: "http://www.tecnocity.com.uy/wp-content/uploads/2020/06/xbox-series-x.jpg",
    price: 73290,
    stock: 30,
    highlight: false,
    slug: "microsoft-xbox-series-x",
    category: 5,
  },
  {
    name: "Iphone 12 Pro",
    description:
      "Estos equipos no incluyen cargador ni auriculares en su caja original, únicamente cable de carga tipo usb-c.",
    img: "https://http2.mlstatic.com/D_NQ_NP_775032-MLU44535847003_012021-O.webp",
    price: 84.5,
    stock: 20,
    highlight: true,
    slug: "iphone-12-pro",
    category: 5,
  },
  {
    name: "Samsung Galaxy S21 Ultra",
    description:
      "El Samsung Galaxy S21 Ultra es el más ambicioso de los modelos 'S' de Samsung, que han repetido variantes con el modelo Galaxy S21 estándar y su variante Galaxy S21+",
    img: "https://s.fenicio.app/f/sam/productos/496-1_800_800_1611066708_be2.jpg",
    price: 84100,
    stock: 20,
    highlight: true,
    slug: "samsung-galaxy-s21-ultra",
    category: 5,
  },
  {
    name: "Notebook Gamer HP Omen",
    description: "Notebook Gamer Hp Omen 15.6 I7 256 Gb Ssd 1 Tb 8 Gb Ram Amv",
    img: "https://http2.mlstatic.com/D_NQ_NP_708235-MLU45390709193_032021-O.webp",
    price: 77850,
    stock: 15,
    highlight: false,
    slug: "notebook-gamer-hp-omen",
    category: 5,
  },
  {
    name: "Macbook Air",
    description: "Apple Macbook Air 13.3 Retina Core I5 128ssd 8gb",
    img: "https://http2.mlstatic.com/D_NQ_NP_686359-MLU45035170800_022021-O.webp",
    price: 62100,
    stock: 15,
    highlight: false,
    slug: "macbook-air",
    category: 5,
  },
  {
    name: "Afeitadora Philips",
    description:
      "Cuchillas de acero de alta precisión, uso en seco y húmedo, 3 cabezales flexible en 3 direcciónes, se adaptan a cada curva de tu cara",
    img: "https://api.carlosgutierrez.com.uy/fotos/fotos/10094/ppal-desktop-1x.jpg",
    price: 5470,
    stock: 20,
    highlight: true,
    slug: "afeitadora-philips",
    category: 5,
  },
  {
    name: "Plancha de pelo Gama",
    description:
      "Planchita Gama X-Wide Digital Keration 230º Tourmaline Micro Glitt",
    img: "https://http2.mlstatic.com/D_NQ_NP_773371-MLU45434212776_042021-O.webp",
    price: 3990,
    stock: 20,
    highlight: true,
    slug: "plancha-de-pelo-gama",
    category: 5,
  },
];

const orderSeed = [
  {
    clientId: 2,
    order: [
      {
        productId: 3,
        quantity: 2,
      },
      {
        productId: 4,
        quantity: 1,
      },
    ],
  },
];

const seeder = async () => {
  /*   for (let i = 0; i < categoriesSeed.length; i++) {
    const newCategory = {
      name: categoriesSeed[i],
    };
    await Category.create(newCategory);
    console.log("Category-" + (i + 1));
    console.log(newCategory);
  }
  for (let i = 0; i < statusesSeed.length; i++) {
    const newStatus = {
      name: statusesSeed[i],
    };
    await Status.create(newStatus);
    console.log("Status-" + (i + 1));
    console.log(newStatus);
  }
  for (let i = 0; i < clientsSeed.length; i++) {
    const newClient = {
      name: clientsSeed[i].name,
      lastName: clientsSeed[i].lastName,
      email: clientsSeed[i].email,
      password: hash(clientsSeed[i].password),
      direction: clientsSeed[i].direction,
      phone: clientsSeed[i].phone,
    };
    await Client.create(newClient);
    console.log("Client-" + (i + 1));
    console.log(newClient);
  }
  for (let i = 0; i < adminsSeed.length; i++) {
    const newAdmin = {
      name: adminsSeed[i].name,
      lastName: adminsSeed[i].lastName,
      email: adminsSeed[i].email,
      password: hash(adminsSeed[i].password),
    };
    await Admin.create(newAdmin);
    console.log("Admin-" + (i + 1));
    console.log(newAdmin);
  }
  for (let i = 0; i < productsSeed.length; i++) {
    const newProduct = {
      name: productsSeed[i].name,
      description: productsSeed[i].description,
      image: productsSeed[i].img,
      price: productsSeed[i].price,
      stock: productsSeed[i].stock,
      highlight: productsSeed[i].highlight,
      slug: productsSeed[i].slug,
      categoryId: productsSeed[i].category,
    };
    await Product.create(newProduct);
    console.log("Product-" + (i + 1));
    console.log(newProduct);
  } */

  for (let i = 0; i < orderSeed.length; i++) {
    const productsId = [];
    const productsQuantity = [];
    const newOrder = {
      clientId: orderSeed[i].clientId,
      statusId: 1,
    };
    for (let j = 0; j < orderSeed[i].order.length; j++) {
      productsId.push(orderSeed[i].order[j].productId);
      productsQuantity.push(orderSeed[i].order[j].quantity);
    }
    console.log(productsId);
    console.log(productsQuantity);
    /* await Order.create(newOrder).then((order) => {
      console.log(order.dataValues);
      Product.findAll({
        where: {id: []},
      });
    }); */
    /* for (let j = 0; j < productsId.length; j++) {
      
    } */
  }
};

module.exports = seeder;
