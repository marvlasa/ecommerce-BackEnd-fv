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

const categoriesSeed = ["Sofa", "Table", "Chair", "Bed", "Others"];

const statusesSeed = ["without paying", "paid out", "sent", "delivered"];

const clientsSeed = [
  {
    name: "Kevin",
    lastName: "Mullin",
    email: "kevinmullinf@gmail.com",
    password: "kevin",
    address: "Mi casa",
    phone: "094210283",
  },
  {
    name: "Marta",
    lastName: "Perez",
    email: "marta@hotmail.com",
    password: "marta",
    address: "mi casa 404",
    phone: "097120300",
  },
  {
    name: "George",
    lastName: "Bluth",
    email: "george.bluth@reqres.in",
    password: "george",
    address: "george 404",
    phone: "097056587",
  },
  {
    name: "Janet",
    lastName: "Weaver",
    email: "janet.weaver@reqres.in",
    password: "janet",
    address: "janet 404",
    phone: "097456965",
  },
  {
    name: "Emma",
    lastName: "Wong",
    email: "emma.wong@reqres.in",
    password: "Test",
    address: "wong 404",
    phone: "097896654",
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
    name: "ANDERS SOFA",
    description:
      "With its stylish tailoring, mixed materials, and muted colors, the Anders Sofa offers a tonal, minimal look. Wrapped in a streamlined, shelter-style frame, its ash veneer finish chicly dovetails with a basketweave performance fabric in ivory. Plus, plush cushions and bolsters make this living room sofa a cozy lounging space.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/a/n/anders_sofa_2643.jpg",
    price: 2898,
    stock: 20,
    highlight: true,
    slug: "anders-sofa",
    category: 1,
  },
  {
    name: "ADA OVAL COFFEE TABLE",
    description:
      "Sculptural and dynamic, the design of the Ada Oval Coffee Table makes it feel as though its oval tabletop sits delicately balanced atop its curved legs. Constructed from solid oak wood, organic variations in the grain shine through its natural finish. Sit this wood coffee table with a clean-lined sofa or sectional and richly-colored accent furniture.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/a/d/ada_coffee_table_natural_0359.jpg",
    price: 998,
    stock: 40,
    highlight: true,
    slug: "ada-oval-coffee-table",
    category: 2,
  },
  {
    name: "HARLOWE SWIVEL CHAIR",
    description:
      "With its curved silhouette, minimalist design, and inviting ivory upholstery, the Harlowe Swivel Chair softens and reinvents your idea of statement-making design. A blonde-finished acacia swivel base sits below a rounded frame wrapped in a textured weave fabric. Curate this occasional chair with lighter wood finishes, warm neutrals, and richly-textured accents.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/h/a/hawlowe_swivel_chair_2549.jpg",
    price: 1498,
    stock: 60,
    highlight: true,
    slug: "harlowe-swivel-chair",
    category: 3,
  },
  {
    name: "SHAKA ACCENT CHAIR",
    description:
      "Modern design meets bohemian materials on this accent chair with arms. The curved wooden frame holds a cantilevered seat, woven with natural banana fibers for a high-textured look. We love this accent chair styled in living rooms or bedrooms for added seating.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/s/h/shaka_accent_chair-1.jpg",
    price: 648,
    stock: 10,
    highlight: true,
    slug: "shaka-accent-chair",
    category: 3,
  },
  {
    name: "BECCA COFFEE TABLE",
    description:
      "Industrial-chic style is yours with the Becca coffee table, complete with a distressed black iron tripod-style base and round, rimmed oak top.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/b/e/becca-coffee-table-oak_1564991625_1_2.jpg",
    price: 1099,
    stock: 40,
    highlight: false,
    slug: "becca-coffe-table",
    category: 2,
  },
  {
    name: "KRISTA ACCENT CHAIR, OLIVE GREEN",
    description:
      "Rustic meets mid-century chic for this accent armchair, with its minimal, clean-lined oak wooden frame and olive green fabric. The decorative chair's plush, loose seat and back cushions are upholstered in a lustrous velvet, textural fabric and feature flanged seams for a casual, laid-back look.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/k/i/kinney-chair-olive-green_1564991625-1_1.jpg",
    price: 999,
    stock: 20,
    highlight: false,
    slug: "krista-accent-charir-olive-green",
    category: 3,
  },
  {
    name: "BELMONT SOFA, COGNAC BY GINNY MACDONALD",
    description:
      "From the exclusive Ginny Macdonald collection for Lulu and Georgia, this classic sofa features a curved back and plush, oversized cushions to bring a polished, yet accessible look to your living room seating. Inspired by Ginny’s English heritage and handmade in Los Angeles, the collection fuses her British roots with her California lifestyle. This comfortable sofa is available in a variety of fabrics and colors making it the perfect mix-and-match piece.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/b/e/belmont-sofa-velvet-cognac-6.jpg",
    price: 2798,
    stock: 60,
    highlight: true,
    slug: "belmont-sofa-cognac-by-ginny-macdonald",
    category: 1,
  },
  {
    name: "MAXWELL SOFA, MOSS",
    description:
      "A rich honey-finished wood base gives way to plush cushions and incredibly comfortable seating for this Maxwell sofa. In an earthy olive fabric, this couch is roomy enough to lounge on for hours and four complementing throw pillows complete the casual, laid-back look.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/m/a/maxwell-velvet-sofa-moss_3_1564991625_1.jpg",
    price: 3298,
    stock: 40,
    highlight: true,
    slug: "maxwell-sofa-moss",
    category: 1,
  },
  {
    name: "DEVON SOFA, BLUE",
    description:
      "Lounge in luxury with this plush velvet sofa. Oversized cushions and three complementing throw pillows create an inviting place to lounge while angular wooden legs add a level of overall sturdiness to this piece.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/d/e/devon-velvet-sofa-blue_1_new_1.jpg",
    price: 2998,
    stock: 120,
    highlight: true,
    slug: "devon-sofa-blue",
    category: 1,
  },
  {
    name: "DEVA PLATFORM BED, NAVY VELVET",
    description:
      "Clean lines and minimal design give this platform bed a modern vibe. We love the plush navy finish - it's the ultimate luxe update for your contemporary bedroom.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/d/e/deva-platform-bed-navy_1_1564991625_1.jpg",
    price: 1398,
    stock: 45,
    highlight: false,
    slug: "deva-platform-bed-navy-velvet",
    category: 4,
  },
  {
    name: "BAILEE PLATFORM BED, REGAL MOSS",
    description:
      "Create a magazine-worthy bedroom oasis with a bed frame that's anything but boring. This statement-making bed features a plush channeled headboard and a rich velvet upholstery, bringing a dreamy Art Deco luxury to your bedroom look",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/b/a/bailee-channel-platform-bed-regal-moss_5.jpg",
    price: 1298,
    stock: 160,
    highlight: true,
    slug: "bailee-platform-bed-regal-moss",
    category: 4,
  },
  {
    name: "KENNSIE OFFICE CHAIR, BROWN",
    description:
      "The soft leatherette seat on the Kennsie chair is comfortable yet chic and the sleek nickel armrests give it a modern touch. Rolling casters and a tilt mechanism make this chair is as functional as it is stylish.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/0/1/01283brn_01.jpg",
    price: 457,
    stock: 60,
    highlight: true,
    slug: "kennsie-office-chair-brown",
    category: 3,
  },
  {
    name: "SUN AT SIX ARC DINING TABLE, NUDE",
    description:
      "Furniture design studio Sun at Six seeks to help create open, natural spaces with their line of minimal furniture. The Arc Dining Table seamlessly blends clean, architectural lines with exposed, interwoven joinery, and its rounded corner detailing and wide cylindrical legs soften its look. Hand-built from solid white oak and featuring a hand-rubbed tenna oil finish, this dining room table's spacious tabletop makes it an ideal centerpiece to gather around.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/a/r/arc-dining-table-nude-1_1.jpg",
    price: 750,
    stock: 120,
    highlight: true,
    slug: "sun-at-six-arc-dining-table-nude",
    category: 5,
  },
  {
    name: "SOLENE PLATFORM BED, WHEAT",
    description:
      "Our Solene Bed generates a lot of visual impact with its softly curved silhouette and textural, golden-wheat upholstery. Wrapped in a luxe Belgian linen fabric and finished with oak wood legs, this bed frame's modest headboard height makes your room appear more spacious. Round off its look with crisp white bedding and muted, tonal accents.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/s/o/solene_bed_wheat_lebico_1.jpg",
    price: 2598,
    stock: 120,
    highlight: true,
    slug: "solene-platform-bed-wheat",
    category: 4,
  },
  {
    name: "ADARA BED, NAVY",
    description:
      "With its lofty headboard and subtle winged design, this upholstered bed adds a bit of drama and refined style to your bedroom. In a cool blue color, its textural fabric makes this bedframe and headboard very versatile. Add a graphic touch with patterned bedding, or keep the look soft and neutral with tonal bed linens.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/4/3/432bedlnnnv_1.jpg",
    price: 1198,
    stock: 80,
    highlight: true,
    slug: "adara-bed-navy",
    category: 4,
  },
  {
    name: "ADELAI OFFICE CHAIR",
    description:
      "Great for transitional offices, this impressive desk chair contrasts a light neutral upholstery with wooden arms, wrapped in a light-brown leather for a timeless touch.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/a/d/adelai-desk-chair-harbor-natural_4.jpg",
    price: 699,
    stock: 40,
    highlight: true,
    slug: "adelai-office-chair",
    category: 3,
  },
  {
    name: "ROSAMONDE 7-DRAWER DRESSER",
    description:
      "Keep your bedroom style grounded (and clutter-free) with this wooden dresser. Featuring a black wash, slim iron base, and top-grain leather drawer pulls, this bedroom side table mixes materials for an impressive finish.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/1/0/108603-002_frt_1.jpg",
    price: 1799,
    stock: 40,
    highlight: false,
    slug: "rosamonde-7-drawer-dresser",
    category: 5,
  },
  {
    name: "LUNA 2-DRAWER NIGHTSTAND, WEATHERED",
    description:
      "The perfect accent for the traditional bedroom, this nightstand features ample storage to hide your end-of-the-day clutter. Carved legs, a beveled top and a weathered finish add the the colonial-inspired design.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/j/o/josette-2-drawer-side-table-weathered_1_1.jpg",
    price: 964,
    stock: 20,
    highlight: false,
    slug: "luna-2-drawer-nightstand-weathered",
    category: 5,
  },
  {
    name: "CALLAHAN SOFA, CHARCOAL",
    description:
      "There's nothing more welcoming than a big, comfy sofa. The Callahan Sofa achieves just that with an effortlessly contemporary look, complete with short wooden legs and down-filled cushions.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/c/a/callahan_sofa_charcoal_7_2_-218_1.jpg",
    price: 1798,
    stock: 35,
    highlight: true,
    slug: "callahan-sofa-charcoal",
    category: 1,
  },
  {
    name: "ZENNIE SIDEBOARD, BROWN",
    description:
      "Convenient. Sophisticated. So, so stylish. This functional sideboard is the perfect storage piece for transitional spaces with mid-century leanings, featuring wicker sliding doors, brass accents and two pull-out drawers in a timeless wooden frame.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/9/4/94216brn_01.jpg",
    price: 1516,
    stock: 25,
    highlight: false,
    slug: "zennie-sideboard-brown",
    category: 5,
  },
  {
    name: "NIA BED, MUSHROOM",
    description:
      "Organic meets modern in this tailored bed. The Nia Bed features a simple platform design wrapped in oak wood that instantly warms up your space. We love how the rounded corners and linen upholstered headboard soften the look for a polished finish.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/n/i/nia_bed_mushroom-195-321q-1_queen_size-final.jpg",
    price: 2998,
    stock: 70,
    highlight: false,
    slug: "nia-bed-mushroom",
    category: 4,
  },
  {
    name: "PHILENE BOOKCASE, NATURAL",
    description:
      "Spacious, open shelving is essential for transitional spaces. This tall wooden bookshelf has an airy, natural feel with a light mango wood frame and a woven cane backing for added texture. The open bottom is perfect for adding storage bins or baskets to complete the look.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/1/0/108757-001_frt_1.jpg",
    price: 2099,
    stock: 45,
    highlight: true,
    slug: "philene-bookcase-natural",
    category: 5,
  },
  {
    name: "AVRILE DESK",
    description:
      "A white lacquer casing creates a sleek frame for beautifully-grained walnut drawers in this modern desk. Angular black iron legs and drawer pulls add an industrial feel and provide contrast to the white frame. Style in your home office with a leather desk chair and metal table lamp for a contemporary work space.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/a/v/avrile-desk_8_1.jpg",
    price: 1699,
    stock: 30,
    highlight: true,
    slug: "avrile-desk",
    category: 5,
  },
  {
    name: "SHARNEE ACCENT CHAIR, RUST",
    description:
      "This charming mid-century occasional chair provides comfort and style. A simple black matte frame slants up to meet an upholstered velveteen seat cushion and matching, unique cylinder shaped backrest.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/h/g/hgda701_1_1.jpg",
    price: 987,
    stock: 30,
    highlight: false,
    slug: "sharnee-accent-chair-rust",
    category: 3,
  },
  {
    name: "ADMINA BED, NAVY",
    description:
      "Traditional with a glamorous spin, our Admina tufted platform bed brings elegance and sophisticated to your bedroom. This feminine headboard can be dressed up with patterned pillows.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/1/2/122nbbed-brrglnv_1.jpg",
    price: 1598,
    stock: 20,
    highlight: true,
    slug: "admina-bed-navy",
    category: 4,
  },
  {
    name: "ELLIA GLIDER CHAIR, PINK",

    description:
      "With its deep seat and plush cushion, the Ellia Velvet Swivel Glider is essential for your nursery. Add a pillow for a pop of color and added comfort.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/e/l/ellia-velvet-glider-pink_1564991625_2.jpg",
    price: 84100,
    stock: 20,
    highlight: true,
    slug: "ellia-glider-chair-pink",
    category: 3,
  },
  {
    name: "JARELLA SWIVEL BAR STOOL",

    description:
      "The Jarella Stool is the perfect seating option for spaces with western style influence: tapered legs, a molded swivel seat and a distressed wood finish.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/j/a/jarella-swivel-bar-stool_1.jpg",
    price: 249,
    stock: 15,
    highlight: false,
    slug: "jarella-swivel-bar-stool",
    category: 5,
  },
  {
    name: "ANITA ROUND COFFEE TABLE",

    description:
      "A round, subtly matte marble tabletop seems to float above the natural reclaimed teak base of this coffee table to form a bold centerpiece for your living space. Slim raw brass hardware connects top from base, adding a mid-century touch to this modern piece. Style it with oversized, rounded furniture and tonal, textural rugs.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/2/2/224269-004_prm_1.jpg",
    price: 1899,
    stock: 15,
    highlight: false,
    slug: "anita-round-coffee-table",
    category: 2,
  },
  {
    name: "ROSEN INDOOR / OUTDOOR SOFA",

    description:
      "Constructed from reclaimed teak wood, and featuring durable, easy-to-clean upholstery, this sofa layers in a polished and practical touch. A warm wood finish and natural-colored fabric provide a timeless constrast. We love the idea of turning your patio or sunroom into an all-year-round gathering space with this statement-making new couch.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/r/o/rosen-sofa_0442.jpg",
    price: 2698,
    stock: 20,
    highlight: true,
    slug: "rosen-indoor-outdoor-sofa",
    category: 1,
  },
  {
    name: "PHILENE BOOKCASE, BLACK",
    description:
      "The lofty, oversized frame of this bookcase makes a statement in your space. Crafted from solid mango wood in a sleek black finish, it's the woven cane detailing that really defines this piece. With five roomy shelves, you have plenty of room to display your favorite books, vinyl collection, and greenery.",
    img:
      "https://d3tt7xf0u0byqe.cloudfront.net/media/catalog/product/cache/1/image/510x662/040ec09b1e35df139433887a97daa66f/1/0/108757-002_frt_1.jpg",
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
      address: clientsSeed[i].address,
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
  }

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
    console.log("Order-" + (i + 1));
    await Order.create(newOrder).then(async (order) => {
      await Product.findAll({
        where: { id: productsId },
      }).then(async (products) => {
        for (let j = 0; j < productsId.length; j++) {
          const orderRow = {
            orderId: order.dataValues.id,
            productId: productsId[j],
            quantity: productsQuantity[j],
            price: products[j].dataValues.price,
          };
          OrdersProduct.create(orderRow);
          console.log(orderRow);
        }
      });
    });
  }
};

module.exports = seeder;
