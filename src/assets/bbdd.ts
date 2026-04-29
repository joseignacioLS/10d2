import { Temporal } from "temporal-polyfill";

type Group = {
    id: string;
    name: string;
    members: Member["id"][];
    campaings: Campaign[];
}

type Member = {
    id: string;
    name: string;
    role: ("Player" | "GM")[]
}

type Campaign = {
    id: string;
    name: string;
    GM: Member["id"];
    characters: Character["id"][];
    sessions: Session[]
}

export type Session = {
    id: string;
    number: number;
    title: string;
    author: Character["id"];
    summary: SessionSummary;
    date: Temporal.PlainDate
}

type SessionSummary = {
    text: string;
    annotations: Annotation[];
    comments: Comment[];
}

export type Annotation = {
    id: any;
    character: Character["id"];
    text: string;
}

export type Comment = {
    id: string;
    text: string;
    member: Member["id"];
    date: Temporal.PlainDateTime;
}

type Character = {
    id: string;
    name: string;
    player: Member["id"];
    color: string;
}

export const Members: Member[] = [
    {
        id: "0",
        name: "Jose",
        role: ["GM"]
    }, {
        id: "1",
        name: "Alex",
        role: ["Player"]
    }
]

export const Characters: Character[] = [
    {
        id: "0-0",
        name: "GM",
        player: "0",
        color: "#005500"

    },
    {
        id: "1-0",
        name: "Itri",
        player: "1",
        color: "#550000"
    }, {
        id: "0-1",
        name: "Kote",
        player: "0",
        color: "#000055"

    },
]

export const bbdd: Group[] = [
    {
        id: "0",
        name: "LCDA",
        members: ["0"],
        campaings: [
            {
                id: "0-0",
                name: "Los Cazadores de Aurovita",
                GM: "0",
                characters: [
                    "1-0"
                ],
                sessions: [
                    {
                        id: "0-0-0",
                        number: 0,
                        title: "El Crisol del Grupo",
                        author: "1-0",
                        date: Temporal.PlainDate.from("2024-11-02"),
                        summary: {
                            text: `<p>Para aquellos que no hayan estado en Tantir, es un lugar tranquilo en los lindes del bosque al norte de Merth. El aire allí huele a resina fresca y, al entrar en contacto con la piel, te hace sentir ese frío de motnaña que a los amantes de la naturaleza nos reconforta tanto. Sus gentes viven de la caza y el forrajeo, pero sobre todo del comercio. No dudéis en visitar sus tiendas y su taberna, Tantir está lleno de lugares encantadores y gentes amables.</p>
<p>Por desgracia para los Cazadores, de todos estos sitios de Tantir, el inicio de su historia se remonta a los oscuros calabozos. Sin conocerse aún, Itri, Jurenay y Volk se encontraban arrestados en sus subterráneas, húmedas, y no tan cómodas como la taberna, celdas. En su defensa diré que su estancia allí era más una peripecia del destino que un resultado de sus malas acciones.</p>
<p>Sea como fuere, Tantir se encontraba bajo el asalto de unas criaturas cristalinas, unos animales conformados por algún tipo de cristal azulado y con instintos violentos. Los primeeros avistamientos en los bosques había evolucionado en asaltos frecuentes al pueblo, hasta el punto de sobrepasar las capacidades de la guardia. Desgracia de Tantir, oportunidad para los allí presos. El alcalde, ajeno a la cadena de acontecimientos que estaba a punto de iniciar, les ofreció un trato.</p>
<p>Cómo yo lo veo, podéis quedaros a esperar a que vengan a juzgaros, o quizás hacer algo de provecho. Acabad con las criaturas y su origen y desestimamos todos los cargos.</p>
<p>¿Tuvieron acaso alguna alternativa más que aceptar la oferta del alcade? Armados y equipados, su primera hazaña fuer la defensa del mercado de Tantir esa misma noche. Allí disuadieron a un enjambre de escarabajos cristalinos. Nada mal para tres aventureros principiantes empezando a forjar su leyenda.</p>`,
                            annotations: [
                                {
                                    id: "1-2",
                                    text: "A excepción de Jurenay, a quién habían atrapado en mitad de un robo.",
                                    character: "0-1"
                                },
                                {
                                    id: "4-3",
                                    text: "Bueno, tendríamos que hablar de la pelea en la que Volk me dejó sin aire...",
                                    character: "1-0"
                                }
                            ],
                            comments: [
                                {
                                    id: "0",
                                    text: "¡Qué gran sesión!",
                                    member: "0",
                                    date: Temporal.PlainDateTime.from("2026-04-29T15:37")
                                }
                            ]
                        }
                    },
                    {
                        id: "0-0-4",
                        number: 5,
                        title: "El Cristal Vivo",
                        author: "1-0",
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
                                    id: "1-1",
                                    text: "Conocido como “Jefe Goblin”. Estas posiciones están ocupadas por seres ligeramente más inteligentes y que portan algún distintivo. En este caso era una copa dorada sobre la cabeza. Como curiosidad, este afirmaba ser primo de Boblin",
                                    character: "0-1"
                                },
                                {
                                    id: "2-1",
                                    text: "Siendo goblins, me cuesta imaginar que esperasen a que sus compatriotas fallecieran para obtener sus calaveras",
                                    character: "0-1"
                                },
                                {
                                    id: "2-1",
                                    text: "La Aurovita es un cristal rojo capaz de potenciar enormemente la magia. Por desgracia es difícil de encontrar hoy en día.",
                                    character: "0-1"
                                },
                                {
                                    id: "3-3",
                                    text: "Al parecer desde entonces Fi tiene visiones de esta entidad con cierta frecuencia. Él sigue insistiendo en que es “su tío”",
                                    character: "0-1"
                                }
                            ],
                            comments: [
                                {
                                    id: "0",
                                    text: "¡Qué gran sesión!",
                                    member: "0",
                                    date: Temporal.PlainDateTime.from("2026-04-29T15:37")
                                }
                            ]
                        }
                    }
                ]
            }
        ],
    }
]