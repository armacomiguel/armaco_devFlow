import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Se requiere correo electrónico." })
    .email({ message: "Proporcione una dirección de correo electrónico válida." }),

  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
    .max(100, { message: "La contraseña no puede exceder los 100 caracteres." }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres." })
    .max(30, { message: "El nombre de usuario no puede exceder los 30 caracteres." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "El nombre de usuario sólo puede contener letras, números y guiones bajos.",
    }),

  name: z
    .string()
    .min(1, { message: "El nombre es obligatorio." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces.",
    }),

  email: z
    .string()
    .min(1, { message: "Se requiere correo electrónico." })
    .email({ message: "Proporcione una dirección de correo electrónico válida." }),

  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
    .max(100, { message: "La contraseña no puede exceder los 100 caracteres." })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula.",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula.",
    })
    .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "La contraseña debe contener al menos un carácter especial.",
    }),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Se requiere título." })
    .max(100, { message: "El título no puede exceder los 100 caracteres." }),

  content: z.string().min(1, { message: "Se requiere cuerpo." }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Se requiere etiqueta." })
        .max(30, { message: "La etiqueta no puede exceder los 30 caracteres." })
    )
    .min(1, { message: "Se requiere al menos una etiqueta." })
    .max(3, { message: "No se pueden agregar más de 3 etiquetas." }),
});

export const UserSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio." }),
  username: z
    .string()
    .min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres." }),
  email: z.string().email({ message: "Proporcione una dirección de correo electrónico válida." }),
  bio: z.string().optional(),
  image: z.string().url({ message: "Proporcione una URL válida." }).optional(),
  location: z.string().optional(),
  portfolio: z
    .string()
    .url({ message: "Proporcione una URL válida." })
    .optional(),
  reputation: z.number().optional(),
});

export const AccountSchema = z.object({
  userId: z.string().min(1, { message: "Se requiere ID de usuario." }),
  name: z.string().min(1, { message: "El nombre es obligatorio." }),
  image: z.string().url({ message: "Proporcione una URL válida." }).optional(),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
    .max(100, { message: "La contraseña no puede exceder los 100 caracteres." })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula.",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula.",
    })
    .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "La contraseña debe contener al menos un carácter especial.",
    })
    .optional(),
  provider: z.string().min(1, { message: "Se requiere proveedor." }),
  providerAccountId: z
    .string()
    .min(1, { message: "Se requiere ID de cuenta de proveedor." }),
});

export const SignWithOAuthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z.string().min(1, { message: "Id del provedor es obligatorio." }),
  user: z.object({
    name: z.string().min(1, { message: "Nombre es obligatorio." }),
    username: z.string().min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres." }),
    email: z.string().email({ message: "Por favor proporciona una dirección de correo electrónico válida." }),
    image: z.string().url({ message: "Por favor proporciona una URL válida." }).optional(),
  }),
});

export const EditQuestionSchema = AskQuestionSchema.extend({
  questionId: z.string().min(1, { message: "Se requiere ID de pregunta." }),
});

export const GetQuestionSchema = z.object({
  questionId: z.string().min(1, { message: "Question ID es obligatorio." }),
});

export const PaginatedSearchParamsSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
  query: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
});

export const GetTagQuestionsSchema = PaginatedSearchParamsSchema.extend({
  tagId: z.string().min(1, {message: "La etiqueta del id es requerida."})
});

export const IncrementViewsSchema = z.object({
  questionId: z.string().min(1,{message: "Question id es obligatorio."}),
});

export const AnswerSchema = z.object({
  content: z.string().min(100,{message: "La respuesta debe tener mas de 100 caracteres."}),
});

export const AnswerServerSchema = AnswerSchema.extend({
  questionId: z.string().min(1,{message: "Question id es obligatorio."}),
});

export const GetAnswersSchema = PaginatedSearchParamsSchema.extend({
  questionId: z.string().min(1,{message: "Question id es obligatorio."}),
});

export const AIAnswerSchema = z.object({
  question: z.string().min(5, {message: "La pregunta es obligatoria."}).max(130, {message: "maximo son 130 caracteres."}),
  content: z.string().min(100, {message: "La respuesta debe tener más de 100 caracteres."}),
  userAnswer: z.string().optional(),
});

export const CreateVoteSchema = z.object({
  targetId: z.string().min(1, {message: "Target ID es obligatorio."}),
  targetType: z.enum(["question", "answer"], {message: "target type es invalido."}),
  voteType: z.enum(["upvote", "downvote"], {message: "vote type es invalido."}),
});

export const UpdateVoteCountSchema = CreateVoteSchema.extend({
  change: z.number().int().min(-1).max(1),
});

export const HasVotedSchema = CreateVoteSchema.pick({
  targetId: true,
  targetType: true,
});

export const CollectionBaseSchema = z.object({
  questionId: z.string().min(1,{message: "Question id es obligatorio."}),
});

export const GetUserSchema = z.object({
  userId: z.string().min(1,{message: "User id es obligatorio."}),
});

export const GetUserQuestionsSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, { message: "User ID obligatorio." }),
});

export const GetUserAnswersSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, { message: "User ID is required." }),
});

export const GetUsersTagsSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
});