import React from 'react'
import moment from 'moment';
const Timer = ({ entryTime }) => {

    // if (index === 0) {
    //     var date1 = moment(entryTime).add(15, 'm');
    //     var now1 = new Date(date1).getTime();
    //     var actualTime = new Date().getTime();
    //     var timeleft1 = now1 - actualTime;
    // }
    // if (timeleft1 > 0) {
    const myfunc = setInterval(displayTimer, 1000)
    //debugger;
    function displayTimer() {
        {
            // const updateData = clientDetails.map((rowData) => {
            var date = moment(entryTime).add(15, 'm');
            var now = new Date(date).getTime();
            var actualTime = new Date().getTime();
            var timeleft = now - actualTime;
            //debugger
            if (timeleft < 0) {
                clearInterval(myfunc)
            }
            else {
                var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
                if (seconds < 10) {
                    seconds = "0" + seconds
                }
                let x=minutes+":"+seconds
                return x
            }
            // })
            // setTimerArray([...new Set(updateData?.map((item) => item?.timer))]);
        }
        // }
    }
    return (
        <div>{myfunc}</div>
    )
}

export default Timer