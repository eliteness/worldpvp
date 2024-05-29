
function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};
window.addEventListener('load',async function()
{
	console.log("waitin for 3 secs..");
	$("cw_m").innerHTML = "Connecting.. Please wait."
	setTimeout(async () => { await basetrip(); }, 3000);
}, false);




async function basetrip()
{
	if(!(window.ethereum)){$("cw_m").innerHTML = "Wallet wasn't detected!";console.log("Wallet wasn't detected!");notice("<h3>Wallet wasn't detected!</h3>Please make sure that your device and browser have an active Web3 wallet like MetaMask installed and running.<br><br>Visit <a href='https://metamask.io' target='_blank'>metamask.io</a> to install MetaMask wallet.");provider = new ethers.providers.JsonRpcProvider(RPC_URL); await dexstats();return}
	else if(!Number(window.ethereum.chainId)==CHAINID){$("cw_m").innerHTML = "Wrong network! Please Switch to "+CHAINID;provider = new ethers.providers.Web3Provider(window.ethereum);await dexstats();notice("<h3>Wrong network!</h3>Please Switch to Chain #"+CHAINID+"<btr"+ CHAIN_NAME+ "</u> Blockchain.");}
	else if(//typeOf window.ethereum == Object &&Number(window.ethereum.chainId)
		Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Recognized Ethereum Chain:", window.ethereum.chainId,CHAINID);
		provider = new ethers.providers.Web3Provider(window.ethereum)
		signer = provider.getSigner();
		if(!(window.ethereum.selectedAddress==null)){console.log("Found old wallet:", window.ethereum.selectedAddress);cw();}
		else{console.log("Didnt find a connected wallet!");cw();}
		//chkAppr(tokes[1][0])
	}
	else //if(Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Couldn't find Ethereum Provider - ",CHAINID,window.ethereum.chainId)
		if((typeof Number(window.ethereum.chainId) == "number")){$("cw_m").innerHTML = "Wrong network! Switch from " + Number(window.ethereum.chainId)+" to "+CHAINID}
		provider = new ethers.providers.JsonRpcProvider(RPC_URL);
		signer = provider.getSigner()
		$("connect").innerHTML=`Wallet not found.<br><br><button onclick="window.location.reload()" id="btn-connect">Retry?</button>`;
	}
	if(Number(window.ethereum.chainId) != null &&(window.ethereum.chainId!=CHAINID))
	{
		await window.ethereum.request({
    		method: "wallet_addEthereumChain",
    		params: [{
        		chainId: "0x"+(CHAINID).toString(16),
        		rpcUrls: [RPC_URL],
        		chainName: CHAIN_NAME,
        		nativeCurrency: {
            		name: CHAIN_GAS,
            		symbol: CHAIN_GAS,
            		decimals: 18
        		},
        		blockExplorerUrls: [EXPLORE]
    		}]
		});
		window.location.reload
	}
	//DrefreshFarm()
	//arf()
	cw()
	dexstats()
}



/*
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Qt."}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Qd."}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Tn."}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Bn."}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Mn."}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Th."}
	else if(_n>0){n_=(_n/1e0).toFixed(5)+""}
	return(n_);
}
*/
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(3)+"Qt"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(3)+"Qd"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(3)+"T"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(3)+"B"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(3)+"M"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(3)+"K"}
	else if(_n>1e0){n_=(_n/1e0).toFixed(5)+""}
	else if(_n>0.0){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}

