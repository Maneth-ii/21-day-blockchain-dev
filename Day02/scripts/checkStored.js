module.exports = async function(callback) {
  try {
    const SimpleStorage = artifacts.require("SimpleStorage");
    const instance = await SimpleStorage.deployed();
    const value = await instance.getNumber();
    console.log("storedData:", value.toString());
    callback();
  } catch (err) {
    console.error(err);
    callback(err);
  }
};