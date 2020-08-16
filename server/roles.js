/* eslint-disable func-names */
const AccessControl = require('accesscontrol');

const ac = new AccessControl();

exports.roles = (function () {
  ac.grant('rider')
    .readOwn('profile')
    .updateOwn('profile');

  ac.grant('partner')
    .extend('rider')
    .readAny('profile');

  ac.grant('admin')
    .extend('rider')
    .extend('partner')
    .updateAny('profile')
    .deleteAny('profile');

  return ac;
}());