async function cw()
{
	let cs = await cw2(); cs?console.log("Good to Transact"):cw2();
	cw2();
}
async function cw2()
{
	if(!(window.ethereum)){$("cw_m").innerHTML="Metamask not detected! Trying a refresh";console.log("Metamask not found!");window.location.reload();return(0)}
	if(!(Number(window.ethereum.chainId)==CHAINID)){$("cw_m").innerHTML="Wrong network detected! Please switch to chain ID", CHAINID, "and refresh this page.";return(0)}
	if(typeof provider == "undefined"){$("cw_m").innerHTML="Provider not detected! Trying a refresh";console.log("Provider not found!");window.location.reload();return(0)}
	/*
	if(!
		(isFinite(Number(accounts[0])))
		|| (isFinite(Number(window.ethereum.selectedAddress)))
	){console.log("NAAAAAAAAAAAAAAAAA");window.location.reload();}
	*/

	//004
	window.ethereum
	.request({ method: 'eth_requestAccounts' })
	.then(r=>{console.log("004: Success:",r);})	//re-curse to end curse, maybe..
	.catch((error) => {	console.error("004 - Failure", r, error); });


	//005
	const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	if(Number(accounts[0])>0){console.log("005: Success - ", accounts)}
	else{console.log("005: Failure", accounts)}


	/*006
	const en6 = await window.ethereum.enable()
	if(Number(en6[0]) > 0){console.log("006 - Success",en6)}
	else{console.log("006 - Failure", en6)}
	*/


	/*003
	try {
      console.log("attempting cw()")
      const addresses = await provider.request({ method: "eth_requestAccounts" });
      console.log("addresses:",addresses)
    } catch (e) {
      console.log("error in request", e);
      window.location.reload(true);
    }
    */

    //002
    //try{await provider.send("eth_requestAccounts", []);console.log("CWE:",e);}//await window.ethereum.enable();
	//catch(e){console.log("CWE:",e);window.location.reload(true)}
	console.log("doing the paints")
	$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);
	if(window.ethereum.chainId==250) (new ethers.Contract("0x14ffd1fa75491595c6fd22de8218738525892101",["function getNames(address) public view returns(string[] memory)"],provider)).getNames(window.ethereum.selectedAddress).then(rn=>{if(rn.length>0){$("cw").innerHTML="hi, <span style='/*font-family:bold;font-size:1.337em*/'>"+rn[0]+"</span> 👋"}else{$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);}})
	$("cw_m").innerHTML=""
	$("connect").style.display="none";
	$("switch").style.display="block";
	//farm_1_f_chappro()
	gubs();
	return(1);
}
function fornum2(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Quintillion"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Quadrillion"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Trillion"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Billion"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Million"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Thousand"}
	else if(_n>1e0){n_=(_n/1e0).toFixed(4)+""}
	else if(_n>0){n_=(_n).toFixed(8)+""}
	return(n_);
}


function notice(c) {
	window.location = "#note"
	$("content1").innerHTML = c
}


LPABI = ["function balanceOf(address) public view returns(uint)","function approve(address,uint)","function allowance(address,address) public view returns(uint)","function totalSupply() public view returns(uint)","function getReserves() public view returns(uint,uint,uint)"];

