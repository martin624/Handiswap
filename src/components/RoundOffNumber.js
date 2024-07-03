import React from 'react'
// rounding off the numbers to the nearest whole figures +=============================================== !! ========================================================
function RoundOffNumber(number){
    if (number < 1000) {
        return Math.round(number).toString();
    } else if (number < 1000000) {
        return (Math.round(number / 100) / 10).toString() + 'K';
    } else if (number < 1000000000) {
        return (Math.round(number / 100000) / 10).toString() + 'M';
    } else {
        return (Math.round(number / 100000000) / 10).toString() + 'B';
    }
}

export default RoundOffNumber;