MSEC = 1500;


var players = [	["Gilchrist", "Hayden", "Ponting", "Martyn", "Lehmann", "Symonds", "Bevan", "Warne", "Lee", "Gillespie", "McGrath"],
				["Sehwag", "Tendulkar", "Ganguly", "Dravid", "Laxman", "Yuvraj", "Dhoni", "Kumble", "Srinath", "Zaheer", "Harbhajan"]	];
var innings = 0;
var str, nstr, min, max;
var total, wkts, overs, ballCount;
var nLegBye, nWide, nNoball, strExtras;
var timer, ball_result;
var rowBatter = document.getElementsByTagName("tr");
var nameIdx, howoutIdx, rIdx, bIdx, FourIdx, SixIdx, SRIdx, totalIdx, RRIdx, totalIdx, extrasStrIdx;
var target;
var crazyFlag = 100;

function SetIndexes(innings) {
	console.log("SetIndexes");
	if (innings == 0) {
		strTeamIdx = 0;		nameIdx = 0;		howoutIdx = 1;		rIdx  = 2;			bIdx  = 3;
		FourIdx  = 4;		SixIdx  = 5;		SRIdx  = 6;			ttlExtrasIdx = 0;	strExtrasIdx = 1;
		valExtrasIdx = 2;

		strRRIdx = 3;	valRRIdx = 4;
		ttlTotalIdx = 0;	strTotalIdx = 1;	valTotalIdx = 2;
		strOversIdx = 3;	valOversIdx = 4; 	
	}

	if (innings == 1) {		//for 3 & 7, decrease by 2 from 8-14. 
		strTeamIdx = 8;		nameIdx = 9;		howoutIdx = 10;		rIdx  = 11;			bIdx  = 12;
		FourIdx  = 13;		SixIdx  = 14;		SRIdx  = 15;		ttlExtrasIdx = 7;	strExtrasIdx = 8;
		valExtrasIdx = 9;

		strRRIdx = 10;	valRRIdx = 11;
		ttlTotalIdx = 7;	strTotalIdx = 8;	valTotalIdx = 9;
		strOversIdx = 10;	valOversIdx = 11; 	
	}
	ctrTeamIdx = 7;
	ctrStrRunsIdx = 7; ctrStrOvsIdx = 8;	ctrScoreIdx = 7;   ctrOversIdx = 8;
	ctrPlayer1_Idx = 7; ctrPlayer2_Idx = 8;	ctrRuns1_Idx = 7; 	ctrRuns2_Idx = 8;
	Boundaries1_Idx = 7; Boundaries2_Idx = 8;
	
	ReqdIdx	= 7; nReqdIdx = 8; 	ballsLeftIdx = 7; 	nballsLeftIdx = 8; 	overLeftIdx	= 5; noverLeftIdx = 6; 
	ReqRateIdx = 5; nReqRateIdx = 6; 
}

function getRan(start, end) {
	return start + Math.floor(Math.random() * end);
}

var rowBatter = document.getElementsByTagName("tr");

/*
function ChangeRowColor(rowptr, idx, colIdx, strColor) {
	cell = rowptr[idx].getElementsByTagName("td");
    	for (j = colIdx; j < colIdx + 7; j++) 		cell[j].style.color = strColor;         
}
*/

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


function ClearVariableData(innings) {	
	startIdx = innings == 0 ? 3 : 1;
	for (idx = startIdx; idx <= 11; idx++) {
		for (j = howoutIdx ; j <= SRIdx ; j++) {
			if (innings == 1 && (idx == 3 || idx == 7))
				rowBatter[idx].getElementsByTagName("td")[j-2].innerHTML = "";
			else
				rowBatter[idx].getElementsByTagName("td")[j].innerHTML = "";
		}
	}
}


/* REFACTORED STUFF */
function InitBatterData(innings, position) {  
		console.log("InitBatterData");
		//ChangeRowColor(rowBatter, position, colIndex, "#32ff7e");  //CHECK IF THIS IS OKAY
		
		if (innings == 1 && (position == 3 || position == 7)) {
			rowBatter[position].getElementsByTagName("td")[nameIdx-2].innerHTML = players[innings][position - 1];	
			rowBatter[position].getElementsByTagName("td")[howoutIdx-2].innerHTML = "not out";
			for (j= rIdx; j <= SRIdx ; j++)
				rowBatter[position].getElementsByTagName("td")[j-2].innerHTML = 0;
		}
		else	{
			rowBatter[position].getElementsByTagName("td")[nameIdx].innerHTML = players[innings][position - 1];	
			rowBatter[position].getElementsByTagName("td")[howoutIdx].innerHTML = "not out";
			for (j= rIdx; j <= SRIdx ; j++)
				rowBatter[position].getElementsByTagName("td")[j].innerHTML = 0;
		}
}

function SendOpeners(innings)	{
	console.log("SendOpeners");
	console.log("Sending...");
	for (row = 1; row <=2; row++) 
		InitBatterData(innings, row);
	InitializeCenterBoard(innings);
}

