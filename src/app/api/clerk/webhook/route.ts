import { db } from "@/server/db";

export const POST = async (req: Request) => {
    const body = await req.json();
    console.log("Webhook payload:", body);

    const data = body.data ?? body; // fallback als `data` er niet is

    const emailAddress = data.email_addresses?.[0]?.email_address ?? null;
    const firstName = data.first_name ?? null;
    const lastName = data.last_name ?? null;
    const imageUrl = data.image_url ?? null;
    const id = data.id;

    if (!emailAddress) {
        console.error("No email address found in webhook payload");
        return new Response("Invalid payload", { status: 400 });
    }

    await db.user.create({
        data: {
            id,
            emailAddress,
            firstName,
            lastName,
            imageUrl
        },
    });

    console.log('user created');
    return new Response('Webhook received', { status: 200 });
}
