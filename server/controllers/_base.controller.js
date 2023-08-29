exports.create = (res, req) => {
    res.send('POST > create response from controller');
};

exports.findAll = (res, req) => {
    res.send('get all request received from controller');
};

exports.findOne = (res, req) => {
    res.send('get one request received from controller');
};

exports.update = (res, req) => {
    res.send('update one request received from controller');
};

exports.deleteAll = (res, req) => {
    res.send('delete all request received from controller');
};

exports.deletedeleteOne = (res, req) => {
    res.send('delete one request received from controller');
};
