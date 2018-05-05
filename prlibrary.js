function getRan(start, end) 
{
	return start + Math.floor(Math.random() * end);
}

function balls2overs(ball) {
	overs = parseInt(ball / 6);
	rem = ball % 6;
	s = overs + "." +rem;
	return s;
}

function playInng() {
  alert("hello");
  ball = 0;
  score = 0;
  wkts = 0;
  while (ball < 300 && wkts < 10) {
	val = outcome();
	if (val <= 6)
		score += val;
	else if (val == 7) {
		ball--;
		score++;
	}
	else if (val == 8) 
		score++;
	else 
		wkts++;
	ball++;
  }
  ovs = balls2overs(ball);
  console.log("Total: " +score +"-" +wkts +" in " +ovs);
}

function outcome()  {
	/*
	1 - 80 - 80
	2 - 35 - 115
	3 - 5  - 120
	4 - 25 - 145
	6 - 4  - 149
	w - 5  - 154    7 - wide
	lb - 4 - 158    8 - legbye
	0 - 135 - 293   0 - dot 
	W - 7   - 300   10 - wicket
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
	else if (val <= 154)
		return 7;
	else if (val <= 158)
		return 8;	
	else if (val <= 293)
		return 0;	
	else if (val <= 300)
		return 9;	
}

