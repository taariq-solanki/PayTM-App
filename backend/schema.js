const { z } = require('zod');

const userValid = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    firstname: z.string().min(1),
    lastname: z.string().min(1)
});

module.exports = { userValid };