function SetFooter(looper) {
	rowBatter[12].getElementsByTagName("td")[ttlExtrasIdx].innerHTML = "EXTRAS";
	rowBatter[12].getElementsByTagName("td")[strExtrasIdx].innerHTML = "";
	rowBatter[12].getElementsByTagName("td")[valExtrasIdx].innerHTML = 0;
	rowBatter[12].getElementsByTagName("td")[strRRIdx].innerHTML = "RUN RATE";
	rowBatter[12].getElementsByTagName("td")[valRRIdx].innerHTML = 0;
	
	rowBatter[13].getElementsByTagName("td")[ttlTotalIdx].innerHTML = "TOTAL";
	rowBatter[13].getElementsByTagName("td")[strTotalIdx].innerHTML = "";
	rowBatter[13].getElementsByTagName("td")[valTotalIdx].innerHTML = 0;
	rowBatter[13].getElementsByTagName("td")[strOversIdx].innerHTML = "OVS";
	rowBatter[13].getElementsByTagName("td")[valOversIdx].innerHTML = 0;
}

function InitializeCenterBoard(innings) {
		console.log("InitializeCenterBoard");
		batting_team = rowBatter[0].getElementsByTagName("td")[strTeamIdx] + "NOW";
		rowBatter[0].getElementsByTagName("td")[ctrTeamIdx ] = batting_team;

		rowBatter[1].getElementsByTagName("td")[ctrStrRunsIdx].innerHTML = "RUNS"; 
		rowBatter[1].getElementsByTagName("td")[ctrStrOvsIdx].innerHTML = "OVERS";
		rowBatter[2].getElementsByTagName("td")[ctrScoreIdx].innerHTML = 0; 
		rowBatter[2].getElementsByTagName("td")[ctrOversIdx].innerHTML = "0.0";
		rowBatter[5].getElementsByTagName("td")[ctrPlayer1_Idx].innerHTML = players[innings][0];
		rowBatter[5].getElementsByTagName("td")[ctrPlayer2_Idx].innerHTML = players[innings][1];
		rowBatter[6].getElementsByTagName("td")[ctrRuns1_Idx].innerHTML = "0(0)";
		rowBatter[6].getElementsByTagName("td")[ctrRuns2_Idx].innerHTML = "0(0)";
		rowBatter[8].getElementsByTagName("td")[Boundaries1_Idx].innerHTML = "0x4";
		rowBatter[8].getElementsByTagName("td")[Boundaries2_Idx].innerHTML = "0x4";

		rowBatter[11].getElementsByTagName("td")[ballsLeftIdx].innerHTML = "BALLS LEFT";
		rowBatter[11].getElementsByTagName("td")[nballsLeftIdx].innerHTML = 300;
		rowBatter[12].getElementsByTagName("td")[overLeftIdx].innerHTML = "OVERS LEFT";
		rowBatter[12].getElementsByTagName("td")[noverLeftIdx].innerHTML = 50;	
			
		rowBatter[10].getElementsByTagName("td")[ReqdIdx].innerHTML =  innings == 0? "" : "RUNS REQD";
		rowBatter[10].getElementsByTagName("td")[nReqdIdx].innerHTML = innings == 0? "" : "CHASING"
		rowBatter[13].getElementsByTagName("td")[ReqRateIdx].innerHTML = innings == 0? "" : "REQD RATE";
		rowBatter[13].getElementsByTagName("td")[nReqRateIdx].innerHTML = innings == 0? "" : "7.99";
}


function Initialize() {
	console.log("Initialize");
    total = wkts = overs = 0;
    nLegBye = nWide = nNoball = 0;
	strExtras = "";
    str = 1; nstr = 2;
	max = getMax(str, nstr);
	min = max == str?  nstr : str;
	ballCount = 0;
}

function UpdateTargetData() {
	
}

function BatterScores(innings) {
    if (innings == 1 && (str == 3 || str == 7))
	rowBatter[str].getElementsByTagName("td")[rIdx-2].innerHTML = parseInt(ball_result + parseInt(rowBatter[str].getElementsByTagName("td")[rIdx-2].innerHTML));
    else
	rowBatter[str].getElementsByTagName("td")[rIdx].innerHTML = parseInt(ball_result + parseInt(rowBatter[str].getElementsByTagName("td")[rIdx].innerHTML));

	if (ball_result == 4)
		rowBatter[str].getElementsByTagName("td")[FourIdx].innerHTML = parseInt(rowBatter[str].getElementsByTagName("td")[FourIdx].innerHTML) + 1;
	if (ball_result == 6) {
		console.log("damn index - " +str);
		rowBatter[str].getElementsByTagName("td")[SixIdx].innerHTML = parseInt(rowBatter[str].getElementsByTagName("td")[SixIdx].innerHTML) + 1;
	}

	total += ball_result ;
	rowBatter[13].getElementsByTagName("td")[totalIdx].innerHTML = total ; 
	rowBatter[13].getElementsByTagName("td")[totalIdx-1].innerHTML = "for " +wkts + " wkts" ; 
}

