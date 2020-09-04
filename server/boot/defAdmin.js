const { principal } = require("loopback")

module.exports = function (app) {
    const { User, Role, RoleMapping } = app.models
    defuser =
        [
        {userName: "abrish", email: "abreham@gmail.com", password: "12345" },
        { userName: "mom", email: "mom@gmail.com", password: "12345" },
        { userName: "dad",email: "dad@gmail.com",password: "12345" }
     ]
    
    User.create(defuser, function (err, user) {
        if (err) console.log("Unable to create User")
        console.log("Created User", user)

        defrole =
            [
            { name: "admin" },
            { name: "owner" },
            {name: "teacher"}
            ]
        
        Role.create(defrole, function (err, role) {
            if (err) console.log("Unable to Create Role")
            console.log("Created Role", role)

            role[1].principals.create(
                {
                    principalType: RoleMapping.USER,
                    principalId: user[2].id
                }, function (err, principal) {
                    if (err) console.log("Unable to create Principal")
                    console.log("owner prnicipal:")
                    console.log("Created Principals:", principal)
                });
        });
        //creating default owner user

         Role.create(defrole, function (err, role) {
           if (err) console.log("Unable to Create Role")
           console.log("Created Role", role)

           role[0].principals.create({
             principalType: RoleMapping.USER,
             principalId: user[2].id
           }, function (err, principal) {
                   if (err) console.log("Unable to create Principal")
                   console.log("Admin principal")

             console.log("Created Principals:", principal)
           });
         });
        // creating default teacher user
         Role.create(defrole, function (err, role) {
           if (err) console.log("Unable to Create Role")
           console.log("Created Role", role)

           role[2].principals.create({
             principalType: RoleMapping.USER,
             principalId: user[1].id
           }, function (err, principal) {
             if (err) console.log("Unable to create Principal")
             console.log("Created Principals:", principal)
           });
         });

    });

}