module.exports = {
    isNumeric: function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },

    currentDate: function() {
        return new Date();
    }
};

