import {
	service,
	service_room,
	service_member,
	loan,
	loan_researcher,
	loan_professional,
	loan_library,
	fine,
} from ".";

export type Service = typeof service.$inferInsert;
export type ServiceRoom = typeof service_room.$inferInsert;
export type ServiceMember = typeof service_member.$inferInsert;
export type Loan = typeof loan.$inferInsert;
export type LoanResearcher = typeof loan_researcher.$inferInsert;
export type LoanProfessional = typeof loan_professional.$inferInsert;
export type LoanLibrary = typeof loan_library.$inferInsert;
export type Fine = typeof fine.$inferInsert;
