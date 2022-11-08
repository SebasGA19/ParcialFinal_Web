db.createUser(
    {
        user: "parcial",
        pwd: "parcial",
        roles: [
            {
                role: "readWrite",
                db: "parcial"
            }
        ]
    }
);