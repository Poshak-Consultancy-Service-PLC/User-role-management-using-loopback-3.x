// Copyright IBM Corp. 2015,2017. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function (app) {
  var Role = app.models.Role;

  Role.registerResolver('owner', function (role, context, cb) {
    function reject() {
      process.nextTick(function () {
        cb(null, role);
      });
    }

    // if the target model is not project
    if (context.modelName !== 'Student') {
      return reject();
    }

    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }

    // check if userId is in team table for the given project id
    context.model.findById(context.modelId, function (err, stud) {
      if (err || !stud)
        return reject();

      var std = app.models.Student;
      std.count({
        ownerId: std.ownerId,
        stid: userId
      }, function (err, count) {
        if (err) {
          console.log(err);
          return cb(null, count);
        }

        cb(null, count > 0); // true = is a team member
      });
    });
  });
};
