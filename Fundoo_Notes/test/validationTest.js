const assert = require('chai').assert;
const userValidate = require('../app/utility/validation');
const test = require("./user.json")


describe('User data Validation Tests :', () => {
    it('for given valid data should return null error', () => {
        const user = test.user.registerAuth;
        assert.equal((userValidate.authRegister.validate(user).error), null);
    })

    it('for given Invalid data should return null data', () => {
        const user = test.user.registerunAuth;
        assert.equal((userValidate.authRegister.validate(user).data), null);
    })
})