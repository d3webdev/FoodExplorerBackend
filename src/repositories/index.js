const OrderRepositories = require('./orderRepositories');
const OrderItensRepositories = require('./orderItensRepositories');
const DishRepositories = require('./dishRepositories');
const FavoriteRepositories = require('./favoriteRepositories');
const UserRepositories = require('./userRepositories');
const PaymentRepositories = require('./paymentRepositories');

module.exports = {
    orderRepository: new OrderRepositories(),
    orderItensRepository: new OrderItensRepositories(),
    dishRepository: new DishRepositories(),
    favoriteRepository: new FavoriteRepositories(),
    userRepository: new UserRepositories(),
    paymentRepository: new PaymentRepositories(),
};
