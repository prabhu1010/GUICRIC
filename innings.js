function getRan(start, end) 
{
	return start + Math.floor(Math.random() * end);
}

function max(a, b) {
    return a > b ? a : b;
}

function outcome()  {
	/*
	1 - 80 - 80
	2 - 35 - 115
	3 - 5  - 120
	4 - 25 - 145
	6 - 4  - 149
	lb - 4 - 153    7 - legbye
	0 - 135 - 288   8 - dot 
	W - 7   - 295   9 - wicket
	w - 5  - 300    10 - wide
    */

	val = getRan(1, 300);
	if (val <= 80)
		return 1;
	else if (val <= 115)
		return 2;
	else if (val <= 120)
		return 3;
	else if (val <= 145)
		return 4;
	else if (val <= 149)
		return 6;
	else if (val <= 153)
		return 7;          // legbye
	else if (val <= 288)
		return 8;           // dot	
	else if (val <= 295)
		return 9;	       //wicket
	else if (val <= 300)
		return 10;	      //wide
}

function main() {
    alert("hi");
    rowBatter = document.getElementsByTagName("tr");
    rowBatter[0].getElementsByTagName("td")[1].innerHTML = "not out"; 
    rowBatter[1].getElementsByTagName("td")[1].innerHTML = "not out"; 
    for (idx = 0; idx < 11; idx++) {
        rowBatter[idx].getElementsByTagName("td")[2].value = 0; 
        rowBatter[idx].getElementsByTagName("td")[3].value = 0; 
    }
    
    //rowBatter[1].getElementsByTagName("td")[1].style.background = "rgb(255,0,0)";
    idx1 = 0;
    idx2 = 1;
    str_runs = nstr_runs = str_faced = nstr_faced = total = wkts = overs = 0;
    tBalls = 0;

    str = idx1;
    nstr = idx2;

    var timer;

    function doInning() {
        ball_result = outcome(); 
        console.log("Result is " +ball_result);

        if (ball_result <= 6) {
            console.log(rowBatter[str].getElementsByTagName("td")[2].value);
            rowBatter[str].getElementsByTagName("td")[2].value += ball_result ;
            rowBatter[str].getElementsByTagName("td")[2].innerHTML = rowBatter[str].getElementsByTagName("td")[2].value ; 
            console.log(rowBatter[str].getElementsByTagName("td")[2].value);
            total += ball_result ;
            /* do: update total cell */
        }
        if (ball_result != 10) {
            //console.log(rowBatter[str].getElementsByTagName("td")[3].value);
            rowBatter[str].getElementsByTagName("td")[3].value += 1; 
            rowBatter[str].getElementsByTagName("td")[3].innerHTML = rowBatter[str].getElementsByTagName("td")[3].value ;
            tBalls++;
            if (tBalls == 300)
                clearInterval(timer);
        }

        /* do: 7-legbye later - inc the extra and total by 1 */
        /* do: nothing for 8-dot */
        if (ball_result == 9) {   //WICKET
            rowBatter[str].getElementsByTagName("td")[1].innerHTML = "OUT"; 
            wkts++;
            if (wkts != 10) 
                str = max(str, nstr) + 1; 
        }
        if (ball_result == 10) {  //WIDE
            /* 10-wide: do: inc extra and total by 1 */
        }
        if ((ball_result % 2) && ball_result < 9) {
            temp = str; str = nstr; nstr = temp;
        }
        if (tBalls > 0 && (tBalls % 6 == 0)) {
            temp = str; str = nstr; nstr = temp;
        }
    }//end of doInning
    timer = setInterval(doInning, 80);
}
