import ROUTES from "./routes";

export const DEFAULT_EMPTY = {
    title: "Sin datos",
    message: "No hay datos disponibles para mostrar.",
    button: {
        text: "Agregar datos",
        href: ROUTES.HOME
    },
};

export const DEFAULT_ERROR = {
    title: "Oops! algo salió mal",
    message: "No se pudo cargar los datos. Por favor, inténtalo de nuevo más tarde.",
    button: {
        text: "Intentar de nuevo",
        href: ROUTES.HOME
    },
};

export const EMPTY_QUESTION = {
    title: "Sin preguntas para mostrar",
    message: "No hay preguntas disponibles en este momento.",
    button: {
        text: "Hacer una pregunta",
        href: ROUTES.ASK_QUESTION
    },
};

export const EMPTY_TAGS = {
    title: "Sin etiquetas para mostrar",
    message: "No hay etiquetas disponibles en este momento.",
    button: {
        text: "Agregar etiqueta",
        href: ROUTES.TAGS
    },
};

export const EMPTY_ANSWERS = {
    title: "Sin respuestas para mostrar",
    message: "Puedes dejar el primer comentario.",
    button: {
        text: "Agregar respuesta",
        href: ROUTES.HOME
    },
};

export const EMPTY_COLLECTIONS = {
    title: "Las colecciones están vacías",
    message: "No hay colecciones disponibles en este momento.",
    button: {
        text: "Crear colección",
        href: ROUTES.COLLECTION
    },
};

export const EMPTY_USERS = {
    title: "No se encontrarón usuarios.",
    message: "Sin usuarios para mostrar.",
};