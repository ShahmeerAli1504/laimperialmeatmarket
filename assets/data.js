/* ==========================================================================
   La Imperial — shared business + menu data
   Prices are as listed on DoorDash (Nov 2026). In-store prices may differ.
   ========================================================================== */
window.IMPERIAL = {
  doordash: "https://www.doordash.com/store/la-imperial-meat-market-&-taqueria-winnemucca-40366115/",
  instagram: "https://www.instagram.com/laimperialmeatmarket/",
  locations: [
    {
      id: "blvd",
      name: { en: "Winnemucca Blvd", es: "Winnemucca Blvd" },
      tag: { en: "The original", es: "La original" },
      street: "5184 E Winnemucca Blvd",
      city: "Winnemucca, NV 89445",
      phone: "(775) 623-9191",
      tel: "+17756239191",
      hours: { en: "Open every day · 8:00 AM – 8:00 PM", es: "Abierto todos los días · 8:00 AM – 8:00 PM" },
      maps: "https://www.google.com/maps/search/?api=1&query=5184+E+Winnemucca+Blvd+Winnemucca+NV+89445",
      embed: "https://maps.google.com/maps?q=5184%20E%20Winnemucca%20Blvd%2C%20Winnemucca%2C%20NV%2089445&z=15&output=embed"
    },
    {
      id: "bridge",
      name: { en: "South Bridge St", es: "South Bridge St" },
      tag: { en: "Now open", es: "Recién abierta" },
      street: "1200 S Bridge St",
      city: "Winnemucca, NV 89445",
      phone: "(775) 623-2405",
      tel: "+17756232405",
      hours: { en: "Open 7 days · 6:30 AM – 8:00 PM", es: "Abierto 7 días · 6:30 AM – 8:00 PM" },
      maps: "https://www.google.com/maps/search/?api=1&query=1200+S+Bridge+St+Winnemucca+NV+89445",
      embed: "https://maps.google.com/maps?q=1200%20S%20Bridge%20St%2C%20Winnemucca%2C%20NV%2089445&z=15&output=embed"
    }
  ],
  menu: [
    {
      id: "best",
      title: { en: "Best Sellers", es: "Los Más Pedidos" },
      items: [
        { name: "(5) Street Tacos", price: 15.99, en: "Street tacos with onion, cilantro and lime.", es: "Tacos de la calle con cebolla, cilantro y limón." },
        { name: "(3) Street Tacos", price: 9.99, en: "Three corn tortilla tacos with your choice of meat, onion, cilantro and lime.", es: "Tres tacos en tortilla de maíz con la carne de tu elección, cebolla, cilantro y limón." },
        { name: "(5) Quesabirria Tacos", price: 22.99, en: "Five cheesy birria beef tacos with consommé for dipping.", es: "Cinco tacos de birria de res con queso y consomé para remojar." },
        { name: "(3) Quesabirria Tacos", price: 14.99, en: "Three cheese and birria tacos with consommé.", es: "Tres tacos de birria con queso y consomé." },
        { name: "Quesabirria Quesadilla", price: 14.99, en: "Cheese and birria beef, served with consommé.", es: "Queso y birria de res, con consomé." },
        { name: "Birria Ramen", price: 14.0, en: "Birria beef, ramen, rich broth and toppings.", es: "Birria de res, ramen, caldo y toppings." },
        { name: "Torta", price: 13.99, en: "Mexican sandwich with seasoned meat and vegetables.", es: "Torta mexicana con carne sazonada y verduras." },
        { name: "Quesadilla", price: 13.99, en: "Cheese and your choice of meat in a flour tortilla.", es: "Queso y la carne de tu elección en tortilla de harina." },
        { name: "Loaded Nachos", price: 14.99, en: "Chips with cheese, jalapeños, sour cream, guacamole and meat.", es: "Totopos con queso, jalapeños, crema, guacamole y carne." },
        { name: "Loaded Fries", price: 14.99, en: "Fries with cheese, vegetables and sour cream.", es: "Papas con queso, verduras y crema." }
      ]
    },
    {
      id: "breakfast",
      title: { en: "Breakfast", es: "Desayunos" },
      items: [
        { name: "Breakfast Burrito", price: 14.99, en: "Eggs, choice of meat, cheese, potatoes and beans.", es: "Huevo, carne a elegir, queso, papas y frijoles." },
        { name: "Chilaquiles Combo", price: 14.99, en: "Tortilla chips in salsa with crema, queso fresco, egg, rice and beans.", es: "Totopos en salsa con crema, queso fresco, huevo, arroz y frijoles." },
        { name: "Huevos Rancheros", price: 14.99, en: "Eggs in ranchera sauce with rice, beans, avocado and tostadas.", es: "Huevos en salsa ranchera con arroz, frijoles, aguacate y tostadas." },
        { name: "Huevos con Chorizo", price: 14.99, en: "Eggs scrambled with chorizo, served with rice and beans.", es: "Huevos revueltos con chorizo, arroz y frijoles." },
        { name: "Huevos con Jamón", price: 14.99, en: "Scrambled eggs with ham, rice, beans and tortillas.", es: "Huevos revueltos con jamón, arroz, frijoles y tortillas." }
      ]
    },
    {
      id: "classic",
      title: { en: "Classic Mexican", es: "Clásicos Mexicanos" },
      items: [
        { name: "Burrito", price: 13.99, en: "Meat, rice, beans, cheese and salsa in a flour tortilla.", es: "Carne, arroz, frijoles, queso y salsa en tortilla de harina." },
        { name: "Wet Burrito", price: 14.99, en: "Meat, beans and rice burrito smothered in sauce and cheese.", es: "Burrito de carne, frijoles y arroz bañado en salsa y queso." },
        { name: "Barbacoa Combo", price: 15.99, en: "Barbacoa with rice, beans and corn tortillas.", es: "Barbacoa con arroz, frijoles y tortillas de maíz." },
        { name: "Carnitas Combo", price: 14.99, en: "Shredded pork with rice, beans and fresh toppings.", es: "Carnitas con arroz, frijoles y toppings frescos." },
        { name: "Flautas Combo", price: 14.99, en: "Crispy rolled chicken tortillas with toppings, rice and beans.", es: "Flautas doradas de pollo con toppings, arroz y frijoles." },
        { name: "Meat Quesadilla", price: 13.99, en: "Grilled tortilla with meat and melted cheese.", es: "Tortilla asada con carne y queso derretido." },
        { name: "Gordita", price: 4.99, en: "Thick corn masa pocket with meat and vegetables.", es: "Gordita de maíz rellena de carne y verduras." },
        { name: "Sope", price: 4.99, en: "Thick corn base with beans, meat, vegetables and crema.", es: "Sope con frijoles, carne, verduras y crema." },
        { name: "Loaded Nachos", price: 13.99, en: "Tortilla chips with cheese, jalapeños, sour cream and salsa.", es: "Totopos con queso, jalapeños, crema y salsa." },
        { name: "Loaded Fries", price: 13.99, en: "Fries, meat, cheese, guacamole and toppings.", es: "Papas con carne, queso, guacamole y toppings." },
        { name: "Birria Ramen", price: 14.0, en: "Birria beef ramen with onion, cilantro and lime.", es: "Ramen de birria con cebolla, cilantro y limón." }
      ]
    },
    {
      id: "packs",
      title: { en: "Party Packs", es: "Paquetes para Fiesta" },
      items: [
        { name: "20 Birria Tacos + Consommé", price: 99.99, en: "20 birria tacos with consommé, rice and beans.", es: "20 tacos de birria con consomé, arroz y frijoles." },
        { name: "20 Street Tacos Pack", price: 74.99, en: "20 street tacos with rice and beans.", es: "20 tacos de la calle con arroz y frijoles." },
        { name: "Barbacoa Big Platter", price: 75.99, en: "Barbacoa with sides — feeds about four.", es: "Barbacoa con guarniciones — para unas cuatro personas." },
        { name: "Carne Asada Big Platter", price: 74.99, en: "Carne asada with sides — feeds about four.", es: "Carne asada con guarniciones — para unas cuatro personas." },
        { name: "Grilled Chicken Big Platter", price: 69.99, en: "Grilled chicken with sides — feeds about four.", es: "Pollo asado con guarniciones — para unas cuatro personas." },
        { name: "Carnitas Big Platter", price: 65.99, en: "Carnitas with sides — feeds about four.", es: "Carnitas con guarniciones — para unas cuatro personas." },
        { name: "Nachos Pack", price: 39.99, en: "Shareable nachos for about four.", es: "Nachos para compartir, para unas cuatro personas." },
        { name: "Loaded Fries Pack", price: 39.99, en: "Shareable loaded fries for about four.", es: "Papas cargadas para compartir, para unas cuatro personas." }
      ]
    },
    {
      id: "raw",
      title: { en: "Raw Meat for Carne Asada", es: "Carne Cruda para Carne Asada" },
      items: [
        { name: "Arrachera / Skirt Steak", price: 17.99, en: "Skirt steak, marinated or plain.", es: "Arrachera, marinada o natural." },
        { name: "Diezmillo / Chuck Roll Steak", price: 12.99, en: "Chuck roll steak, marinated or plain.", es: "Diezmillo, marinado o natural." },
        { name: "Steak for Tacos", price: 11.99, en: "Raw steak strips, marinated or unseasoned.", es: "Bistec para tacos, marinado o natural." },
        { name: "Beef Short Ribs", price: 9.99, en: "Raw short ribs, marinated or unseasoned.", es: "Costilla de res, marinada o natural." },
        { name: "Pastor for Tacos", price: 5.99, en: "Marinated pork al pastor.", es: "Carne al pastor marinada." },
        { name: "Chicken for Tacos", price: 5.99, en: "Raw chicken, marinated or plain.", es: "Pollo para tacos, marinado o natural." },
        { name: "Chorizo", price: 5.99, en: "Seasoned ground pork sausage.", es: "Chorizo de puerco sazonado." },
        { name: "Chicken for the Grill", price: 3.99, en: "Raw chicken for the grill, marinated or plain.", es: "Pollo para asar, marinado o natural." }
      ]
    },
    {
      id: "sides",
      title: { en: "Sides", es: "Acompañantes" },
      items: [
        { name: "Side Arroz", price: 4.99, en: "Seasoned Mexican rice.", es: "Arroz mexicano." },
        { name: "Side Frijol", price: 4.99, en: "Refried beans.", es: "Frijoles refritos." },
        { name: "Grilled Onions or Jalapeños", price: 2.49, en: "Extra grilled onions and jalapeños.", es: "Cebollitas y jalapeños asados." },
        { name: "Salsa 16 oz Big Cup", price: 5.99, en: "Large cup of red or green salsa.", es: "Vaso grande de salsa roja o verde." },
        { name: "Sour Cream", price: 1.0, en: "2 oz cup.", es: "Vasito de 2 oz." },
        { name: "Extra Salsa Small Cup", price: 0.75, en: "2 oz salsa cup.", es: "Vasito de salsa de 2 oz." }
      ]
    },
    {
      id: "drinks",
      title: { en: "Drinks", es: "Bebidas" },
      items: [
        { name: "Horchata", price: 4.99, en: "Creamy rice-and-cinnamon agua fresca.", es: "Agua fresca de arroz con canela." },
        { name: "Jamaica", price: 4.99, en: "Chilled hibiscus agua fresca.", es: "Agua fresca de flor de jamaica." },
        { name: "Mexican Coca-Cola", price: 3.99, en: "Half-liter glass bottle.", es: "Botella de vidrio de medio litro." },
        { name: "Jarritos", price: 3.5, en: "Fruit-flavored Mexican soda.", es: "Refresco mexicano de sabores." }
      ]
    }
  ]
};
