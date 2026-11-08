/* Butcher's Guide data — edit cut names, descriptions or options here. */
import type { ReactNode } from "react";

export type AnimalId = "beef" | "pork";
export type OptKind = "thick" | "prep";
type Pair = [string, string];

export type Region = {
  id: string;
  d: string;
  lx: number;
  ly: number;
  lab?: string[];
  labEs?: string[];
  lp?: [number, number][];
  out?: 1;
  v: [number, number];
  t: number;
  en: string;
  es: string;
  den: string;
  des: string;
  best: Pair[];
  cuts: Pair[];
};

export type Animal = { body: string; extras: ReactNode; start: string; regions: Region[] };

export type CutItem = { a: AnimalId; r: string; c: number; lbs: number; th: string; pr: string };

export const S = {
  en: {
    beef: "Beef", pork: "Pork", tap: "Tap a section to cut",
    tender: "Tenderness", best: "Best for", cuts: "Cuts from this section", add: "Add", added: "Added",
    list: "Your Cut List", empty: "Your list is empty — tap the diagram and add a few cuts.",
    lbs: "lb", thick: "Cut", prep: "Prep", remove: "Remove",
    form: "Send your request", name: "Your name", phone: "Phone", store: "Store", date: "Pickup day", notes: "Notes (optional)",
    notesPh: "Anything else? e.g. for Saturday's carne asada, 20 people",
    text: "Text Request", call: "Call Store", copy: "Copy List", copied: "Copied!",
    tip: "Tip: paste your list into the notes of your DoorDash order, or show it at the counter. Prices by the pound in store.",
    need: "Add at least one cut first.", needInfo: "Please add your name and phone so we can reach you.",
    clear: "Clear list", item: "item", items: "items", req: "Cut request", pickup: "Pickup", any: "Either store",
  },
  es: {
    beef: "Res", pork: "Cerdo", tap: "Toca una sección para cortar",
    tender: "Suavidad", best: "Ideal para", cuts: "Cortes de esta sección", add: "Agregar", added: "Agregado",
    list: "Tu Lista de Cortes", empty: "Tu lista está vacía — toca el diagrama y agrega algunos cortes.",
    lbs: "lb", thick: "Corte", prep: "Preparación", remove: "Quitar",
    form: "Manda tu pedido", name: "Tu nombre", phone: "Teléfono", store: "Tienda", date: "Día para recoger", notes: "Notas (opcional)",
    notesPh: "¿Algo más? ej. para la carne asada del sábado, 20 personas",
    text: "Mandar por Texto", call: "Llamar a la Tienda", copy: "Copiar Lista", copied: "¡Copiado!",
    tip: "Consejo: pega tu lista en las notas de tu pedido de DoorDash o enséñala en el mostrador. Precios por libra en tienda.",
    need: "Primero agrega al menos un corte.", needInfo: "Agrega tu nombre y teléfono para poder contactarte.",
    clear: "Borrar lista", item: "corte", items: "cortes", req: "Pedido de cortes", pickup: "Recoger", any: "Cualquier tienda",
  },
};

export const OPTS: Record<OptKind, { id: string; en: string; es: string }[]> = {
  thick: [
    { id: "std", en: "Standard", es: "Normal" },
    { id: "thin", en: "Thin (carne asada)", es: "Delgado (carne asada)" },
    { id: "in1", en: "1 inch thick", es: "1 pulgada" },
    { id: "in15", en: "1½ inch thick", es: "1½ pulgadas" },
    { id: "cubed", en: "Cubed / stew", es: "En cubos / guisado" },
    { id: "ground", en: "Ground", es: "Molido" },
    { id: "whole", en: "Whole piece", es: "Pieza entera" },
  ],
  prep: [
    { id: "plain", en: "Plain", es: "Natural" },
    { id: "marinated", en: "House marinade", es: "Marinado de la casa" },
    { id: "seasoned", en: "Seasoned", es: "Sazonado" },
  ],
};

