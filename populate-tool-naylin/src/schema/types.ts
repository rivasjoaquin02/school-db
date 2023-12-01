import { persona, estudiante, profesor, libro, prestamo, perdida, autor, autorLibro } from "./schema";

export type PersonaInsert = typeof persona.$inferInsert;
export type EstudianteInsert = typeof estudiante.$inferInsert;
export type ProfesorInsert = typeof profesor.$inferInsert;
export type LibroInsert = typeof libro.$inferInsert;
export type PrestamoInsert = typeof prestamo.$inferInsert;
export type PerdidaInsert = typeof perdida.$inferInsert;
export type AutorInsert = typeof autor.$inferInsert;
export type AutorLibroInsert = typeof autorLibro.$inferInsert;

export type PersonaSelect = typeof persona.$inferSelect;
export type EstudianteSelect = typeof estudiante.$inferSelect;
export type ProfesorSelect = typeof profesor.$inferSelect;
export type LibroSelect = typeof libro.$inferSelect;
export type PrestamoSelect = typeof prestamo.$inferSelect;
export type PerdidaSelect = typeof perdida.$inferSelect;
export type AutorSelect = typeof autor.$inferSelect;
export type AutorLibroSelect = typeof autorLibro.$inferSelect;