function UpdateFaced(innings) {

	ballCount++;
    if (innings == 1 && (str == 3 || str == 7)) {
	    rowBatter[str].getElementsByTagName("td")[bIdx-2].innerHTML = parseInt(1 + parseInt(rowBatter[str].getElementsByTagName("td")[bIdx-2].innerHTML));
	    sr = (100*parseFloat(rowBatter[str].getElementsByTagName("td")[rIdx-2].innerHTML)/rowBatter[str].getElementsByTagName("td")[bIdx-2].innerHTML).toFixed(2);
	    rowBatter[str].getElementsByTagName("td")[SRIdx-2].innerHTML = sr;
    }
    else {
	    rowBatter[str].getElementsByTagName("td")[bIdx].innerHTML = parseInt(1 + parseInt(rowBatter[str].getElementsByTagName("td")[bIdx].innerHTML));
	    sr = (100 * parseFloat(rowBatter[str].getElementsByTagName("td")[rIdx].innerHTML)/rowBatter[str].getElementsByTagName("td")[bIdx].innerHTML).toFixed(2);
	    rowBatter[str].getElementsByTagName("td")[SRIdx].innerHTML = sr;
    }
	
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
	//ChangeRowColor(rowBatter, str, howoutIdx, "#ffff00");

	if (str == 3) {
		console.log("WF - we got our man");
	}
	if (innings == 1 && (str == 3 || str == 7)) {
	    rowBatter[str].getElementsByTagName("td")[howoutIdx-2].innerHTML = "OUT"; 
	}
    else
	    rowBatter[str].getElementsByTagName("td")[howoutIdx].innerHTML = "OUT"; 
	wkts++;

	if (wkts == 10)
		rowBatter[13].getElementsByTagName("td")[howoutIdx].innerHTML = "all out" ; 
	else  {
		str = max + 1; 
		console.log("str is " +str);
		max = getMax(str, nstr);
		min = max == str ? nstr : str;
		
		
		//ChangeRowColor(rowBatter, str, howoutIdx, "#32ff7e");
		if (innings == 1 && (str == 3 || str == 7)) {
            rowBatter[str].getElementsByTagName("td")[nameIdx-2].innerHTML = players[innings][str-1]; 
            rowBatter[str].getElementsByTagName("td")[howoutIdx-2].innerHTML = "batting"; 
		}
        else {
            rowBatter[str].getElementsByTagName("td")[nameIdx].innerHTML = players[innings][str-1]; 
            rowBatter[str].getElementsByTagName("td")[howoutIdx].innerHTML = "batting"; 
        }
		//console.log("WF - innings - nameIdx - howoutIdx :" +innings +nameIdx +howoutIdx);
		//console.log(rowBatter[str].getElementsByTagName("td")[nameIdx].innerHTML);
		
						
		for (j = rIdx ; j <= SRIdx ; j++) {
			if (innings == 1 && (str == 3 || str == 7))
				rowBatter[str].getElementsByTagName("td")[j-2].innerHTML = 0 ;
			else
				rowBatter[str].getElementsByTagName("td")[j].innerHTML = 0 ;
		}
	}
}

function SetupInnings(looper) {
	innings = looper;
	SetIndexes(looper);
	SendOpeners(looper);
	Initialize();
}

/* Original main 
function main() {
	PlaySequence(0);
	PlaySequence(1);
}*/

function WipeScoreboard() {
	console.log("WipeScoreboard");
	for (i = 0; i < 2; i++) {
		SetIndexes(i);
		ClearVariableData(i);
		SetFooter(i);
	}
}

function main() {
	console.log("main");
	WipeScoreboard();
	SetupInnings(0);
	StartInnings();
	/*
	timer = setInterval( 
				function CallIt() { PlaySequence(0); }, 
				500);
	*/
}

function StartInnings(innings) {
    function FaceDelivery() {
        ball_result = outcome(); 

        if (ball_result <= 6) 
            BatterScores(innings);

        if (ball_result < 9)      //All legal outcomes
			UpdateFaced(innings);
		
		if (ball_result > 7) 
			HandleExtras();

        if (ball_result == 7)    //WICKET
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
				
		if (ballCount == 10 || wkts == 10) {
			console.log("1st inn over - innings is " +innings); 
			clearInterval(timer);

			if (crazyFlag != 232) { 
				crazyFlag = 232;
				SetupInnings(1);
				StartInnings();
			}
		}
				
        if (ball_result == 1 || ball_result == 3 || ball_result == 5) {
            temp = str; str = nstr; nstr = temp;
		}
        
        if (ballCount > 0 && (ballCount % 6 == 0)) { 
            temp = str; str = nstr; nstr = temp;
        }
    }//end of FaceDelivery
    timer = setInterval(FaceDelivery, MSEC);
}


//rowBatter[1].getElementsByTagName("td")[1].style.background = "rgb(255,0,0)";