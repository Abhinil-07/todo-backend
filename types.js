const zod = require('zod');

const createTodoSchema =zod.object({
    title: zod.string(),
    description : zod.string(),
    // completed : zod.boolean()
})

const updateTodoSchema = zod.object({
    id : zod.string()
});

module.exports = {
    createTodoSchema: createTodoSchema,
    updateTodoSchema: updateTodoSchema
}