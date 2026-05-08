import { Event } from "@/src/types/events";
import type {
  Campaign,
  Character,
  Group,
  Member,
  Session,
} from "@/src/types/ttrpg";
import { Temporal } from "temporal-polyfill";

export const Groups: Group[] = [
  {
    id: "g0",
    name: "LCDA",
    members: [{
      id: "m0",
      role: "admin"
    }, {
      id: "m1",
      role: "member"
    }],
    campaigns: ["c0"],
    state: "closed",
    creationDate: Temporal.PlainDate.from("2024-11-29"),
    lastActivity: Temporal.PlainDate.from("2026-05-01"),
  },
];

export const Members: Member[] = [
  {
    id: "m0",
    name: "WitNimros",
    groups: ["g0"],
    campaigns: ["c0"],
    subscriptions: []
  },
  {
    id: "m1",
    name: "Alex",
    groups: ["g0"],
    campaigns: ["c0"],
    subscriptions: []
  },
];

export const Characters: Character[] = [
  {
    id: "ch0",
    name: "GM",
    member: "m0",
    color: "#005500",
    campaign: "c0",
  },
  {
    id: "ch1",
    name: "Itri",
    member: "m1",
    color: "#550000",
    campaign: "c0",
  },
  {
    id: "ch2",
    name: "Kote",
    member: "m0",
    color: "#000055",
    campaign: "c0",
  },
];

export const Campaigns: Campaign[] = [
  {
    id: "c0",
    name: "Los Cazadores de Aurovita",
    short: "LCDA",
    group: "g0",
    GM: "m0",
    characters: ["ch1", "ch0"],
    sessions: ["s1", "s0"],
    summary: "Las historias del grupo de héroes: Los Cazadores de Aurovita",
    state: "on-going",
    lastActivity: Temporal.PlainDate.from("2026-05-01"),
  },
];

export const Sessions: Session[] = [
  {
    id: "s0",
    campaign: "c0",
    number: 1,
    title: "El Crisol del Grupo",
    author: "ch0",
    date: Temporal.PlainDate.from("2024-11-02"),
    summary: {
      text: `<p>Para aquellos que no hayan estado en Tantir, es un lugar tranquilo en los lindes del bosque al norte de Merth. El aire allí huele a resina fresca y, al entrar en contacto con la piel, te hace sentir ese frío de motnaña que a los amantes de la naturaleza nos reconforta tanto. Sus gentes viven de la caza y el forrajeo, pero sobre todo del comercio. No dudéis en visitar sus tiendas y su taberna, Tantir está lleno de lugares encantadores y gentes amables.</p>
<p>Por desgracia para los Cazadores, de todos estos sitios de Tantir, el inicio de su historia se remonta a los oscuros calabozos. Sin conocerse aún, Itri, Jurenay y Volk se encontraban arrestados en sus subterráneas, húmedas, y no tan cómodas como la taberna, celdas. En su defensa diré que su estancia allí era más una peripecia del destino que un resultado de sus malas acciones.</p>
<p>Sea como fuere, Tantir se encontraba bajo el asalto de unas criaturas cristalinas, unos animales conformados por algún tipo de cristal azulado y con instintos violentos. Los primeeros avistamientos en los bosques había evolucionado en asaltos frecuentes al pueblo, hasta el punto de sobrepasar las capacidades de la guardia. Desgracia de Tantir, oportunidad para los allí presos. El alcalde, ajeno a la cadena de acontecimientos que estaba a punto de iniciar, les ofreció un trato.</p>
<p>Cómo yo lo veo, podéis quedaros a esperar a que vengan a juzgaros, o quizás hacer algo de provecho. Acabad con las criaturas y su origen y desestimamos todos los cargos.</p>
<p>¿Tuvieron acaso alguna alternativa más que aceptar la oferta del alcade? Armados y equipados, su primera hazaña fuer la defensa del mercado de Tantir esa misma noche. Allí disuadieron a un enjambre de escarabajos cristalinos. Nada mal para tres aventureros principiantes empezando a forjar su leyenda.</p>`,
      annotations: [
        {
          id: "0",
          position: [1, 2],
          text: "A excepción de Jurenay, a quién habían atrapado en mitad de un robo.",
          character: "ch0",
        },
        {
          id: "1",
          position: [4, 3],
          text: "Bueno, tendríamos que hablar de la pelea en la que Volk me dejó sin aire...",
          character: "ch1",
        },
      ],
      comments: [
        {
          id: "0",
          text: "¡Qué gran sesión!",
          member: "m0",
          date: Temporal.PlainDateTime.from("2026-04-29T15:37"),
        },
      ],
    },
  },
  {
    id: "s1",
    campaign: "c0",
    number: 6,
    title: "El Cristal Vivo",
    author: "ch0",
    date: Temporal.PlainDate.from("2024-12-13"),
    summary: {
      text: `
<p>Desafortunado sería el adjetivo para el destino de la pequeña tribu goblin tras su encuentro con los Cazadores. A día de hoy, cada uno de ellos tiene una perspectiva diferente sobre su interacción con este grupo de goblins, aunque Fi aún conserva la copa dorada del líder de la tribu.</p>
<p>Por suerte, el tiempo que compartieron con la tribu les permitió conocer cómo repeler los cristales. De alguna manera, los goblins habían conseguido detener el avance del cristal usando unos tótems fabricados con calaveras de otros goblins y fragmentos de Aurovita</p>
<p>El rastro de cristales les llevó a unas cámaras de investigación de la ciudad enana. En su entrada, viejas runas advertían de los peligros del interior, seguramente dejadas allí por los enanos antes de abandonar el lugar. Allí adentro, sobre un gran pedestal, un cristal vivo pulsaba emitiendo una luz mágica que se propagaba por los rastros de cristal hasta el exterior. Fi asegura que en este primer contacto con el cristal estableció la conexión con “su tío”, una visión de una figura cadavérica y enfurecida.</p>
<p>Los Cazadores lucharon contra los guardianes de la sala y, con la ayuda de la “tecnología” goblin, acabaron con el propio cristal. Los artefactos y restos que allí encontraron les llevaron a creer que estas cámaras pertenecieron a Zerathion Malkaris y que, por lo tanto, el cristal fue obra suya.</p>
<p>A falta de cobrar la recompensa, su libertad, los Cazadores habían completado su primera misión juntos.</p>`,
      annotations: [
        {
          id: "0",
          position: [1, 1],
          text: "Conocido como “Jefe Goblin”. Estas posiciones están ocupadas por seres ligeramente más inteligentes y que portan algún distintivo. En este caso era una copa dorada sobre la cabeza. Como curiosidad, este afirmaba ser primo de Boblin",
          character: "ch2",
        },
        {
          id: "1",
          position: [2, 1],
          text: "Siendo goblins, me cuesta imaginar que esperasen a que sus compatriotas fallecieran para obtener sus calaveras",
          character: "ch2",
        },
        {
          id: "2",
          position: [2, 1],
          text: "La Aurovita es un cristal rojo capaz de potenciar enormemente la magia. Por desgracia es difícil de encontrar hoy en día.",
          character: "ch2",
        },
        {
          id: "3",
          position: [3, 3],
          text: "Al parecer desde entonces Fi tiene visiones de esta entidad con cierta frecuencia. Él sigue insistiendo en que es “su tío”",
          character: "ch2",
        },
      ],
      comments: [
        {
          id: "0",
          text: "¡Qué gran sesión!",
          member: "m0",
          date: Temporal.PlainDateTime.from("2026-04-29T15:37"),
        },
      ],
    },
  },
];

export const Events: Event[] = [];
