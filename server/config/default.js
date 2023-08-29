module.exports = {
    HOST: process.env.HOST || 'localhost',
    USER: process.env.USER || 'admin',
    PASSWORD: process.env.PASSWORD || '',
    DB: process.env.DB || 'test',
    DIALECT: process.env.DIALECT || 'mysql',
    POOL: {
        MAX: parseInt(process.env.MAX, 10) || 10,
        MIN: parseInt(process.env.MIN, 10) || 1,
        ACQUIRE: parseInt(process.env.ACQUIRE, 10) || 30000,
        IDLE: parseInt(process.env.IDLE, 10) || 10000,
    },
};