async function dexstats() {

	WETH = "0x4200000000000000000000000000000000000006";
	DEAD = "0x000000000000000000000000000000000000dead";

	USA = new ethers.Contract("0x3bcb4d6523b98806dca200833723ffb32ba672c5", LPABI, provider);
	LP_USA = new ethers.Contract("0x6955d8d23420fa696f405baa380ea4d8f56f988e", LPABI, provider);

	NICARAGUA = new ethers.Contract("0xbdf7f7da57658a7d02c51bec3fc427e4627aca6f", LPABI, provider);
	LP_NICARAGUA = new ethers.Contract("0x8bc3878e628e11c81a027860130ee4cbf655041c", LPABI, provider);

	ICELAND = new ethers.Contract("0x20cdd480698e618caf36943d9a3ccb1b6f22507c", LPABI, provider);
	LP_ICELAND = new ethers.Contract("0x9851d5c9d3c56b4c42d116bf1ff3d83f36cecb84", LPABI, provider);



	_cc = [
		"USA",
		"NICARAGUA",
		"ICELAND"
	];

	__dead = await Promise.all([
		USA.balanceOf(DEAD),
		NICARAGUA.balanceOf(DEAD),
		ICELAND.balanceOf(DEAD),
	])

	__ts = await Promise.all([
		USA.totalSupply(),
		NICARAGUA.totalSupply(),
		ICELAND.totalSupply(),
	])

	__gr = await Promise.all([
		LP_USA.getReserves(),
		LP_NICARAGUA.getReserves(),
		LP_ICELAND.getReserves(),
	])

	_ts = [];
	_mc = [];
	_pri = [];
	_eth = [];
	_ctk = [];
	_def = [];
	_topind = 0;
	_topmc = 0;
	_topts = 0;


	for(i=0;i<_cc.length;i++) {
		_ts[i] = Number(__ts[i])/1e18 - Number(__dead[i])/1e18;
		_eth[i] = Number(__gr[i][0])/1e18;
		_ctk[i] = Number(__gr[i][1])/1e18;
		if(_eth[i] > _ctk[i]) { let tmp = _eth[i]; _eth[i] = _ctk[i]; _ctk[i] = tmp}
		_pri[i] = _eth[i]/_ctk[i];
		_mc[i] = _ts[i] * _pri[i];
	}

	for(i=0;i<_cc.length;i++) {
		if(_mc[i] > _topmc) {
			_topmc = _mc[i];
			_topts = _ts[i];
			_topind = i;
		}
	}

	for(i=0;i<_cc.length;i++) {
		let _mul = _topmc / _mc[i];
		if(_mul > 1) {
			let _tem = Math.sqrt(_mul);
			_def[i] = _eth[i] * (_tem - 1);
		}
		else {
			_def[i] = 0;
		}
	}


	for(i=0;i<_cc.length;i++) {

		$("main-table").innerHTML += `
			<div class="main-tables-rows">
				<div>${_cc[i]}</div>
				<div>${ _ts[i].toLocaleString(undefined,{maximumFractionDigits:0}) }</div>
				<div>${ _mc[i].toLocaleString(undefined,{maximumFractionDigits:4}) } ETH </div>
				<div>${ _eth[i].toLocaleString(undefined,{maximumFractionDigits:4}) } ETH </div>
				<div>+${ _def[i].toLocaleString(undefined,{maximumFractionDigits:4}) } ETH </div>
			</div>
		`;
	}

}
/*
async function gubs() {
	_BASE = new ethers.Contract(BASE, LPABI, signer);
	_WRAP = new ethers.Contract(WRAP, LPABI, signer);

	_ubs = await Promise.all([
		_BASE.balanceOf(window.ethereum.selectedAddress),
		_WRAP.balanceOf(window.ethereum.selectedAddress)
	]);
	$("ub-mint").innerHTML = (Number(_ubs[0])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});
	$("ub-redeem").innerHTML = (Number(_ubs[1])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});
}


async function redeem() {
	_MANAGER = new ethers.Contract(MANAGER, LPABI, signer);
	_oamt = $("man-inp-redeem").value;
	if(!isFinite(_oamt)){notice(`Invalid ${WRAP_NAME} amount!`); return;}
	_oamt = BigInt(_oamt * 1e18)

	al = await Promise.all([
		_WRAP.allowance(window.ethereum.selectedAddress, MANAGER),
		_WRAP.balanceOf(window.ethereum.selectedAddress)
	]);

	if(Number(_oamt)>Number(al[1])) {notice(`<h2>Insufficient Balance!</h2><h3>Desired Amount:</h3>${Number(_oamt)/1e18}<br><h3>Actual Balance:</h3>${al[1]/1e18}<br><br><b>Please reduce the amount and retry again, or accumulate some more ${WRAP_NAME}.`);return;}

	if(Number(_oamt)>Number(al[0])){
		notice(`
			<h3>Approval required</h3>
			Please grant ${WRAP_NAME} allowance.<br><br>
			<h4><u><i>Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await _WRAP.approve(MANAGER,_oamt);
		console.log(_tr);
		notice(`
			<h3>Submitting Approval Transaction!</h3>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approval Completed!</h3>
			<br>Spending rights of ${Number(_oamt)/1e18} ${WRAP_NAME} granted.<br>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the next step with your wallet provider now.
		`);
	}

	notice(`
		<h3>Order Summary</h3>
		<b>Redeeming ${WRAP_NAME}</b><br>

		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} to Redeem: <b>${fornum(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} Expected: <b>${fornum(_oamt,18)}</b><br>

		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await _MANAGER.withdraw(_oamt);
	console.log(_tr);
	notice(`
		<h3>Order Submitted!</h3>
		<br><h4>Redeeming ${WRAP_NAME}</h4>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} Redeeming: <b>${fornum(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} Expecting: <b>${fornum(_oamt,18)}</b><br>
		<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Order Completed!</h3>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} Redeemed: <b>${fornum(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} Received: <b>${fornum(_oamt,18)}</b><br>
		<br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	gubs();
}
*/
