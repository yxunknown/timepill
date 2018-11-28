/**
 * all http api requet
 */

/**
 * login to server
 * [data]: object {code, nickname, profile}
 * [onPost]: callback function: (res, err) => void 
 */
const login = (data, onPost) => {
  wx.request({
    url: 'https://mevur.bennkyou.top:8078/pills/login',
    data: data,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success(res) {
      onPost(res, undefined);
    },
    fail (err) {
      onPost(undefined, err);
    }
  });
}

/**
 * get pills of user
 * [data]: object {userId, start, limit}
 * [onPost]: callback function (res, err) => void
 */
const getPills = (data, onPost) => {
  wx.request({
    url: 'https://mevur.bennkyou.top:8078/pills/pill',
    method: 'GET',
    data: data,
    success(res) {
      onPost(res, undefined);
    },
    fail(err) {
      onPost(undefined, err);
    }
  });
}

const getAllSkins = (pagination, onPost) => {
  wx.request({
    url: 'https://mevur.bennkyou.top:8078/pills/skin',
    method: 'GET',
    data: pagination,
    success(res) {
      onPost(res, undefined);
    },
    fail(err) {
      onPost(undefined, err);
    }
  });
}

module.exports = {
  login: login,
  getPills: getPills,
  getAllSkins: getAllSkins,
}