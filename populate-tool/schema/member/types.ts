import { member, researcher, professional, student } from ".";


export type Member = typeof member.$inferInsert;
export type Researcher = typeof researcher.$inferInsert;
export type Professional = typeof professional.$inferInsert;
export type Student = typeof student.$inferInsert;
