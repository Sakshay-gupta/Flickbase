const AccessControl = require('accesscontrol')


const allRights = {
    'create:any': ['*', '!views'],
    'read:any': ['*'],
    'update:any': ['*', '!views'],
    'delete:any': ['*']
}
const grantsObj ={
    admin:{
        //test:allRights,
        //article:allRights
        profile:allRights,
        articles:allRights
    },
    user:{
        // test:{
        //     'read:any': ['*'],
        // }
        profile:{
            'read:own': ['*', '!password', '!_id'],
            'update:own': ['*', '!password', '!_id'],
        },
        articles:{
            'read:any': ['*'],
        }
    }
}

const roles = new AccessControl(grantsObj);

module.exports = { roles }