const COW_BODY = "M112 168C120 150 150 140 175 148L186 126L204 148C240 148 270 132 320 128L640 122C690 120 715 128 722 150C730 175 735 220 732 270L726 300C722 320 712 330 708 345L712 420L690 422L688 360C682 345 672 335 660 330L650 420L628 422L626 340C590 340 540 345 500 345C440 348 380 345 330 340L320 420L298 422L294 345L270 345L262 420L240 422L236 330C220 320 205 305 200 290C185 270 170 260 150 262C120 268 95 268 78 255C65 245 62 225 72 210C82 195 95 185 112 168Z";
const PIG_BODY = "M100 228C120 205 145 190 170 182L176 146L210 176C262 158 330 150 420 150C520 148 610 150 670 165C715 178 740 215 742 260C744 300 730 330 712 345L716 420L692 422L680 360C670 365 660 365 650 362L646 420L624 422L620 360C560 372 470 375 400 370C350 368 320 365 300 360L296 420L274 422L268 360L250 358L246 420L224 422L222 340C200 330 180 318 160 310C135 300 110 290 92 280L66 276C58 262 58 240 66 228Z";

export const ANIMALS: Record<AnimalId, Animal> = {
  beef: {
    body: COW_BODY,
    extras: (
      <>
        <path className="tail" d="M724 150C748 175 750 240 744 300" fill="none" />
        <path className="tuft" d="M744 296c-8 10-6 24 2 30 6-8 8-20-2-30Z" />
        <circle className="eye" cx="118" cy="196" r="5" />
        <path className="horn" d="M168 146c4-14 14-22 26-24-8 6-12 14-14 24Z" />
      </>
    ),
    start: "rib",
    regions: [
      { id: "chuck", d: "M180 90L340 90L345 258L222 262Z", lx: 272, ly: 190, v: [-8, -8], t: 2,
        en: "Chuck", es: "Diezmillo / Espaldilla",
        den: "The shoulder — rich, beefy and well-marbled. Great slow-cooked, ground, or sliced thin for the grill.",
        des: "La espaldilla — sabrosa y con buen marmoleo. Ideal en cocción lenta, molida o en rebanada delgada para asar.",
        best: [["Barbacoa", "Barbacoa"], ["Stews", "Guisos"], ["Carne asada", "Carne asada"]],
        cuts: [["Chuck roll steak", "Diezmillo"], ["Chuck roast", "Asado de espaldilla"], ["Flat iron steak", "Flat iron (paleta)"], ["Ground beef", "Carne molida"]] },
      { id: "rib", d: "M340 90L450 90L455 255L345 258Z", lx: 397, ly: 180, v: [0, -11], t: 5,
        en: "Rib", es: "Costillar",
        den: "The most marbled section — juicy, tender and full of flavor. Home of the ribeye.",
        des: "La sección con más marmoleo — jugosa, suave y llena de sabor. De aquí sale el ribeye.",
        best: [["Grilling", "Asador"], ["Roasting", "Al horno"], ["Special dinners", "Cenas especiales"]],
        cuts: [["Ribeye steak", "Ribeye (ojo de costilla)"], ["Bone-in cowboy ribeye", "Ribeye con hueso (cowboy)"], ["Prime rib roast", "Asado de costilla (prime rib)"], ["Beef back ribs", "Costillas de lomo de res"]] },
      { id: "shortloin", d: "M450 90L550 90L548 252L455 255Z", lx: 500, ly: 172, lab: ["Short", "Loin"], v: [0, -11], t: 5,
        en: "Short Loin", es: "Lomo Corto",
        den: "The most tender steaks on the animal — quick-cooking cuts for a hot grill or pan.",
        des: "Los bisteces más suaves de la res — cortes de cocción rápida para asador o sartén bien caliente.",
        best: [["Grilling", "Asador"], ["Pan-searing", "A la plancha"]],
        cuts: [["T-Bone", "T-Bone"], ["Porterhouse", "Porterhouse"], ["New York strip", "New York (bistec de lomo)"], ["Tenderloin / filet mignon", "Filete (filet mignon)"]] },
      { id: "sirloin", d: "M550 90L635 90L625 252L548 252Z", lx: 590, ly: 180, v: [5, -11], t: 4,
        en: "Sirloin", es: "Sirloin / Aguayón",
        den: "Lean, flavorful and affordable — a crowd favorite for carne asada and kabobs.",
        des: "Magro, sabroso y económico — favorito para carne asada y alambres.",
        best: [["Carne asada", "Carne asada"], ["Kabobs", "Alambres"], ["Grilling", "Asador"]],
        cuts: [["Top sirloin steak", "Aguayón"], ["Tri-tip", "Colita de cuadril (tri-tip)"], ["Picanha", "Picaña"], ["Sirloin for fajitas", "Sirloin para fajitas"]] },
      { id: "round", d: "M635 90L790 90L790 450L600 450L620 350L640 330L625 252Z", lx: 690, ly: 230, v: [11, -3], t: 2,
        en: "Round", es: "Pulpa / Bola",
        den: "The back leg — very lean. Perfect pounded thin for milanesa or dried for cecina.",
        des: "La pierna trasera — muy magra. Perfecta aplanada para milanesa o seca para cecina.",
        best: [["Milanesa", "Milanesa"], ["Cecina", "Cecina"], ["Roast beef", "Rosbif"]],
        cuts: [["Top round", "Pulpa"], ["Bottom round", "Pulpa bola"], ["Eye of round", "Cuete"], ["Milanesa (pounded thin)", "Milanesa"], ["Cecina", "Cecina"]] },
      { id: "brisket", d: "M196 258L300 260L295 338L188 332Z", lx: 247, ly: 298, v: [-11, 6], t: 2,
        en: "Brisket", es: "Pecho",
        den: "The chest — tough but full of flavor. Low and slow turns it melt-in-your-mouth tender.",
        des: "El pecho — firme pero con mucho sabor. Cocinado lento y despacio queda suavecito.",
        best: [["Smoking", "Ahumado"], ["Barbacoa", "Barbacoa"], ["Braising", "Estofado"]],
        cuts: [["Whole brisket", "Pecho entero"], ["Brisket flat", "Pecho (flat)"], ["Brisket point", "Punta de pecho"]] },
      { id: "foreshank", d: "M225 335L345 335L345 450L225 450Z", lx: 280, ly: 400, lab: ["Fore Shank"], lp: [[280, 448]], out: 1, v: [-4, 11], t: 1,
        en: "Fore Shank", es: "Chambarete",
        den: "The front leg — full of collagen. The secret to a rich caldo de res.",
        des: "La pierna delantera — llena de colágeno. El secreto de un buen caldo de res.",
        best: [["Caldo de res", "Caldo de res"], ["Braising", "Estofado"]],
        cuts: [["Cross-cut shank", "Chambarete con hueso"], ["Soup bones", "Hueso para caldo"], ["Marrow bones", "Tuétano"]] },
      { id: "plate", d: "M300 260L470 252L475 360L345 360L345 335L295 338Z", lx: 400, ly: 296, lab: ["Short", "Plate"], v: [0, 11], t: 3,
        en: "Short Plate", es: "Falda / Arrachera",
        den: "Home of arrachera — beefy, loose-grained cuts made for marinade and a hot grill.",
        des: "De aquí sale la arrachera — cortes con mucho sabor, perfectos para marinar y asar.",
        best: [["Carne asada", "Carne asada"], ["Tacos", "Tacos"], ["Fajitas", "Fajitas"]],
        cuts: [["Skirt steak", "Arrachera"], ["Short ribs", "Costilla de res"], ["Suadero", "Suadero"]] },
      { id: "flank", d: "M470 252L625 252L640 330L620 352L475 360Z", lx: 552, ly: 304, v: [6, 11], t: 3,
        en: "Flank", es: "Falda",
        den: "A lean, flat cut with bold flavor — slice it thin across the grain.",
        des: "Un corte plano y magro con mucho sabor — rebánalo delgado contra la fibra.",
        best: [["Fajitas", "Fajitas"], ["Carne asada", "Carne asada"], ["Stir-fry", "Salteado"]],
        cuts: [["Flank steak", "Falda de res"], ["Fajita meat", "Carne para fajitas"], ["Ground beef", "Carne molida"]] },
    ],
  },
  pork: {
    body: PIG_BODY,
    extras: (
      <>
        <path className="tail" d="M740 236c18-6 26 6 18 14-8 8-18-2-8-10 8-6 16-2 18 4" fill="none" />
        <circle className="eye" cx="150" cy="214" r="5" />
        <ellipse className="snout" cx="68" cy="252" rx="6" ry="20" />
      </>
    ),
    start: "loin",
    regions: [
      { id: "head", d: "M40 120L232 120L222 250L215 345L40 345Z", lx: 138, ly: 248, v: [-11, 0], t: 3,
        en: "Head", es: "Cabeza",
        den: "Jowl, ears and the whole head — the base of real pozole, tamales and barbacoa de cabeza.",
        des: "Cachete, orejas y cabeza entera — la base del pozole, los tamales y la barbacoa de cabeza.",
        best: [["Pozole", "Pozole"], ["Tamales", "Tamales"], ["Barbacoa", "Barbacoa"]],
        cuts: [["Pork jowl", "Cachete"], ["Ears", "Orejas"], ["Whole head", "Cabeza entera"]] },
      { id: "butt", d: "M232 120L355 120L355 255L222 255Z", lx: 292, ly: 196, lab: ["Boston", "Butt"], labEs: ["Pulpa"], v: [-5, -9], t: 3,
        en: "Boston Butt", es: "Pulpa de Espaldilla",
        den: "Upper shoulder with great marbling — our go-to for carnitas and al pastor.",
        des: "Parte alta de la espaldilla con buen marmoleo — la que usamos para carnitas y al pastor.",
        best: [["Carnitas", "Carnitas"], ["Al pastor", "Al pastor"], ["Pulled pork", "Cerdo deshebrado"]],
        cuts: [["Pork butt roast", "Pulpa de espaldilla"], ["Country-style ribs", "Costillas estilo country"], ["Al pastor (thin-sliced)", "Al pastor (rebanado)"], ["Ground pork", "Carne molida de cerdo"]] },
      { id: "picnic", d: "M222 255L355 255L355 350L215 345Z", lx: 290, ly: 292, lab: ["Picnic", "Shoulder"], v: [-7, 7], t: 2,
        en: "Picnic Shoulder", es: "Paleta",
        den: "Lower shoulder — rich and economical. Braise it, stew it or grind it.",
        des: "Parte baja de la espaldilla — sabrosa y económica. Para guisar, estofar o moler.",
        best: [["Chile verde", "Chile verde"], ["Tamales", "Tamales"], ["Carnitas", "Carnitas"]],
        cuts: [["Picnic roast", "Paleta para asar"], ["Ground pork", "Carne molida de cerdo"], ["For chorizo", "Para chorizo"]] },
      { id: "backfat", d: "M355 120L620 120L620 180L355 182Z", lx: 488, ly: 174, v: [0, -12], t: 0,
        en: "Back Fat", es: "Lardo",
        den: "Pure fat from along the back — for rendering lard, chicharrones and sausage.",
        des: "Grasa pura del lomo — para hacer manteca, chicharrones y embutidos.",
        best: [["Lard", "Manteca"], ["Chicharrones", "Chicharrones"], ["Sausage", "Embutidos"]],
        cuts: [["Fatback", "Lardo"], ["Rendered lard", "Manteca"], ["Pork skin", "Cuero para chicharrón"]] },
      { id: "loin", d: "M355 182L620 180L620 262L355 262Z", lx: 488, ly: 226, v: [0, -9], t: 5,
        en: "Loin", es: "Lomo",
        den: "The most tender part of the pig — chops, tenderloin and baby back ribs.",
        des: "La parte más suave del cerdo — chuletas, filete y costilla baby back.",
        best: [["Grilling", "Asador"], ["Pan-frying", "A la sartén"], ["Roasting", "Al horno"]],
        cuts: [["Pork chops", "Chuletas"], ["Pork tenderloin", "Filete de cerdo"], ["Baby back ribs", "Costilla baby back"], ["Loin roast", "Lomo para asar"]] },
      { id: "ribs", d: "M355 262L520 262L515 318L355 318Z", lx: 436, ly: 296, v: [-3, 8], t: 3,
        en: "Ribs", es: "Costillas",
        den: "Meaty spare ribs — smoke them, grill them or simmer them in chile colorado.",
        des: "Costillas con mucha carne — ahumadas, asadas o en chile colorado.",
        best: [["BBQ", "BBQ"], ["Chile colorado", "Chile colorado"], ["Smoking", "Ahumado"]],
        cuts: [["Spare ribs", "Costillas de cerdo"], ["St. Louis ribs", "Costillas St. Louis"], ["Rib tips", "Puntas de costilla"]] },
      { id: "belly", d: "M355 318L515 318L520 262L620 262L622 400L355 400Z", lx: 568, ly: 318, v: [3, 11], t: 3,
        en: "Belly", es: "Panza / Tocino",
        den: "Layers of meat and fat — bacon, crispy chicharrón and slow-roasted pork belly.",
        des: "Capas de carne y grasa — tocino, chicharrón crujiente y panza al horno.",
        best: [["Chicharrones", "Chicharrones"], ["Bacon", "Tocino"], ["Braising", "Estofado"]],
        cuts: [["Pork belly", "Panza de cerdo"], ["Fresh bacon, sliced", "Tocino fresco rebanado"], ["Bacon slab", "Tocino en pieza"], ["Chicharrón cut", "Para chicharrón"]] },
      { id: "ham", d: "M620 120L790 120L790 358L622 358L620 262Z", lx: 688, ly: 252, v: [11, 0], t: 3,
        en: "Ham / Leg", es: "Pierna",
        den: "The back leg — lean and versatile. Roast it whole or slice it for tortas.",
        des: "La pierna trasera — magra y versátil. Al horno entera o rebanada para tortas.",
        best: [["Pierna al horno", "Pierna al horno"], ["Tortas", "Tortas"], ["Steaks", "Bisteces"]],
        cuts: [["Fresh ham", "Pierna fresca"], ["Ham steaks", "Bisteces de pierna"], ["Ground pork", "Carne molida de cerdo"]] },
      { id: "hock", d: "M205 345L315 348L315 450L205 450ZM600 358L770 358L770 450L600 450Z", lx: 260, ly: 404, v: [0, 9], t: 1, lab: ["Hock"], lp: [[260, 448], [668, 448]], out: 1,
        en: "Hock & Trotters", es: "Codillo y Patitas",
        den: "Collagen-rich legs and feet — the soul of beans, caldos and patitas en vinagre.",
        des: "Patas llenas de colágeno — el alma de los frijoles, los caldos y las patitas en vinagre.",
        best: [["Beans", "Frijoles"], ["Caldos", "Caldos"], ["Pozole", "Pozole"]],
        cuts: [["Fresh hock", "Codillo fresco"], ["Smoked hock", "Codillo ahumado"], ["Trotters", "Patitas (manitas)"]] },
    ],
  },
};
