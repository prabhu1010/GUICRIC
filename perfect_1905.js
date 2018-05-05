MSEC = 200

function getRan(start, end) {
	return start + Math.floor(Math.random() * end);
}

var rowBatter = document.getElementsByTagName("tr");

function ChangeRowColor(rowptr, idx, strColor) {
	cell = rowptr[idx].getElementsByTagName("td");
	for (j = 0; j < 4; j++) 
		cell[j].style.color = strColor;
}

function balls2overs(ball) {
	overs = parseInt(ball / 6);
	rem = ball % 6;
	s = overs + "." +rem;
	return s;
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

var rowBatter = document.getElementsByTagName("tr");

function main() {

	var name = new Array("Gilchrist", "Hayden", "Ponting", "Martyn", "Lehmann", "Symonds",
						 "Bevan", "Warne", "Lee", "Gillespie", "McGrath");
    
	for (idx = 1; idx <= 11; idx++) {
		
		rowBatter[idx].getElementsByTagName("td")[0].innerHTML = name[idx-1]; 
		for (j = 2 ; j <= 5 ; j++)
				rowBatter[idx].getElementsByTagName("td")[j].value = 0;
					
		if (idx < 3) {
			ChangeRowColor(rowBatter, idx, "#32ff7e");
			rowBatter[idx].getElementsByTagName("td")[0].innerHTML = name[idx-1]; 			
			rowBatter[idx].getElementsByTagName("td")[1].innerHTML = "batting";
		}
		else
			rowBatter[idx].getElementsByTagName("td")[1].innerHTML = ""; 
	}

	console.log("hey");
	
    //rowBatter[1].getElementsByTagName("td")[1].style.background = "rgb(255,0,0)";
    idx1 = 1;
    idx2 = 2;
    str_runs = nstr_runs = str_faced = nstr_faced = total = wkts = overs = 0;
    ballCount = 0;
	nLegBye = nWide = 0;
	strExtras = "";
    str = idx1;
    nstr = idx2;
	max = max(str, nstr);
	min = max == str?  nstr : str;

    var timer;

    function doInning() {
        ball_result = outcome(); 
        console.log("Result is " +ball_result);

        if (ball_result <= 6) {
            rowBatter[str].getElementsByTagName("td")[2].value += ball_result ;
            rowBatter[str].getElementsByTagName("td")[2].innerHTML = rowBatter[str].getElementsByTagName("td")[2].value ; 
			if (ball_result == 4)
				rowBatter[str].getElementsByTagName("td")[4].innerHTML = rowBatter[str].getElementsByTagName("td")[4].value + 1;
			if (ball_result == 6)
				rowBatter[str].getElementsByTagName("td")[5].innerHTML = rowBatter[str].getElementsByTagName("td")[5].value + 1;			

            total += ball_result ;
			rowBatter[13].getElementsByTagName("td")[2].innerHTML = total ; 
            rowBatter[13].getElementsByTagName("td")[1].innerHTML = "for " +wkts + " wkts" ; 
        }

        if (ball_result != 10) {
            //console.log(rowBatter[str].getElementsByTagName("td")[3].value);
            rowBatter[str].getElementsByTagName("td")[3].value += 1; 
            rowBatter[str].getElementsByTagName("td")[3].innerHTML = rowBatter[str].getElementsByTagName("td")[3].value ;
            ballCount++;
		}
		
		sr = (100 * parseFloat(rowBatter[str].getElementsByTagName("td")[2].value)/rowBatter[str].getElementsByTagName("td")[3].value).toFixed(2);
		rowBatter[str].getElementsByTagName("td")[6].innerHTML = sr;

		if (ball_result == 7 || ball_result == 10) {
            ball_result == 7? nLegBye++ : nWide++;
			total++;
			
			if (nLegBye)
				strExtras = "lb-" + nLegBye ;
			if (nWide)
				if (nLegBye)
					strExtras += " w-" + nWide ;
				else
					strExtras = "w-" + nWide ;
						
			rowBatter[12].getElementsByTagName("td")[1].innerHTML = strExtras ;
			rowBatter[12].getElementsByTagName("td")[2].innerHTML = nLegBye + nWide ;
			rowBatter[13].getElementsByTagName("td")[2].innerHTML = total ;
        }

        /* do: nothing for 8-dot */

        if (ball_result == 9) {   //WICKET
			ChangeRowColor(rowBatter, str, "#ffff00");
            rowBatter[str].getElementsByTagName("td")[1].innerHTML = "OUT"; 
            wkts++;
			
			if (wkts == 10)
				rowBatter[12].getElementsByTagName("td")[1].innerHTML = "all out" ; 
			else  {
                str = max + 1; 
				max = max(str, nstr);
				min = max == str ? nstr : str;
				ChangeRowColor(rowBatter, str, "#32ff7e");
				rowBatter[str].getElementsByTagName("td")[1].innerHTML = "batting"; 
				rowBatter[str].getElementsByTagName("td")[2].innerHTML = 0; 
				rowBatter[str].getElementsByTagName("td")[3].innerHTML = 0; 
			}
        }
		
		/* UPDATE FOOTERS */
		
		strOvers = balls2overs(ballCount);
		
		rowBatter[12].getElementsByTagName("td")[4].innerHTML = (6*parseFloat(total)/ballCount).toFixed(2) ;  //RUN RATE
		rowBatter[13].getElementsByTagName("td")[4].innerHTML = strOvers ;									  //OVERS
		
		rowBatter[2].getElementsByTagName("td")[7].innerHTML = total + "/" + wkts ;							  //BIG TOTAL
		rowBatter[2].getElementsByTagName("td")[8].innerHTML = strOvers ;									  //BIG OVERS	
		
		rowBatter[5].getElementsByTagName("td")[7].innerHTML = rowBatter[min].getElementsByTagName("td")[0].innerHTML;
		rowBatter[5].getElementsByTagName("td")[8].innerHTML = rowBatter[max].getElementsByTagName("td")[0].innerHTML;
											
		rowBatter[6].getElementsByTagName("td")[7].innerHTML = rowBatter[min].getElementsByTagName("td")[2].value + "(" +	//BIG STR
											rowBatter[min].getElementsByTagName("td")[2].value + ")" ;
		rowBatter[6].getElementsByTagName("td")[8].innerHTML = rowBatter[max].getElementsByTagName("td")[2].value + "(" +	//BIG NONSTR
											rowBatter[max].getElementsByTagName("td")[2].value + ")" ;
		
		
		if (ballCount == 300 || wkts == 10) 
                clearInterval(timer);

				
        if ((ball_result % 2) && ball_result < 9) {
            temp = str; str = nstr; nstr = temp;
        }
        if (ballCount > 0 && (ballCount % 6 == 0)) {
            temp = str; str = nstr; nstr = temp;
        }
    }//end of doInning
    timer = setInterval(doInning, MSEC);

}

