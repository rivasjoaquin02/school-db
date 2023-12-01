import { tables } from "./tables";
import { populate } from "./utils/populate";
import { getOrderOfTables } from "./utils/topo-sort";

// FAST
// await populate({...tables.service, amount: 100});
// await populate(tables.service);
// await populate(tables.member);
// await populate(tables.author);
// await populate(tables.email);
// await populate(tables.phone);
// await populate(tables.library);
// await populate(tables.collection);

// MEDIUM
// await populate(tables.document);
// await populate(tables.fine);
// await populate(tables.book);
// await populate(tables.magazine);
// await populate(tables.reference);
// await populate(tables.music);
// await populate(tables.room);

// TOO SLOW
// await populate(tables.student);
// await populate(tables.author_document);
// await populate(tables.loan);
// await populate(tables.email_library);
// await populate(tables.phone_library);
// await populate(tables.loan_library);

// TODO: error here
// await populate(tables.service_member);
// await populate(tables.professional);
// await populate(tables.loan_professional); //solo lleno 87
// await populate(tables.loan_researcher); //no lleno nada

// await populate(tables.media);
// await populate(tables.paint);
// await populate(tables.picture);
// await populate(tables.map);
// await populate(tables.manuscript);

// await populate(tables.email_collection);
// await populate(tables.document_collection);
// await populate(tables.email_room);
// await populate(tables.phone_room);
// await populate(tables.service_room);
console.log("👍 done");


console.log(getOrderOfTables());
