respon = {};

respon.response = (res, code, message, data) => {
    return res.status(code).json({
        status : code,
        message : message,
        data : data,
    });
}

module.exports = respon;