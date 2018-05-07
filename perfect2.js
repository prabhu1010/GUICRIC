MSEC = 2;

function getRan(start, end) {
	return start + Math.floor(Math.random() * end);
}

var rowBatter = document.getElementsByTagName("tr");

function ChangeRowColor(rowptr, idx, colIdx, strColor) {
	cell = rowptr[idx].getElementsByTagName("td");
	for (j = colIdx; j < colIdx + 7; j++) 
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

function PlayNextInnings() {
	return 5;
}

function outcome()  {
	/* see scoringshots.txt */
	val = getRan(1, 300);
	if (val <= 148)
		return 0; 					//DOT
	else if (val > 148 && val <= 223)
		return 1;
	else if (val > 223 && val <= 253)
		return 2;
	else if (val > 253 && val <= 258)
		return 3;
	else if (val > 258 && val <= 280)
		return 4;
	else if (val > 280 && val <= 284)
		return 6;
	else if (val > 284 && val <= 290)
		return 7;					// 7 - WICKET
	else if (val > 290 && val <= 294)
		return 8;					// 8 - leg bye
	else 
		return 9;					// 9 - WIDE
}

var players = [	["Gilchrist", "Hayden", "Ponting", "Martyn", "Lehmann", "Symonds", "Bevan", "Warne", "Lee", "Gillespie", "McGrath"],
				["Sehwag", "Tendulkar", "Ganguly", "Dravid", "Laxman", "Yuvraj", "Dhoni", "Kumble", "Srinath", "Zaheer", "Harbhajan"]	];
var innings = 0;
var str, nstr, min, max;
var total, wkts, overs, ballCount;
var nLegBye, nWide, nNoball, strExtras;
var timer, ball_result;
var rowBatter = document.getElementsByTagName("tr");
var nameIdx, howoutIdx, rIdx, bIdx, FourIdx, SixIdx, SRIdx, totalIdx, RRIdx, totalIdx, extrasStrIdx;

function getStartIndex(innings) {
	return inn;
}

function ClearVariableData(innings) {
	startIdx = innings == 0 ? startIdx = 0 : startIdx = 9;
	endIdx = startIdx + 6;
	
	for (idx = 1; idx <= 11; idx++) {
		for (j = startIdx ; j <= endIdx ; j++) {
			if (innings == 1 && (idx == 3 || idx == 7))
				rowBatter[idx].getElementsByTagName("td")[j-2].innerHTML = "";
			else
				rowBatter[idx].getElementsByTagName("td")[j].innerHTML = "";
		}
	}
	for (idx = 12; idx <= 13; idx++) {
		rowBatter[idx].getElementsByTagName("td")[1].innerHTML = "";
		rowBatter[idx].getElementsByTagName("td")[2].innerHTML = "";
		rowBatter[idx].getElementsByTagName("td")[4].innerHTML = "";
		rowBatter[idx].getElementsByTagName("td")[8].innerHTML = "";
		rowBatter[idx].getElementsByTagName("td")[9].innerHTML = "";
		rowBatter[idx].getElementsByTagName("td")[11].innerHTML = "";
	}
}

function InitializeCenterBoard(innings) {
	for (colIdx = 7; colIdx <= 8; colIdx++) {
		rowBatter[2].getElementsByTagName("td")[colIdx].innerHTML = 0; //CenterScore
		rowBatter[6].getElementsByTagName("td")[colIdx].innerHTML = "0(0)";  			  //Center batter runs(balls)
		rowBatter[8].getElementsByTagName("td")[colIdx].innerHTML = "0x4";   			  //Center Boundary Stats
	}
	
	rowBatter[5].getElementsByTagName("td")[7].innerHTML = players[innings][0];  //Center Player Name
	rowBatter[5].getElementsByTagName("td")[8].innerHTML = players[innings][1];  //Center Player Name
	rowBatter[10].getElementsByTagName("td")[8].innerHTML = "target"; 		  //Center runs reqd
	rowBatter[11].getElementsByTagName("td")[8].innerHTML = 300;   			  //Center deliveries left
	rowBatter[12].getElementsByTagName("td")[6].innerHTML = 50;   			  //Center overs left
	rowBatter[13].getElementsByTagName("td")[6].innerHTML = "tgt/50";   	  //Center regd RR
}

function SendOpeners(innings){
	for (row = 1; row <=2; row++) {
		colIndex = innings == 0 ? 0 : 9;
		
		ChangeRowColor(rowBatter, row, colIndex, "#32ff7e");
		rowBatter[row].getElementsByTagName("td")[colIndex].innerHTML = players[innings][row - 1]; 			
		rowBatter[row].getElementsByTagName("td")[colIndex+1].innerHTML = "batting";
		for (j= colIndex + 2; j <= colIndex + 6; j++)
			rowBatter[row].getElementsByTagName("td")[j].innerHTML = 0;
	}
	InitializeCenterBoard(innings);
}

function Initialize() {
    total = wkts = overs = 0;
    nLegBye = nWide = nNoball = 0;
	strExtras = "";
    str = 1; nstr = 2;
	max = getMax(str, nstr);
	min = max == str?  nstr : str;
	ballCount = 0;
}

function SetIndexes(innings) {
	nameIdx = 0; howoutIdx = 1; rIdx = 2; bIdx = 3; FourIdx = 4; SixIdx = 5; SRIdx = 6; totalIdx = 2; RRIdx = 4; extrasStrIdx=1;
	if (innings == 1) {
		nameIdx += 9; howoutIdx += 9; rIdx += 9; bIdx += 9; FourIdx += 9; SixIdx += 9; SRIdx += 9; totalIdx = 9; RRIdx = 11; extrasStrIdx=8;
	}
}

function BatterScores(innings) {
	
	rowBatter[str].getElementsByTagName("td")[rIdx].innerHTML = parseInt(ball_result + parseInt(rowBatter[str].getElementsByTagName("td")[rIdx].innerHTML));
	if (ball_result == 4)
		rowBatter[str].getElementsByTagName("td")[FourIdx].innerHTML = parseInt(rowBatter[str].getElementsByTagName("td")[FourIdx].innerHTML) + 1;
	if (ball_result == 6)
		rowBatter[str].getElementsByTagName("td")[SixIdx].innerHTML = parseInt(rowBatter[str].getElementsByTagName("td")[SixIdx].innerHTML) + 1;

	total += ball_result ;
	rowBatter[13].getElementsByTagName("td")[totalIdx].innerHTML = total ; 
	rowBatter[13].getElementsByTagName("td")[totalIdx-1].innerHTML = "for " +wkts + " wkts" ; 
}

function UpdateFaced(innings) {
	
	rowBatter[str].getElementsByTagName("td")[bIdx].innerHTML = parseInt(1 + parseInt(rowBatter[str].getElementsByTagName("td")[bIdx].innerHTML));
	ballCount++;
	
	sr = (100 * parseFloat(rowBatter[str].getElementsByTagName("td")[rIdx].innerHTML)/rowBatter[str].getElementsByTagName("td")[bIdx].innerHTML).toFixed(2);
	rowBatter[str].getElementsByTagName("td")[SRIdx].innerHTML = sr;
	
	strOvers = balls2overs(ballCount);
	rowBatter[12].getElementsByTagName("td")[RRIdx].innerHTML = (6*parseFloat(total)/ballCount).toFixed(2) ;  //RUN RATE
	rowBatter[13].getElementsByTagName("td")[RRIdx].innerHTML = strOvers ;	//same Idx as RR, dont panic	  //OVERS
}

function HandleExtras()	{
	ball_result == 8? nLegBye++ : nWide++;
	total++;

	if (nLegBye)
		strExtras = "lb-" + nLegBye ;
	if (nWide)
		if (nLegBye)
			strExtras += " w-" + nWide ;
		else
			strExtras = "w-" + nWide ;
				
	rowBatter[12].getElementsByTagName("td")[extrasStrIdx].innerHTML = strExtras ;
	rowBatter[13].getElementsByTagName("td")[totalIdx].innerHTML = total ;		
	rowBatter[12].getElementsByTagName("td")[totalIdx].innerHTML = nLegBye + nWide ; 
}

function WicketFallen(innings) {
	console.log("ARE WE HERE");
	ChangeRowColor(rowBatter, str, howoutIdx, "#ffff00");
	rowBatter[str].getElementsByTagName("td")[howoutIdx].innerHTML = "OUT"; 
	wkts++;

	if (wkts == 10)
		rowBatter[13].getElementsByTagName("td")[howoutIdx].innerHTML = "all out" ; 
	else  {
		str = max + 1; 
		max = getMax(str, nstr);
		min = max == str ? nstr : str;
		
		ChangeRowColor(rowBatter, str, howoutIdx, "#32ff7e");
		if (innings == 1 && (str == 3 || str == 7)) {
			nameIdx = nameIdx - 2;
			howoutIdx = howoutIdx - 2;
		}
		rowBatter[str].getElementsByTagName("td")[nameIdx].innerHTML = players[innings][str-1]; 
		rowBatter[str].getElementsByTagName("td")[howoutIdx].innerHTML = "batting"; 
						
		for (j = rIdx ; j <= SRIdx ; j++) {
			if (innings == 1 && (idx == 3 || idx == 7))
				rowBatter[str].getElementsByTagName("td")[j-2].innerHTML = 0 ;
			else
				rowBatter[str].getElementsByTagName("td")[j].innerHTML = 0 ;
		}
						
		/* NOT UPDATING CENTER BOARD NOW
		rowBatter[5].getElementsByTagName("td")[8].innerHTML = name[str-1];	
		rowBatter[6].getElementsByTagName("td")[8].innerHTML = "0(0)" ;
		rowBatter[2].getElementsByTagName("td")[7].innerHTML = total + "/" + wkts ;							  //BIG TOTAL
		rowBatter[2].getElementsByTagName("td")[8].innerHTML = strOvers ;									  //BIG OVERS	
		*/
	}
}

function main() {
	//ClearVariableData(0);
	ClearVariableData(1);
	//SendOpeners(0);
	SendOpeners(1);
	Initialize();
	SetIndexes(1);
	innings = 1;
	main2();
}


function main2() {
    
    function FaceDelivery() {
        ball_result = outcome(); 
        
        if (ball_result <= 6) 
            BatterScores(innings);

        if (ball_result < 9)      //All legal outcomes
			UpdateFaced(innings);
		
		if (ball_result > 7) 
			HandleExtras();

        if (ball_result == 9)    //WICKET
			WicketFallen(innings);
   
		/* CENTERBOARD 
		for (j = 7; j <= 8; j++) {
			var idx = (j == 7)? min : max;
			rowBatter[5].getElementsByTagName("td")[j].innerHTML = rowBatter[idx].getElementsByTagName("td")[0].innerHTML;
			rowBatter[6].getElementsByTagName("td")[j].innerHTML = rowBatter[idx].getElementsByTagName("td")[2].value + "(" +	
											rowBatter[idx].getElementsByTagName("td")[3].value + ")" ;
			rowBatter[8].getElementsByTagName("td")[j].innerHTML = rowBatter[idx].getElementsByTagName("td")[4].value + "x4 " +	
											rowBatter[idx].getElementsByTagName("td")[6].value + "x6";
		}
		*/
				
		if (ballCount == 300 || wkts == 10) {
			clearInterval(timer);
			PlayNextInnings();
		}
				
        if (ball_result == 1 || ball_result == 3 || ball_result == 5) {
			console.log("swap striker");
            temp = str; str = nstr; nstr = temp;
		}
        
        if (ballCount > 0 && (ballCount % 6 == 0)) 
            temp = str; str = nstr; nstr = temp;
        
    }//end of doInning
    timer = setInterval(FaceDelivery, MSEC);
	
//rowBatter[1].getElementsByTagName("td")[1].style.background = "rgb(255,0,0)";
}


