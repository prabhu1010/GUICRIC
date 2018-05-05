MSEC = 10

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

function getMax(a, b) {
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
	if (val > 295)
		return 10;
	else if (val > 288)
		return 9;
	else if (val > 153)
		return 8;
	else if (val > 145)
		return 6;
	else if (val > 120)
		return 4;
	else if (val > 115)
		return 3;          // legbye
	else if (val > 80)
		return 2;           // dot	
	else 
		return 1;	       //wicket
}

var rowBatter = document.getElementsByTagName("tr");

function main() {

	var name = new Array("Gilchrist", "Hayden", "Ponting", "Martyn", "Lehmann", "Symonds",
						 "Bevan", "Warne", "Lee", "Gillespie", "McGrath");
    
	for (idx = 1; idx <= 11; idx++) {
		for (j = 0 ; j <= 6 ; j++) 
			rowBatter[idx].getElementsByTagName("td")[j].innerHTML = "";
	
		if (idx < 3) {
			ChangeRowColor(rowBatter, idx, "#32ff7e");
			rowBatter[idx].getElementsByTagName("td")[0].innerHTML = name[idx-1]; 			
			rowBatter[idx].getElementsByTagName("td")[1].innerHTML = "batting";
			for (j = 2 ; j <= 6 ; j++) {
				rowBatter[idx].getElementsByTagName("td")[j].innerHTML = 0;
				rowBatter[idx].getElementsByTagName("td")[j].value = 0;
			}
		}
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
	max = getMax(str, nstr);
	min = max == str?  nstr : str;
	console.log("max min " + max + " " +min);
	console.log("fours =" +rowBatter[7].getElementsByTagName("td")[4].value);
	console.log("sixes =" +rowBatter[7].getElementsByTagName("td")[5].value);
	
    var timer;

    function doInning() {
        ball_result = outcome(); 
        
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
				console.log("index of incoming guy is " +str);
				max = getMax(str, nstr);
				min = max == str ? nstr : str;
				ChangeRowColor(rowBatter, str, "#32ff7e");
				console.log("And he is " +name[str-1]);
				console.log("str is " +str + " nstr is " +nstr);
				rowBatter[str].getElementsByTagName("td")[0].innerHTML = name[str-1]; 
				rowBatter[str].getElementsByTagName("td")[1].innerHTML = "batting"; 
				for (j = 2 ; j <= 6 ; j++) {
					rowBatter[str].getElementsByTagName("td")[j].innerHTML = 0;
					rowBatter[str].getElementsByTagName("td")[j].value = 0;
				}
				rowBatter[5].getElementsByTagName("td")[8].innerHTML = name[str-1];	
				rowBatter[6].getElementsByTagName("td")[8].innerHTML = "0(0)" ;
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
													
		rowBatter[6].getElementsByTagName("td")[7].innerHTML = rowBatter[min].getElementsByTagName("td")[2].value + "(" +	//BIGSCORE STR
											rowBatter[min].getElementsByTagName("td")[3].value + ")" ;
		rowBatter[6].getElementsByTagName("td")[8].innerHTML = rowBatter[max].getElementsByTagName("td")[2].value + "(" +	//BIGSCORE NONSTR
											rowBatter[max].getElementsByTagName("td")[3].value + ")" ;
		rowBatter[8].getElementsByTagName("td")[7].innerHTML = rowBatter[min].getElementsByTagName("td")[4].value + "x4 " +	//BIGSCORE STR
											rowBatter[min].getElementsByTagName("td")[6].value + "x6";
		rowBatter[8].getElementsByTagName("td")[8].innerHTML = rowBatter[max].getElementsByTagName("td")[4].value + "x4 " +	//BIGSCORE STR
											rowBatter[max].getElementsByTagName("td")[6].value + "x6";

		
		
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
	
	//2nd Innings
	var name2 = new Array("Sehwag", "Tendulkar", "Ganguly", "Dravid", "Laxman", "Yuvraj",
						 "Dhoni", "Kumble", "Srinath", "Zaheer", "Harbhajan");
    
	for (idx = 1; idx <= 11; idx++) {
		for (j = 10 ; j <= 15 ; j++) 
			rowBatter[idx].getElementsByTagName("td")[j].innerHTML = "";
	
		if (idx < 3) {
			ChangeRowColor(rowBatter, idx, "#32ff7e");
			rowBatter[idx].getElementsByTagName("td")[10].innerHTML = name2[idx-1]; 			
			rowBatter[idx].getElementsByTagName("td")[11].innerHTML = "batting";
			for (j = 2 ; j <= 6 ; j++) {
				rowBatter[idx].getElementsByTagName("td")[j].innerHTML = 0;
				rowBatter[idx].getElementsByTagName("td")[j].value = 0;
			}
		}
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
	max = getMax(str, nstr);
	min = max == str?  nstr : str;
	console.log("max min " + max + " " +min);
	console.log("fours =" +rowBatter[7].getElementsByTagName("td")[4].value);
	console.log("sixes =" +rowBatter[7].getElementsByTagName("td")[5].value);
	
    var timer;

    function doInning2() {
        ball_result = outcome(); 
        alert("heyy");
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
				console.log("index of incoming guy is " +str);
				max = getMax(str, nstr);
				min = max == str ? nstr : str;
				ChangeRowColor(rowBatter, str, "#32ff7e");
				console.log("And he is " +name[str-1]);
				console.log("str is " +str + " nstr is " +nstr);
				rowBatter[str].getElementsByTagName("td")[0].innerHTML = name[str-1]; 
				rowBatter[str].getElementsByTagName("td")[1].innerHTML = "batting"; 
				for (j = 2 ; j <= 6 ; j++) {
					rowBatter[str].getElementsByTagName("td")[j].innerHTML = 0;
					rowBatter[str].getElementsByTagName("td")[j].value = 0;
				}
				rowBatter[5].getElementsByTagName("td")[8].innerHTML = name[str-1];	
				rowBatter[6].getElementsByTagName("td")[8].innerHTML = "0(0)" ;
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
													
		rowBatter[6].getElementsByTagName("td")[7].innerHTML = rowBatter[min].getElementsByTagName("td")[2].value + "(" +	//BIGSCORE STR
											rowBatter[min].getElementsByTagName("td")[3].value + ")" ;
		rowBatter[6].getElementsByTagName("td")[8].innerHTML = rowBatter[max].getElementsByTagName("td")[2].value + "(" +	//BIGSCORE NONSTR
											rowBatter[max].getElementsByTagName("td")[3].value + ")" ;
		rowBatter[8].getElementsByTagName("td")[7].innerHTML = rowBatter[min].getElementsByTagName("td")[4].value + "x4 " +	//BIGSCORE STR
											rowBatter[min].getElementsByTagName("td")[6].value + "x6";
		rowBatter[8].getElementsByTagName("td")[8].innerHTML = rowBatter[max].getElementsByTagName("td")[4].value + "x4 " +	//BIGSCORE STR
											rowBatter[max].getElementsByTagName("td")[6].value + "x6";

		
		
		if (ballCount == 300 || wkts == 10) 
                clearInterval(timer);

				
        if ((ball_result % 2) && ball_result < 9) {
            temp = str; str = nstr; nstr = temp;
        }
        if (ballCount > 0 && (ballCount % 6 == 0)) {
            temp = str; str = nstr; nstr = temp;
        }
    }//end of doInning
    timer = setInterval(doInning2, MSEC);
}

