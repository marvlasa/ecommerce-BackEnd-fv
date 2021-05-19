const {
  Category,
  Status,
  Client,
  Admin,
  Product,
} = require("../database/index");
const hash = require("../database/bcrypt");

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
    outstanding: false,
    slug: "smart-tv-samsung-75-2020-qled-4k-hdr",
    category: "Imagen y Sonido",
  },
];

const seeder = async () => {
  for (let i = 0; i < categoriesSeed.length; i++) {
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
  /*   for (let i = 0; i < productsSeed.length; i++) {
    const newProduct = {
      name: productsSeed[i].name,
      description: productsSeed[i].description,
      image: productsSeed[i].img,
      price: productsSeed[i].price,
      stock: productsSeed[i].stock,
      highlight: productsSeed[i].outstanding,
      slug: productsSeed[i].slug,
      category: productsSeed[i].category,
    };
    await Product.create(newProduct);
    console.log("Product-" + (i + 1));
    console.log(newProduct);
  } */
};

module.exports = seeder;
