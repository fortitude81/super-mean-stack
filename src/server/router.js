var todosRoutes = require('server/todos/routes');
var usersRoutes = require('server/users/routes');

module.exports = function router(app) {
    app.use('/todos', todosRoutes);
    app.use('/users', usersRoutes);
};
