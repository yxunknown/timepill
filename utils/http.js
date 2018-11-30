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

/**
 * get all skins form server
 * [pagination]: object {start, limit}
 * [onPost]: callback function (res, err) => void
 */
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

/**
 * add pills
 * [data]: object {user.id, date, content, skin.id}
 * [onPost]: callback function (res, err) => void
 */
const postPill = (data, onPost) => {
  wx.request({
    url: 'https://mevur.bennkyou.top:8078/pills/pill',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    success(res) {
      onPost(res, undefined);
    },
    fail(err) {
      onPost(undefined, err);
    }
  });
}

/**
 * get user info
 * [data]: object{userId}
 * [onPost]: callback function (res, err) => void
 */
const getUserInfo = (data, onPost) => {
  wx.request({
    url: 'https://mevur.bennkyou.top:8078/pills/info',
    data: data,
    method: 'GET',
    success(res) {
      onPost(res, undefined);
    },
    fail(err) {
      onPost(undefined, err);
    }
  });
}

/**
 * time machine, to get a random pill
 * [data]: object {userId}
 * [onPost]: callback function (res, err) => voids
 */
const timeMachine = (data, onPost) => {
  wx.request({
    url: 'https://mevur.bennkyou.top:8078/pills/pill/timemachine',
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

const purseSkin = (skinId, userId, onPost) => {
  wx.request({
    url: 'https://mevur.bennkyou.top:8078/pills/skin/' + skinId + '/' + userId,
    method: 'POST',
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
  postPill: postPill,
  getUserInfo: getUserInfo,
  timeMachine: timeMachine,
  purseSkin: purseSkin,
}