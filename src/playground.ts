import {db} from "./server/db"

await db.user.create({
    data: {
        emailAddress: "test@test.com",
        firstName: "Jeff",
        lastName: "Bezos",
    }
})
console.log('done')