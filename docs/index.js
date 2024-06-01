
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

//	CD = await fetch("https://leaderboard.worldpvp.co/leaderboard")
//	CD = await CD.json()
	CD = [{"Symbol":"USA","ISO":"US","Name":"United States","Active":true,"Marketcap":"170919121087159396666","MarketcapEther":"170.919121087159396666","Price":"8380934709",
	"PriceEther":"0.000000008380934709","TotalSupply":"20393801768150659406574803689","TotalSupplyEther":"20393801768.150659406574803689",
	"ReservesWeth":"89000263423094300715","ReservesWethEther":"89.000263423094300715"},{"Symbol":"NICARAGUA","ISO":"NI","Name":"Nicaragua","Active":true,"Marketcap":"33764490112468209304","MarketcapEther":"33.764490112468209304","Price":"25693822437","PriceEther":"0.000000025693822437","TotalSupply":"1314109264795345009588047864","TotalSupplyEther":"1314109264.795345009588047864","ReservesWeth":"3719338085480454016","ReservesWethEther":"3.719338085480454016"},{"Symbol":"UK","ISO":"GB","Name":"United Kingdom","Active":true,"Marketcap":"17293412992749527035","MarketcapEther":"17.293412992749527035","Price":"4158534959","PriceEther":"0.000000004158534959","TotalSupply":"4158534956000000000000000000","TotalSupplyEther":"4158534956","ReservesWeth":"8646706498454030880","ReservesWethEther":"8.64670649845403088"},{"Symbol":"CHAD","ISO":"TD","Name":"Chad","Active":true,"Marketcap":"16391343414705584536","MarketcapEther":"16.391343414705584536","Price":"4048622411","PriceEther":"0.000000004048622411","TotalSupply":"4048622408000000000000000000","TotalSupplyEther":"4048622408","ReservesWeth":"8195671709377104048","ReservesWethEther":"8.195671709377104048"},{"Symbol":"ISRAEL","ISO":"IL","Name":"Israel","Active":true,"Marketcap":"12444277629269906882","MarketcapEther":"12.444277629269906882","Price":"3530570985","PriceEther":"0.000000003530570985","TotalSupply":"3524720982000000000000000000","TotalSupplyEther":"3524720982","ReservesWeth":"6232465736531364126","ReservesWethEther":"6.232465736531364126"},{"Symbol":"CUBA","ISO":"CU","Name":"Cuba","Active":true,"Marketcap":"10760795540297078077","MarketcapEther":"10.760795540297078077","Price":"3280365155","PriceEther":"0.000000003280365155","TotalSupply":"3280365152000000000000000000","TotalSupplyEther":"3280365152","ReservesWeth":"5380397771788721856","ReservesWethEther":"5.380397771788721856"},{"Symbol":"NIGER","ISO":"NE","Name":"Niger","Active":true,"Marketcap":"9407626422130872967","MarketcapEther":"9.407626422130872967","Price":"3067185425","PriceEther":"0.000000003067185425","TotalSupply":"3067185422000000000000000000","TotalSupplyEther":"3067185422","ReservesWeth":"4703813212599029886","ReservesWethEther":"4.703813212599029886"},{"Symbol":"INDIA","ISO":"IN","Name":"India","Active":true,"Marketcap":"9336628708082702843","MarketcapEther":"9.336628708082702843","Price":"3055589749","PriceEther":"0.000000003055589749","TotalSupply":"3055589747000000000000000000","TotalSupplyEther":"3055589747","ReservesWeth":"4668314357096941499","ReservesWethEther":"4.668314357096941499"},{"Symbol":"PALESTINE","ISO":"PS","Name":"Palestine","Active":true,"Marketcap":"8935715965711038322","MarketcapEther":"8.935715965711038322","Price":"2989266795","PriceEther":"0.000000002989266795","TotalSupply":"2989266793000000000000000000","TotalSupplyEther":"2989266793","ReservesWeth":"4467857985844786011","ReservesWethEther":"4.467857985844786011"},{"Symbol":"ELSALVADOR","ISO":"SV","Name":"El Salvador","Active":true,"Marketcap":"7180327105264844079","MarketcapEther":"7.180327105264844079","Price":"2679613239","PriceEther":"0.000000002679613239","TotalSupply":"2679613237000000000000000000","TotalSupplyEther":"2679613237","ReservesWeth":"3590163555312035559","ReservesWethEther":"3.590163555312035559"},{"Symbol":"TIMORLESTE","ISO":"TL","Name":"Timor-Leste","Active":true,"Marketcap":"6486325126869670221","MarketcapEther":"6.486325126869670221","Price":"2546826483","PriceEther":"0.000000002546826483","TotalSupply":"2546826480000000000000000000","TotalSupplyEther":"2546826480","ReservesWeth":"3243162564708248160","ReservesWethEther":"3.24316256470824816"},{"Symbol":"GREENLAND","ISO":"GL","Name":"Greenland","Active":true,"Marketcap":"6237737344625035263","MarketcapEther":"6.237737344625035263","Price":"2553481315","PriceEther":"0.000000002553481315","TotalSupply":"2442836494625000000000000000","TotalSupplyEther":"2442836494.625","ReservesWeth":"3260133413027064611","ReservesWethEther":"3.260133413027064611"},{"Symbol":"SPAIN","ISO":"ES","Name":"Spain","Active":true,"Marketcap":"6182412435369267989","MarketcapEther":"6.182412435369267989","Price":"2486445745","PriceEther":"0.000000002486445745","TotalSupply":"2486445742000000000000000000","TotalSupplyEther":"2486445742","ReservesWeth":"3091206218927856766","ReservesWethEther":"3.091206218927856766"},{"Symbol":"SOUTHKOREA","ISO":"KR","Name":"Korea","Active":true,"Marketcap":"6052980854621896611","MarketcapEther":"6.052980854621896611","Price":"2460280647","PriceEther":"0.000000002460280647","TotalSupply":"2460280644000000000000000000","TotalSupplyEther":"2460280644","ReservesWeth":"3026490428541088656","ReservesWethEther":"3.026490428541088656"},{"Symbol":"HONGKONG","ISO":"HK","Name":"Hong Kong","Active":true,"Marketcap":"5767784702901820992","MarketcapEther":"5.767784702901820992","Price":"2401621267","PriceEther":"0.000000002401621267","TotalSupply":"2401621264000000000000000000","TotalSupplyEther":"2401621264","ReservesWeth":"2883892352651721376","ReservesWethEther":"2.883892352651721376"},{"Symbol":"JAPAN","ISO":"JP","Name":"Japan","Active":true,"Marketcap":"5050379160747277218","MarketcapEther":"5.050379160747277218","Price":"2247304867","PriceEther":"0.000000002247304867","TotalSupply":"2247304865000000000000000000","TotalSupplyEther":"2247304865","ReservesWeth":"2525189582620943843","ReservesWethEther":"2.525189582620943843"},{"Symbol":"IRAN","ISO":"IR","Name":"Iran","Active":true,"Marketcap":"4812068810769337901","MarketcapEther":"4.812068810769337901","Price":"2193642819","PriceEther":"0.000000002193642819","TotalSupply":"2193642816000000000000000000","TotalSupplyEther":"2193642816","ReservesWeth":"2406034406481490560","ReservesWethEther":"2.40603440648149056"},{"Symbol":"AUSTRALIA","ISO":"AU","Name":"Australia","Active":true,"Marketcap":"4564314651980651227","MarketcapEther":"4.564314651980651227","Price":"2136425673","PriceEther":"0.000000002136425673","TotalSupply":"2136425671000000000000000000","TotalSupplyEther":"2136425671","ReservesWeth":"2282157328126751463","ReservesWethEther":"2.282157328126751463"},{"Symbol":"RUSSIA","ISO":"RU","Name":"Russia","Active":true,"Marketcap":"4347569715713337501","MarketcapEther":"4.347569715713337501","Price":"2085082665","PriceEther":"0.000000002085082665","TotalSupply":"2085082663000000000000000000","TotalSupplyEther":"2085082663","ReservesWeth":"2173784859941751111","ReservesWethEther":"2.173784859941751111"},{"Symbol":"SAUDI","ISO":"SA","Name":"Saudi Arabia","Active":true,"Marketcap":"4290202246870514990","MarketcapEther":"4.29020224687051499","Price":"2071280341","PriceEther":"0.000000002071280341","TotalSupply":"2071280339000000000000000000","TotalSupplyEther":"2071280339","ReservesWeth":"2145101125506538139","ReservesWethEther":"2.145101125506538139"},{"Symbol":"UKRAINE","ISO":"UA","Name":"Ukraine","Active":true,"Marketcap":"4245189504735407127","MarketcapEther":"4.245189504735407127","Price":"2060385767","PriceEther":"0.000000002060385767","TotalSupply":"2060385765000000000000000000","TotalSupplyEther":"2060385765","ReservesWeth":"2122594754428089143","ReservesWethEther":"2.122594754428089143"},{"Symbol":"GERMANY","ISO":"DE","Name":"Germany","Active":true,"Marketcap":"4134683836987448124","MarketcapEther":"4.134683836987448124","Price":"2033392201","PriceEther":"0.000000002033392201","TotalSupply":"2033392198000000000000000000","TotalSupplyEther":"2033392198","ReservesWeth":"2067341919510419998","ReservesWethEther":"2.067341919510419998"},{"Symbol":"EMIRATES","ISO":"AE","Name":"United Arab Emirates","Active":true,"Marketcap":"4099462171523517995","MarketcapEther":"4.099462171523517995","Price":"2024712863","PriceEther":"0.000000002024712863","TotalSupply":"2024712860000000000000000000","TotalSupplyEther":"2024712860","ReservesWeth":"2049731086774115520","ReservesWethEther":"2.04973108677411552"},{"Symbol":"NEWZEALAND","ISO":"NZ","Name":"New Zealand","Active":true,"Marketcap":"3813408825610102415","MarketcapEther":"3.813408825610102415","Price":"1952795133","PriceEther":"0.000000001952795133","TotalSupply":"1952795130000000000000000000","TotalSupplyEther":"1952795130","ReservesWeth":"1906704413781448710","ReservesWethEther":"1.90670441378144871"},{"Symbol":"MALTA","ISO":"MT","Name":"Malta","Active":true,"Marketcap":"3769549471743946611","MarketcapEther":"3.769549471743946611","Price":"1941532765","PriceEther":"0.000000001941532765","TotalSupply":"1941532762000000000000000000","TotalSupplyEther":"1941532762","ReservesWeth":"1884774736842739846","ReservesWethEther":"1.884774736842739846"},{"Symbol":"COLOMBIA","ISO":"CO","Name":"Colombia","Active":true,"Marketcap":"3676256582737278844","MarketcapEther":"3.676256582737278844","Price":"1917356667","PriceEther":"0.000000001917356667","TotalSupply":"1917356664000000000000000000","TotalSupplyEther":"1917356664","ReservesWeth":"1838128292327317776","ReservesWethEther":"1.838128292327317776"},{"Symbol":"POLAND","ISO":"PL","Name":"Poland","Active":true,"Marketcap":"3623507138661069327","MarketcapEther":"3.623507138661069327","Price":"1903551193","PriceEther":"0.000000001903551193","TotalSupply":"1903551190000000000000000000","TotalSupplyEther":"1903551190","ReservesWeth":"1811753570282310430","ReservesWethEther":"1.81175357028231043"},{"Symbol":"ICELAND","ISO":"IS","Name":"Iceland","Active":true,"Marketcap":"3260472666250250562","MarketcapEther":"3.260472666250250562","Price":"1635388732","PriceEther":"0.000000001635388732","TotalSupply":"1993698869542076733984519461","TotalSupplyEther":"1993698869.542076733984519461","ReservesWeth":"1759597992520863564","ReservesWethEther":"1.759597992520863564"},{"Symbol":"MEXICO","ISO":"MX","Name":"Mexico","Active":true,"Marketcap":"3068356175901691074","MarketcapEther":"3.068356175901691074","Price":"1751672395","PriceEther":"0.000000001751672395","TotalSupply":"1751672393000000000000000000","TotalSupplyEther":"1751672393","ReservesWeth":"1534178089702518011","ReservesWethEther":"1.534178089702518011"},{"Symbol":"FRANCE","ISO":"FR","Name":"France","Active":true,"Marketcap":"2964401841969226403","MarketcapEther":"2.964401841969226403","Price":"1721743839","PriceEther":"0.000000001721743839","TotalSupply":"1721743836000000000000000000","TotalSupplyEther":"1721743836","ReservesWeth":"1482200921845485120","ReservesWethEther":"1.48220092184548512"},{"Symbol":"TURKEY","ISO":"TR","Name":"Turkey","Active":true,"Marketcap":"2954055986582037718","MarketcapEther":"2.954055986582037718","Price":"1718736743","PriceEther":"0.000000001718736743","TotalSupply":"1718736740000000000000000000","TotalSupplyEther":"1718736740","ReservesWeth":"1477027994150387280","ReservesWethEther":"1.47702799415038728"},{"Symbol":"BAHAMAS","ISO":"BS","Name":"Bahamas","Active":true,"Marketcap":"2937403280877368239","MarketcapEther":"2.937403280877368239","Price":"1713885435","PriceEther":"0.000000001713885435","TotalSupply":"1713885433000000000000000000","TotalSupplyEther":"1713885433","ReservesWeth":"1468701642152569611","ReservesWethEther":"1.468701642152569611"},{"Symbol":"ESTONIA","ISO":"EE","Name":"Estonia","Active":true,"Marketcap":"2887627115574500802","MarketcapEther":"2.887627115574500802","Price":"1699301951","PriceEther":"0.000000001699301951","TotalSupply":"1699301948000000000000000000","TotalSupplyEther":"1699301948","ReservesWeth":"1443813558636901248","ReservesWethEther":"1.443813558636901248"},{"Symbol":"DJIBOUTI","ISO":"DJ","Name":"Djibouti","Active":true,"Marketcap":"2833708557309986720","MarketcapEther":"2.83370855730998672","Price":"1683362279","PriceEther":"0.000000001683362279","TotalSupply":"1683362276000000000000000000","TotalSupplyEther":"1683362276","ReservesWeth":"1416854279496674640","ReservesWethEther":"1.41685427949667464"},{"Symbol":"ARGENTINA","ISO":"AR","Name":"Argentina","Active":true,"Marketcap":"2810589400042856401","MarketcapEther":"2.810589400042856401","Price":"1676481257","PriceEther":"0.000000001676481257","TotalSupply":"1676481254000000000000000000","TotalSupplyEther":"1676481254","ReservesWeth":"1405294700859668766","ReservesWethEther":"1.405294700859668766"},{"Symbol":"SINGAPORE","ISO":"SG","Name":"Singapore","Active":true,"Marketcap":"2776428672736277026","MarketcapEther":"2.776428672736277026","Price":"1666261887","PriceEther":"0.000000001666261887","TotalSupply":"1666261885000000000000000000","TotalSupplyEther":"1666261885","ReservesWeth":"1388214338034400383","ReservesWethEther":"1.388214338034400383"},{"Symbol":"GUINEA","ISO":"GN","Name":"Guinea","Active":true,"Marketcap":"2772896548484335977","MarketcapEther":"2.772896548484335977","Price":"1665201655","PriceEther":"0.000000001665201655","TotalSupply":"1665201653000000000000000000","TotalSupplyEther":"1665201653","ReservesWeth":"1386448275907369511","ReservesWethEther":"1.386448275907369511"},{"Symbol":"AFGHANISTAN","ISO":"AF","Name":"Afghanistan","Active":true,"Marketcap":"2657808690212329683","MarketcapEther":"2.657808690212329683","Price":"1630278717","PriceEther":"0.000000001630278717","TotalSupply":"1630278714000000000000000000","TotalSupplyEther":"1630278714","ReservesWeth":"1328904345921304326","ReservesWethEther":"1.328904345921304326"},{"Symbol":"CAYMAN","ISO":"KY","Name":"Cayman Is.","Active":true,"Marketcap":"2570884517872022101","MarketcapEther":"2.570884517872022101","Price":"1603397805","PriceEther":"0.000000001603397805","TotalSupply":"1603397803000000000000000000","TotalSupplyEther":"1603397803","ReservesWeth":"1285442260539409011","ReservesWethEther":"1.285442260539409011"},{"Symbol":"EGYPT","ISO":"EG","Name":"Egypt","Active":true,"Marketcap":"2552211190283664166","MarketcapEther":"2.552211190283664166","Price":"1416325109","PriceEther":"0.000000001416325109","TotalSupply":"1801995300419166772422651233","TotalSupplyEther":"1801995300.419166772422651233","ReservesWeth":"872309917775892043","ReservesWethEther":"0.872309917775892043"},{"Symbol":"SWITZERLAND","ISO":"CH","Name":"Switzerland","Active":true,"Marketcap":"2541184924232317233","MarketcapEther":"2.541184924232317233","Price":"1594109447","PriceEther":"0.000000001594109447","TotalSupply":"1594109444000000000000000000","TotalSupplyEther":"1594109444","ReservesWeth":"1270592462913213456","ReservesWethEther":"1.270592462913213456"},{"Symbol":"IRAQ","ISO":"IQ","Name":"Iraq","Active":true,"Marketcap":"2492039246364606164","MarketcapEther":"2.492039246364606164","Price":"1578619413","PriceEther":"0.000000001578619413","TotalSupply":"1578619410000000000000000000","TotalSupplyEther":"1578619410","ReservesWeth":"1246019623971612870","ReservesWethEther":"1.24601962397161287"},{"Symbol":"PUERTORICO","ISO":"PR","Name":"Puerto Rico","Active":true,"Marketcap":"2450634767006115489","MarketcapEther":"2.450634767006115489","Price":"1565450341","PriceEther":"0.000000001565450341","TotalSupply":"1565450339000000000000000000","TotalSupplyEther":"1565450339","ReservesWeth":"1225317385068508139","ReservesWethEther":"1.225317385068508139"},{"Symbol":"ROMANIA","ISO":"RO","Name":"Romania","Active":true,"Marketcap":"2410058484186925476","MarketcapEther":"2.410058484186925476","Price":"1552436307","PriceEther":"0.000000001552436307","TotalSupply":"1552436305000000000000000000","TotalSupplyEther":"1552436305","ReservesWeth":"1205029243645899123","ReservesWethEther":"1.205029243645899123"},{"Symbol":"NETHERLANDS","ISO":"NL","Name":"Netherlands","Active":true,"Marketcap":"2384356474443000806","MarketcapEther":"2.384356474443000806","Price":"1544136159","PriceEther":"0.000000001544136159","TotalSupply":"1544136157000000000000000000","TotalSupplyEther":"1544136157","ReservesWeth":"1192178238765636639","ReservesWethEther":"1.192178238765636639"},{"Symbol":"CROATIA","ISO":"HR","Name":"Croatia","Active":true,"Marketcap":"2307104075897507656","MarketcapEther":"2.307104075897507656","Price":"1518915429","PriceEther":"0.000000001518915429","TotalSupply":"1518915426000000000000000000","TotalSupplyEther":"1518915426","ReservesWeth":"1153552038708211590","ReservesWethEther":"1.15355203870821159"},{"Symbol":"THAILAND","ISO":"TH","Name":"Thailand","Active":true,"Marketcap":"2257746805155422365","MarketcapEther":"2.257746805155422365","Price":"1502580051","PriceEther":"0.000000001502580051","TotalSupply":"1502580048000000000000000000","TotalSupplyEther":"1502580048","ReservesWeth":"1128873403329001248","ReservesWethEther":"1.128873403329001248"},{"Symbol":"BRITISHVIRGIN","ISO":"VG","Name":"British Virgin Is.","Active":true,"Marketcap":"2220909125828991915","MarketcapEther":"2.220909125828991915","Price":"1490271495","PriceEther":"0.000000001490271495","TotalSupply":"1490271493000000000000000000","TotalSupplyEther":"1490271493","ReservesWeth":"1110454564404767511","ReservesWethEther":"1.110454564404767511"},{"Symbol":"TAIWAN","ISO":"TW","Name":"Taiwan","Active":true,"Marketcap":"2195573383719666705","MarketcapEther":"2.195573383719666705","Price":"1481746735","PriceEther":"0.000000001481746735","TotalSupply":"1481746733000000000000000000","TotalSupplyEther":"1481746733","ReservesWeth":"1097786693341580111","ReservesWethEther":"1.097786693341580111"},{"Symbol":"SOMALIA","ISO":"SO","Name":"Somalia","Active":true,"Marketcap":"2172273815603826819","MarketcapEther":"2.172273815603826819","Price":"1473863569","PriceEther":"0.000000001473863569","TotalSupply":"1473863566000000000000000000","TotalSupplyEther":"1473863566","ReservesWeth":"1086136908538845310","ReservesWethEther":"1.08613690853884531"},{"Symbol":"INDONESIA","ISO":"ID","Name":"Indonesia","Active":true,"Marketcap":"2109434700540329555","MarketcapEther":"2.109434700540329555","Price":"1452389309","PriceEther":"0.000000001452389309","TotalSupply":"1452389306000000000000000000","TotalSupplyEther":"1452389306","ReservesWeth":"1054717350996359430","ReservesWethEther":"1.05471735099635943"},{"Symbol":"SYRIA","ISO":"SY","Name":"Syria","Active":true,"Marketcap":"1969932116337460792","MarketcapEther":"1.969932116337460792","Price":"1403542703","PriceEther":"0.000000001403542703","TotalSupply":"1403542701000000000000000000","TotalSupplyEther":"1403542701","ReservesWeth":"984966059572273103","ReservesWethEther":"0.984966059572273103"},{"Symbol":"ITALY","ISO":"IT","Name":"Italy","Active":true,"Marketcap":"1955228672111446908","MarketcapEther":"1.955228672111446908","Price":"1398294917","PriceEther":"0.000000001398294917","TotalSupply":"1398294915000000000000000000","TotalSupplyEther":"1398294915","ReservesWeth":"977614337454018443","ReservesWethEther":"0.977614337454018443"},{"Symbol":"LITHUANIA","ISO":"LT","Name":"Lithuania","Active":true,"Marketcap":"1922563469820622428","MarketcapEther":"1.922563469820622428","Price":"1386565351","PriceEther":"0.000000001386565351","TotalSupply":"1386565349000000000000000000","TotalSupplyEther":"1386565349","ReservesWeth":"961281736296876599","ReservesWethEther":"0.961281736296876599"},{"Symbol":"PORTUGAL","ISO":"PT","Name":"Portugal","Active":true,"Marketcap":"1891082380159015974","MarketcapEther":"1.891082380159015974","Price":"1375166311","PriceEther":"0.000000001375166311","TotalSupply":"1375166309000000000000000000","TotalSupplyEther":"1375166309","ReservesWeth":"945541191454674359","ReservesWethEther":"0.945541191454674359"},{"Symbol":"IRELAND","ISO":"IE","Name":"Ireland","Active":true,"Marketcap":"1768038465757081568","MarketcapEther":"1.768038465757081568","Price":"1329676077","PriceEther":"0.000000001329676077","TotalSupply":"1329676074000000000000000000","TotalSupplyEther":"1329676074","ReservesWeth":"884019233543378886","ReservesWethEther":"0.884019233543378886"},{"Symbol":"NIGERIA","ISO":"NG","Name":"Nigeria","Active":true,"Marketcap":"1737014537870450237","MarketcapEther":"1.737014537870450237","Price":"1317958475","PriceEther":"0.000000001317958475","TotalSupply":"1317958472000000000000000000","TotalSupplyEther":"1317958472","ReservesWeth":"868507269594204336","ReservesWethEther":"0.868507269594204336"},{"Symbol":"GREECE","ISO":"GR","Name":"Greece","Active":true,"Marketcap":"1674833457567130646","MarketcapEther":"1.674833457567130646","Price":"1294153569","PriceEther":"0.000000001294153569","TotalSupply":"1294153567000000000000000000","TotalSupplyEther":"1294153567","ReservesWeth":"837416730077718879","ReservesWethEther":"0.837416730077718879"},{"Symbol":"VIETNAM","ISO":"VN","Name":"Vietnam","Active":true,"Marketcap":"1639089808271447124","MarketcapEther":"1.639089808271447124","Price":"1280269429","PriceEther":"0.000000001280269429","TotalSupply":"1280269427000000000000000000","TotalSupplyEther":"1280269427","ReservesWeth":"819544905415993019","ReservesWethEther":"0.819544905415993019"},{"Symbol":"GRENADA","ISO":"GD","Name":"Grenada","Active":true,"Marketcap":"1608370168902761188","MarketcapEther":"1.608370168902761188","Price":"1268215349","PriceEther":"0.000000001268215349","TotalSupply":"1268215347000000000000000000","TotalSupplyEther":"1268215347","ReservesWeth":"804185085719595899","ReservesWethEther":"0.804185085719595899"},{"Symbol":"FINLAND","ISO":"FI","Name":"Finland","Active":true,"Marketcap":"1590911895378559926","MarketcapEther":"1.590911895378559926","Price":"1261313561","PriceEther":"0.000000001261313561","TotalSupply":"1261313558000000000000000000","TotalSupplyEther":"1261313558","ReservesWeth":"795455948319936798","ReservesWethEther":"0.795455948319936798"},{"Symbol":"NORWAY","ISO":"NO","Name":"Norway","Active":true,"Marketcap":"1502566855899506226","MarketcapEther":"1.502566855899506226","Price":"1225792339","PriceEther":"0.000000001225792339","TotalSupply":"1225792337000000000000000000","TotalSupplyEther":"1225792337","ReservesWeth":"751283429175545459","ReservesWethEther":"0.751283429175545459"},{"Symbol":"BRAZIL","ISO":"BR","Name":"Brazil","Active":true,"Marketcap":"1462624330530094330","MarketcapEther":"1.46262433053009433","Price":"1209390067","PriceEther":"0.000000001209390067","TotalSupply":"1209390064000000000000000000","TotalSupplyEther":"1209390064","ReservesWeth":"731312165869742176","ReservesWethEther":"0.731312165869742176"},{"Symbol":"CANADA","ISO":"CA","Name":"Canada","Active":true,"Marketcap":"1456171356767597347","MarketcapEther":"1.456171356767597347","Price":"1206719255","PriceEther":"0.000000001206719255","TotalSupply":"1206719252000000000000000000","TotalSupplyEther":"1206719252","ReservesWeth":"728085678987158256","ReservesWethEther":"0.728085678987158256"},{"Symbol":"JORDAN","ISO":"JO","Name":"Jordan","Active":true,"Marketcap":"1455445963893497119","MarketcapEther":"1.455445963893497119","Price":"1206418653","PriceEther":"0.000000001206418653","TotalSupply":"1206418651000000000000000000","TotalSupplyEther":"1206418651","ReservesWeth":"727722983153167203","ReservesWethEther":"0.727722983153167203"},{"Symbol":"STKITTS","ISO":"KN","Name":"St. Kitts and Nevis","Active":true,"Marketcap":"1450145736146800868","MarketcapEther":"1.450145736146800868","Price":"1204219971","PriceEther":"0.000000001204219971","TotalSupply":"1204219969000000000000000000","TotalSupplyEther":"1204219969","ReservesWeth":"725072869277620419","ReservesWethEther":"0.725072869277620419"},{"Symbol":"QATAR","ISO":"QA","Name":"Qatar","Active":true,"Marketcap":"1434584346290788126","MarketcapEther":"1.434584346290788126","Price":"1197741353","PriceEther":"0.000000001197741353","TotalSupply":"1197741351000000000000000000","TotalSupplyEther":"1197741351","ReservesWeth":"717292174343135303","ReservesWethEther":"0.717292174343135303"},{"Symbol":"PHILIPPINES","ISO":"PH","Name":"Philippines","Active":true,"Marketcap":"1369297860494590235","MarketcapEther":"1.369297860494590235","Price":"1170170015","PriceEther":"0.000000001170170015","TotalSupply":"1170170012000000000000000000","TotalSupplyEther":"1170170012","ReservesWeth":"684648930832380096","ReservesWethEther":"0.684648930832380096"},{"Symbol":"SWEDEN","ISO":"SE","Name":"Sweden","Active":true,"Marketcap":"1352779198318923459","MarketcapEther":"1.352779198318923459","Price":"1163090367","PriceEther":"0.000000001163090367","TotalSupply":"1163090364000000000000000000","TotalSupplyEther":"1163090364","ReservesWeth":"676389599741006976","ReservesWethEther":"0.676389599741006976"},{"Symbol":"PERU","ISO":"PE","Name":"Peru","Active":true,"Marketcap":"1320364786986626626","MarketcapEther":"1.320364786986626626","Price":"1149071273","PriceEther":"0.000000001149071273","TotalSupply":"1149071270000000000000000000","TotalSupplyEther":"1149071270","ReservesWeth":"660182394067848990","ReservesWethEther":"0.66018239406784899"},{"Symbol":"HONDURAS","ISO":"HN","Name":"Honduras","Active":true,"Marketcap":"1266679496430501928","MarketcapEther":"1.266679496430501928","Price":"1125468569","PriceEther":"0.000000001125468569","TotalSupply":"1125468566000000000000000000","TotalSupplyEther":"1125468566","ReservesWeth":"633339748777985310","ReservesWethEther":"0.63333974877798531"},{"Symbol":"PARAGUAY","ISO":"PY","Name":"Paraguay","Active":true,"Marketcap":"1261615171086273524","MarketcapEther":"1.261615171086273524","Price":"1123216441","PriceEther":"0.000000001123216441","TotalSupply":"1123216439000000000000000000","TotalSupplyEther":"1123216439","ReservesWeth":"630807586666353239","ReservesWethEther":"0.630807586666353239"},{"Symbol":"BELGIUM","ISO":"BE","Name":"Belgium","Active":true,"Marketcap":"1257598085701068902","MarketcapEther":"1.257598085701068902","Price":"1121426809","PriceEther":"0.000000001121426809","TotalSupply":"1121426807000000000000000000","TotalSupplyEther":"1121426807","ReservesWeth":"628799043971961239","ReservesWethEther":"0.628799043971961239"},{"Symbol":"KAZAKHSTAN","ISO":"KZ","Name":"Kazakhstan","Active":true,"Marketcap":"1216974838551096560","MarketcapEther":"1.21697483855109656","Price":"1103165827","PriceEther":"0.000000001103165827","TotalSupply":"1103165824000000000000000000","TotalSupplyEther":"1103165824","ReservesWeth":"608487419827131136","ReservesWethEther":"0.608487419827131136"},{"Symbol":"SWAZILAND","ISO":"SZ","Name":"Swaziland","Active":true,"Marketcap":"1199161541627023819","MarketcapEther":"1.199161541627023819","Price":"1095062347","PriceEther":"0.000000001095062347","TotalSupply":"1095062345000000000000000000","TotalSupplyEther":"1095062345","ReservesWeth":"599580771908574203","ReservesWethEther":"0.599580771908574203"},{"Symbol":"CONGO","ISO":"CG","Name":"Congo","Active":true,"Marketcap":"1175614477018047443","MarketcapEther":"1.175614477018047443","Price":"1084257571","PriceEther":"0.000000001084257571","TotalSupply":"1084257568000000000000000000","TotalSupplyEther":"1084257568","ReservesWeth":"587807239051152448","ReservesWethEther":"0.587807239051152448"},{"Symbol":"PAKISTAN","ISO":"PK","Name":"Pakistan","Active":true,"Marketcap":"1160691494795860645","MarketcapEther":"1.160691494795860645","Price":"1077353933","PriceEther":"0.000000001077353933","TotalSupply":"1077353931000000000000000000","TotalSupplyEther":"1077353931","ReservesWeth":"580345748475284243","ReservesWethEther":"0.580345748475284243"},{"Symbol":"MONTENEGRO","ISO":"ME","Name":"Montenegro","Active":true,"Marketcap":"1146387740197200245","MarketcapEther":"1.146387740197200245","Price":"1070694981","PriceEther":"0.000000001070694981","TotalSupply":"1070694979000000000000000000","TotalSupplyEther":"1070694979","ReservesWeth":"573193871169295179","ReservesWethEther":"0.573193871169295179"},{"Symbol":"MADAGASCAR","ISO":"MG","Name":"Madagascar","Active":true,"Marketcap":"1139053986825737441","MarketcapEther":"1.139053986825737441","Price":"1067264723","PriceEther":"0.000000001067264723","TotalSupply":"1067264721000000000000000000","TotalSupplyEther":"1067264721","ReservesWeth":"569526994480133363","ReservesWethEther":"0.569526994480133363"},{"Symbol":"ALBANIA","ISO":"AL","Name":"Albania","Active":true,"Marketcap":"1138224399375999951","MarketcapEther":"1.138224399375999951","Price":"1066876001","PriceEther":"0.000000001066876001","TotalSupply":"1066875999000000000000000000","TotalSupplyEther":"1066875999","ReservesWeth":"569112200754875999","ReservesWethEther":"0.569112200754875999"},{"Symbol":"BARBADOS","ISO":"BB","Name":"Barbados","Active":true,"Marketcap":"1133481389819688934","MarketcapEther":"1.133481389819688934","Price":"1064650831","PriceEther":"0.000000001064650831","TotalSupply":"1064650829000000000000000000","TotalSupplyEther":"1064650829","ReservesWeth":"566740695974495279","ReservesWethEther":"0.566740695974495279"},{"Symbol":"MALI","ISO":"ML","Name":"Mali","Active":true,"Marketcap":"1124677972085314392","MarketcapEther":"1.124677972085314392","Price":"1060508357","PriceEther":"0.000000001060508357","TotalSupply":"1060508354000000000000000000","TotalSupplyEther":"1060508354","ReservesWeth":"562338986572911366","ReservesWethEther":"0.562338986572911366"},{"Symbol":"GUINEABISSAU","ISO":"GW","Name":"Guinea-Bissau","Active":true,"Marketcap":"1123260905088001360","MarketcapEther":"1.12326090508800136","Price":"1059840039","PriceEther":"0.000000001059840039","TotalSupply":"1059840036000000000000000000","TotalSupplyEther":"1059840036","ReservesWeth":"561630453073920720","ReservesWethEther":"0.56163045307392072"},{"Symbol":"USVIRGIN","ISO":"VI","Name":"U.S. Virgin Is.","Active":true,"Marketcap":"1115450262393868908","MarketcapEther":"1.115450262393868908","Price":"1056148789","PriceEther":"0.000000001056148789","TotalSupply":"1056148787000000000000000000","TotalSupplyEther":"1056148787","ReservesWeth":"557725132253083259","ReservesWethEther":"0.557725132253083259"},{"Symbol":"LUXEMBOURG","ISO":"LU","Name":"Luxembourg","Active":true,"Marketcap":"1113917817637571694","MarketcapEther":"1.113917817637571694","Price":"1055423053","PriceEther":"0.000000001055423053","TotalSupply":"1055423050000000000000000000","TotalSupplyEther":"1055423050","ReservesWeth":"556958909346497350","ReservesWethEther":"0.55695890934649735"},{"Symbol":"PITCAIRN","ISO":"PN","Name":"Pitcairn Is.","Active":true,"Marketcap":"1102905445418881802","MarketcapEther":"1.102905445418881802","Price":"1050193053","PriceEther":"0.000000001050193053","TotalSupply":"1050193050000000000000000000","TotalSupplyEther":"1050193050","ReservesWeth":"551452723234537350","ReservesWethEther":"0.55145272323453735"},{"Symbol":"LEBANON","ISO":"LB","Name":"Lebanon","Active":true,"Marketcap":"1084064863179134752","MarketcapEther":"1.084064863179134752","Price":"1041184357","PriceEther":"0.000000001041184357","TotalSupply":"1041184355000000000000000000","TotalSupplyEther":"1041184355","ReservesWeth":"542032432630751723","ReservesWethEther":"0.542032432630751723"},{"Symbol":"MOROCCO","ISO":"MA","Name":"Morocco","Active":true,"Marketcap":"1079788933162944886","MarketcapEther":"1.079788933162944886","Price":"1039128931","PriceEther":"0.000000001039128931","TotalSupply":"1039128929000000000000000000","TotalSupplyEther":"1039128929","ReservesWeth":"539894467620601379","ReservesWethEther":"0.539894467620601379"},{"Symbol":"CANARY","ISO":"IC","Name":"Canary Islands","Active":true,"Marketcap":"1071894752758220548","MarketcapEther":"1.071894752758220548","Price":"1035323503","PriceEther":"0.000000001035323503","TotalSupply":"1035323500000000000000000000","TotalSupplyEther":"1035323500","ReservesWeth":"535947376896772000","ReservesWethEther":"0.535947376896772"},{"Symbol":"MALAYSIA","ISO":"MY","Name":"Malaysia","Active":true,"Marketcap":"1029155419034296415","MarketcapEther":"1.029155419034296415","Price":"1014472977","PriceEther":"0.000000001014472977","TotalSupply":"1014472975000000000000000000","TotalSupplyEther":"1014472975","ReservesWeth":"514577710531621263","ReservesWethEther":"0.514577710531621263"},{"Symbol":"DOMINICANREP","ISO":"DO","Name":"Dominican Rep.","Active":true,"Marketcap":"1025039969697515652","MarketcapEther":"1.025039969697515652","Price":"1012442577","PriceEther":"0.000000001012442577","TotalSupply":"1012442575000000000000000000","TotalSupplyEther":"1012442575","ReservesWeth":"512519985861200463","ReservesWethEther":"0.512519985861200463"},{"Symbol":"SLOVAKIA","ISO":"SK","Name":"Slovakia","Active":true,"Marketcap":"1017274323096032385","MarketcapEther":"1.017274323096032385","Price":"1008600181","PriceEther":"0.000000001008600181","TotalSupply":"1008600179000000000000000000","TotalSupplyEther":"1008600179","ReservesWeth":"508637162556616379","ReservesWethEther":"0.508637162556616379"},{"Symbol":"SURINAME","ISO":"SR","Name":"Suriname","Active":true,"Marketcap":"1013210857843067636","MarketcapEther":"1.013210857843067636","Price":"1006583757","PriceEther":"0.000000001006583757","TotalSupply":"1006583755000000000000000000","TotalSupplyEther":"1006583755","ReservesWeth":"506605429928117523","ReservesWethEther":"0.506605429928117523"},{"Symbol":"CHILE","ISO":"CL","Name":"Chile","Active":true,"Marketcap":"998267222280698419","MarketcapEther":"0.998267222280698419","Price":"999133237","PriceEther":"0.000000000999133237","TotalSupply":"999133234000000000000000000","TotalSupplyEther":"999133234","ReservesWeth":"499133611639915846","ReservesWethEther":"0.499133611639915846"},{"Symbol":"BERMUDA","ISO":"BM","Name":"Bermuda","Active":true,"Marketcap":"977396006515993898","MarketcapEther":"0.977396006515993898","Price":"988633405","PriceEther":"0.000000000988633405","TotalSupply":"988633402000000000000000000","TotalSupplyEther":"988633402","ReservesWeth":"488698003752313606","ReservesWethEther":"0.488698003752313606"},{"Symbol":"NAMIBIA","ISO":"NA","Name":"Namibia","Active":true,"Marketcap":"947784064705680329","MarketcapEther":"0.947784064705680329","Price":"973542021","PriceEther":"0.000000000973542021","TotalSupply":"973542019000000000000000000","TotalSupplyEther":"973542019","ReservesWeth":"473892033326382219","ReservesWethEther":"0.473892033326382219"},{"Symbol":"MAURITANIA","ISO":"MR","Name":"Mauritania","Active":true,"Marketcap":"932712360247189287","MarketcapEther":"0.932712360247189287","Price":"965770347","PriceEther":"0.000000000965770347","TotalSupply":"965770344000000000000000000","TotalSupplyEther":"965770344","ReservesWeth":"466356180606479856","ReservesWethEther":"0.466356180606479856"},{"Symbol":"KYRGYZSTAN","ISO":"KG","Name":"Kyrgyzstan","Active":true,"Marketcap":"904614531122307497","MarketcapEther":"0.904614531122307497","Price":"951112261","PriceEther":"0.000000000951112261","TotalSupply":"951112259000000000000000000","TotalSupplyEther":"951112259","ReservesWeth":"452307266512266059","ReservesWethEther":"0.452307266512266059"},{"Symbol":"JAMAICA","ISO":"JM","Name":"Jamaica","Active":true,"Marketcap":"902678114787187624","MarketcapEther":"0.902678114787187624","Price":"950093741","PriceEther":"0.000000000950093741","TotalSupply":"950093739000000000000000000","TotalSupplyEther":"950093739","ReservesWeth":"451339058343687539","ReservesWethEther":"0.451339058343687539"},{"Symbol":"FALKLAND","ISO":"FK","Name":"Falkland Is.","Active":true,"Marketcap":"894126763573879657","MarketcapEther":"0.894126763573879657","Price":"945582765","PriceEther":"0.000000000945582765","TotalSupply":"945582763000000000000000000","TotalSupplyEther":"945582763","ReservesWeth":"447063382732522611","ReservesWethEther":"0.447063382732522611"},{"Symbol":"STVINCENT","ISO":"VC","Name":"St. Vin. and Gren.","Active":true,"Marketcap":"878366755626662887","MarketcapEther":"0.878366755626662887","Price":"937212227","PriceEther":"0.000000000937212227","TotalSupply":"937212224000000000000000000","TotalSupplyEther":"937212224","ReservesWeth":"439183378281937536","ReservesWethEther":"0.439183378281937536"},{"Symbol":"ANGUILLA","ISO":"AI","Name":"Anguilla","Active":true,"Marketcap":"866684159756089145","MarketcapEther":"0.866684159756089145","Price":"930958733","PriceEther":"0.000000000930958733","TotalSupply":"930958730000000000000000000","TotalSupplyEther":"930958730","ReservesWeth":"433342080343523910","ReservesWethEther":"0.43334208034352391"},{"Symbol":"VENEZUELA","ISO":"VE","Name":"Venezuela","Active":true,"Marketcap":"865710643008454239","MarketcapEther":"0.865710643008454239","Price":"930435729","PriceEther":"0.000000000930435729","TotalSupply":"930435726000000000000000000","TotalSupplyEther":"930435726","ReservesWeth":"432855321969444990","ReservesWethEther":"0.43285532196944499"},{"Symbol":"PANAMA","ISO":"PA","Name":"Panama","Active":true,"Marketcap":"863375368331843140","MarketcapEther":"0.86337536833184314","Price":"929179945","PriceEther":"0.000000000929179945","TotalSupply":"929179943000000000000000000","TotalSupplyEther":"929179943","ReservesWeth":"431687685095101511","ReservesWethEther":"0.431687685095101511"},{"Symbol":"STLUCIA","ISO":"LC","Name":"Saint Lucia","Active":true,"Marketcap":"861426513678859695","MarketcapEther":"0.861426513678859695","Price":"928130657","PriceEther":"0.000000000928130657","TotalSupply":"928130654000000000000000000","TotalSupplyEther":"928130654","ReservesWeth":"430713257303495166","ReservesWethEther":"0.430713257303495166"},{"Symbol":"TURKS","ISO":"TC","Name":"Turks and Caicos Is.","Active":true,"Marketcap":"856695965991259634","MarketcapEther":"0.856695965991259634","Price":"925578721","PriceEther":"0.000000000925578721","TotalSupply":"925578718000000000000000000","TotalSupplyEther":"925578718","ReservesWeth":"428347983458419198","ReservesWethEther":"0.428347983458419198"},{"Symbol":"LATVIA","ISO":"LV","Name":"Latvia","Active":true,"Marketcap":"855436753430199426","MarketcapEther":"0.855436753430199426","Price":"924898241","PriceEther":"0.000000000924898241","TotalSupply":"924898238000000000000000000","TotalSupplyEther":"924898238","ReservesWeth":"427718377177548798","ReservesWethEther":"0.427718377177548798"},{"Symbol":"BURKINAFASO","ISO":"BF","Name":"Burkina Faso","Active":true,"Marketcap":"849449295701701690","MarketcapEther":"0.84944929570170169","Price":"921655737","PriceEther":"0.000000000921655737","TotalSupply":"921655735000000000000000000","TotalSupplyEther":"921655735","ReservesWeth":"424724648772506583","ReservesWethEther":"0.424724648772506583"},{"Symbol":"HAITA","ISO":"HT","Name":"Haiti","Active":true,"Marketcap":"842367413089177619","MarketcapEther":"0.842367413089177619","Price":"917805761","PriceEther":"0.000000000917805761","TotalSupply":"917805759000000000000000000","TotalSupplyEther":"917805759","ReservesWeth":"421183707462394559","ReservesWethEther":"0.421183707462394559"},{"Symbol":"SOUTHAFRICA","ISO":"ZA","Name":"South Africa","Active":true,"Marketcap":"836464001891499498","MarketcapEther":"0.836464001891499498","Price":"914584061","PriceEther":"0.000000000914584061","TotalSupply":"914584058000000000000000000","TotalSupplyEther":"914584058","ReservesWeth":"418232001403041798","ReservesWethEther":"0.418232001403041798"},{"Symbol":"GUYANA","ISO":"GY","Name":"Guyana","Active":true,"Marketcap":"834718036435757260","MarketcapEther":"0.83471803643575726","Price":"913629049","PriceEther":"0.000000000913629049","TotalSupply":"913629046000000000000000000","TotalSupplyEther":"913629046","ReservesWeth":"417359018674693150","ReservesWethEther":"0.41735901867469315"},{"Symbol":"BURUNDI","ISO":"BI","Name":"Burundi","Active":true,"Marketcap":"824429728804152440","MarketcapEther":"0.82442972880415244","Price":"907981129","PriceEther":"0.000000000907981129","TotalSupply":"907981127000000000000000000","TotalSupplyEther":"907981127","ReservesWeth":"412214865310057319","ReservesWethEther":"0.412214865310057319"},{"Symbol":"LIECHTENSTEIN","ISO":"LI","Name":"Liechtenstein","Active":true,"Marketcap":"823330631914467870","MarketcapEther":"0.82333063191446787","Price":"907375685","PriceEther":"0.000000000907375685","TotalSupply":"907375683000000000000000000","TotalSupplyEther":"907375683","ReservesWeth":"411665316864609611","ReservesWethEther":"0.411665316864609611"},{"Symbol":"SERBIA","ISO":"RS","Name":"Serbia","Active":true,"Marketcap":"814433535392961816","MarketcapEther":"0.814433535392961816","Price":"902459715","PriceEther":"0.000000000902459715","TotalSupply":"902459713000000000000000000","TotalSupplyEther":"902459713","ReservesWeth":"407216768598940611","ReservesWethEther":"0.407216768598940611"},{"Symbol":"COSTARICA","ISO":"CR","Name":"Costa Rica","Active":true,"Marketcap":"811600756089876807","MarketcapEther":"0.811600756089876807","Price":"900888871","PriceEther":"0.000000000900888871","TotalSupply":"900888869000000000000000000","TotalSupplyEther":"900888869","ReservesWeth":"405800378945827319","ReservesWethEther":"0.405800378945827319"},{"Symbol":"MARTINIQUE","ISO":"MQ","Name":"Martinique","Active":true,"Marketcap":"807297987521626403","MarketcapEther":"0.807297987521626403","Price":"898497629","PriceEther":"0.000000000898497629","TotalSupply":"898497627000000000000000000","TotalSupplyEther":"898497627","ReservesWeth":"403648994659310819","ReservesWethEther":"0.403648994659310819"},{"Symbol":"HUNGARY","ISO":"HU","Name":"Hungary","Active":true,"Marketcap":"801598432429527663","MarketcapEther":"0.801598432429527663","Price":"895320297","PriceEther":"0.000000000895320297","TotalSupply":"895320295000000000000000000","TotalSupplyEther":"895320295","ReservesWeth":"400799217110084103","ReservesWethEther":"0.400799217110084103"},{"Symbol":"SEYCHELLES","ISO":"SC","Name":"Seychelles","Active":true,"Marketcap":"794569771153690652","MarketcapEther":"0.794569771153690652","Price":"891386433","PriceEther":"0.000000000891386433","TotalSupply":"891386431000000000000000000","TotalSupplyEther":"891386431","ReservesWeth":"397284886468231743","ReservesWethEther":"0.397284886468231743"},{"Symbol":"TUNISIA","ISO":"TN","Name":"Tunisia","Active":true,"Marketcap":"792876205984609284","MarketcapEther":"0.792876205984609284","Price":"890435965","PriceEther":"0.000000000890435965","TotalSupply":"890435963000000000000000000","TotalSupplyEther":"890435963","ReservesWeth":"396438103882740611","ReservesWethEther":"0.396438103882740611"},{"Symbol":"UGANDA","ISO":"UG","Name":"Uganda","Active":true,"Marketcap":"789823113979204905","MarketcapEther":"0.789823113979204905","Price":"888719931","PriceEther":"0.000000000888719931","TotalSupply":"888719929000000000000000000","TotalSupplyEther":"888719929","ReservesWeth":"394911557878322379","ReservesWethEther":"0.394911557878322379"},{"Symbol":"BOSTWANA","ISO":"BW","Name":"Botswana","Active":true,"Marketcap":"784745745326313804","MarketcapEther":"0.784745745326313804","Price":"885858763","PriceEther":"0.000000000885858763","TotalSupply":"885858760000000000000000000","TotalSupplyEther":"885858760","ReservesWeth":"392372873106086320","ReservesWethEther":"0.39237287310608632"},{"Symbol":"KUWAIT","ISO":"KW","Name":"Kuwait","Active":true,"Marketcap":"783067413322498296","MarketcapEther":"0.783067413322498296","Price":"884910965","PriceEther":"0.000000000884910965","TotalSupply":"884910962000000000000000000","TotalSupplyEther":"884910962","ReservesWeth":"391533707103704646","ReservesWethEther":"0.391533707103704646"},{"Symbol":"SLOVENIA","ISO":"SI","Name":"Slovenia","Active":true,"Marketcap":"780075741018890212","MarketcapEther":"0.780075741018890212","Price":"883218967","PriceEther":"0.000000000883218967","TotalSupply":"883218964000000000000000000","TotalSupplyEther":"883218964","ReservesWeth":"390037870951054576","ReservesWethEther":"0.390037870951054576"},{"Symbol":"NEPAL","ISO":"NP","Name":"Nepal","Active":true,"Marketcap":"779221058156625124","MarketcapEther":"0.779221058156625124","Price":"882734989","PriceEther":"0.000000000882734989","TotalSupply":"882734986000000000000000000","TotalSupplyEther":"882734986","ReservesWeth":"389610529519680070","ReservesWethEther":"0.38961052951968007"},{"Symbol":"LIBYA","ISO":"LY","Name":"Libya","Active":true,"Marketcap":"777194283570371680","MarketcapEther":"0.77719428357037168","Price":"881586233","PriceEther":"0.000000000881586233","TotalSupply":"881586230000000000000000000","TotalSupplyEther":"881586230","ReservesWeth":"388597142225978910","ReservesWethEther":"0.38859714222597891"},{"Symbol":"AUSTRIA","ISO":"AT","Name":"Austria","Active":true,"Marketcap":"768463795564766183","MarketcapEther":"0.768463795564766183","Price":"876620669","PriceEther":"0.000000000876620669","TotalSupply":"876620667000000000000000000","TotalSupplyEther":"876620667","ReservesWeth":"384231898659003779","ReservesWethEther":"0.384231898659003779"},{"Symbol":"CYRPUS","ISO":"CY","Name":"Cyprus","Active":true,"Marketcap":"766315081552937261","MarketcapEther":"0.766315081552937261","Price":"875394245","PriceEther":"0.000000000875394245","TotalSupply":"875394242000000000000000000","TotalSupplyEther":"875394242","ReservesWeth":"383157541214165766","ReservesWethEther":"0.383157541214165766"},{"Symbol":"UZBEKISTAN","ISO":"UZ","Name":"Uzbekistan","Active":true,"Marketcap":"765171757598613111","MarketcapEther":"0.765171757598613111","Price":"874740967","PriceEther":"0.000000000874740967","TotalSupply":"874740965000000000000000000","TotalSupplyEther":"874740965","ReservesWeth":"382585879674047543","ReservesWethEther":"0.382585879674047543"},{"Symbol":"MOZAMBIQUE","ISO":"MZ","Name":"Mozambique","Active":true,"Marketcap":"763846734390311366","MarketcapEther":"0.763846734390311366","Price":"873983259","PriceEther":"0.000000000873983259","TotalSupply":"873983256000000000000000000","TotalSupplyEther":"873983256","ReservesWeth":"381923367632147280","ReservesWethEther":"0.38192336763214728"},{"Symbol":"ARMENIA","ISO":"AM","Name":"Armenia","Active":true,"Marketcap":"758372010272007180","MarketcapEther":"0.75837201027200718","Price":"870845573","PriceEther":"0.000000000870845573","TotalSupply":"870845571000000000000000000","TotalSupplyEther":"870845571","ReservesWeth":"379186006006849163","ReservesWethEther":"0.379186006006849163"},{"Symbol":"MYANMAR","ISO":"MM","Name":"Myanmar","Active":true,"Marketcap":"755465402264641206","MarketcapEther":"0.755465402264641206","Price":"869175129","PriceEther":"0.000000000869175129","TotalSupply":"869175126000000000000000000","TotalSupplyEther":"869175126","ReservesWeth":"377732701566908190","ReservesWethEther":"0.37773270156690819"},{"Symbol":"ZIMBABWE","ISO":"ZW","Name":"Zimbabwe","Active":true,"Marketcap":"754736465413734292","MarketcapEther":"0.754736465413734292","Price":"868755701","PriceEther":"0.000000000868755701","TotalSupply":"868755698000000000000000000","TotalSupplyEther":"868755698","ReservesWeth":"377368233141244998","ReservesWethEther":"0.377368233141244998"},{"Symbol":"LAOS","ISO":"LA","Name":"Lao PDR","Active":true,"Marketcap":"754175111268153620","MarketcapEther":"0.75417511126815362","Price":"868432561","PriceEther":"0.000000000868432561","TotalSupply":"868432559000000000000000000","TotalSupplyEther":"868432559","ReservesWeth":"377087556502509359","ReservesWethEther":"0.377087556502509359"},{"Symbol":"GABON","ISO":"GA","Name":"Gabon","Active":true,"Marketcap":"753892357896792764","MarketcapEther":"0.753892357896792764","Price":"868269751","PriceEther":"0.000000000868269751","TotalSupply":"868269748000000000000000000","TotalSupplyEther":"868269748","ReservesWeth":"376946179382531248","ReservesWethEther":"0.376946179382531248"},{"Symbol":"BULGARIA","ISO":"BG","Name":"Bulgaria","Active":true,"Marketcap":"750443117473440058","MarketcapEther":"0.750443117473440058","Price":"866281201","PriceEther":"0.000000000866281201","TotalSupply":"866281199000000000000000000","TotalSupplyEther":"866281199","ReservesWeth":"375221559603001199","ReservesWethEther":"0.375221559603001199"},{"Symbol":"LESOTHO","ISO":"LS","Name":"Lesotho","Active":true,"Marketcap":"745321725425350801","MarketcapEther":"0.745321725425350801","Price":"863320177","PriceEther":"0.000000000863320177","TotalSupply":"863320174000000000000000000","TotalSupplyEther":"863320174","ReservesWeth":"372660863144335486","ReservesWethEther":"0.372660863144335486"},{"Symbol":"SUDAN","ISO":"SD","Name":"Sudan","Active":true,"Marketcap":"738747328858957886","MarketcapEther":"0.738747328858957886","Price":"859504119","PriceEther":"0.000000000859504119","TotalSupply":"859504117000000000000000000","TotalSupplyEther":"859504117","ReservesWeth":"369373665288983079","ReservesWethEther":"0.369373665288983079"},{"Symbol":"MONGOLIA","ISO":"MN","Name":"Mongolia","Active":true,"Marketcap":"734797031212368834","MarketcapEther":"0.734797031212368834","Price":"857203029","PriceEther":"0.000000000857203029","TotalSupply":"857203027000000000000000000","TotalSupplyEther":"857203027","ReservesWeth":"367398516463387419","ReservesWethEther":"0.367398516463387419"},{"Symbol":"SINTMARTEEN","ISO":"SX","Name":"Sint Maarten","Active":true,"Marketcap":"730829938778904120","MarketcapEther":"0.73082993877890412","Price":"854885923","PriceEther":"0.000000000854885923","TotalSupply":"854885920000000000000000000","TotalSupplyEther":"854885920","ReservesWeth":"365414969816895040","ReservesWethEther":"0.36541496981689504"},{"Symbol":"URUGUAY","ISO":"UY","Name":"Uruguay","Active":true,"Marketcap":"727306649740144584","MarketcapEther":"0.727306649740144584","Price":"852822755","PriceEther":"0.000000000852822755","TotalSupply":"852822753000000000000000000","TotalSupplyEther":"852822753","ReservesWeth":"363653325722895011","ReservesWethEther":"0.363653325722895011"},{"Symbol":"FRPOLYNESIA","ISO":"PF","Name":"Fr. Polynesia","Active":true,"Marketcap":"725666705871715112","MarketcapEther":"0.725666705871715112","Price":"851860733","PriceEther":"0.000000000851860733","TotalSupply":"851860730000000000000000000","TotalSupplyEther":"851860730","ReservesWeth":"362833353361787910","ReservesWethEther":"0.36283335336178791"},{"Symbol":"FIJI","ISO":"FJ","Name":"Fiji","Active":true,"Marketcap":"724969727522726148","MarketcapEther":"0.724969727522726148","Price":"851451543","PriceEther":"0.000000000851451543","TotalSupply":"851451540000000000000000000","TotalSupplyEther":"851451540","ReservesWeth":"362484864187088880","ReservesWethEther":"0.36248486418708888"},{"Symbol":"CONGOREP","ISO":"CD","Name":"Dem. Rep. Congo","Active":true,"Marketcap":"720778263110305462","MarketcapEther":"0.720778263110305462","Price":"848986611","PriceEther":"0.000000000848986611","TotalSupply":"848986608000000000000000000","TotalSupplyEther":"848986608","ReservesWeth":"360389131979646048","ReservesWethEther":"0.360389131979646048"},{"Symbol":"AZERBAIJAN","ISO":"AZ","Name":"Azerbaijan","Active":true,"Marketcap":"718533463482714962","MarketcapEther":"0.718533463482714962","Price":"847663533","PriceEther":"0.000000000847663533","TotalSupply":"847663531000000000000000000","TotalSupplyEther":"847663531","ReservesWeth":"359266732589021043","ReservesWethEther":"0.359266732589021043"},{"Symbol":"ANGOLA","ISO":"AO","Name":"Angola","Active":true,"Marketcap":"717149417138715717","MarketcapEther":"0.717149417138715717","Price":"846846751","PriceEther":"0.000000000846846751","TotalSupply":"846846748000000000000000000","TotalSupplyEther":"846846748","ReservesWeth":"358574708992781248","ReservesWethEther":"0.358574708992781248"},{"Symbol":"OMAN","ISO":"OM","Name":"Oman","Active":true,"Marketcap":"711723688103803709","MarketcapEther":"0.711723688103803709","Price":"843637179","PriceEther":"0.000000000843637179","TotalSupply":"843637177000000000000000000","TotalSupplyEther":"843637177","ReservesWeth":"355861844895539019","ReservesWethEther":"0.355861844895539019"},{"Symbol":"SRILANKA","ISO":"LK","Name":"Sri Lanka","Active":true,"Marketcap":"710997865245920346","MarketcapEther":"0.710997865245920346","Price":"843206895","PriceEther":"0.000000000843206895","TotalSupply":"843206892000000000000000000","TotalSupplyEther":"843206892","ReservesWeth":"355498933044563616","ReservesWethEther":"0.355498933044563616"},{"Symbol":"ARUBA","ISO":"AW","Name":"Aruba","Active":true,"Marketcap":"710283130308106081","MarketcapEther":"0.710283130308106081","Price":"842782969","PriceEther":"0.000000000842782969","TotalSupply":"842782966000000000000000000","TotalSupplyEther":"842782966","ReservesWeth":"355141565575444510","ReservesWethEther":"0.35514156557544451"},{"Symbol":"SOUTHSUDAN","ISO":"SS","Name":"S. Sudan","Active":true,"Marketcap":"705962378835274240","MarketcapEther":"0.70596237883527424","Price":"840215675","PriceEther":"0.000000000840215675","TotalSupply":"840215673000000000000000000","TotalSupplyEther":"840215673","ReservesWeth":"352981190257852811","ReservesWethEther":"0.352981190257852811"},{"Symbol":"TURKMENISTAN","ISO":"TM","Name":"Turkmenistan","Active":true,"Marketcap":"704023874387364357","MarketcapEther":"0.704023874387364357","Price":"839061307","PriceEther":"0.000000000839061307","TotalSupply":"839061304000000000000000000","TotalSupplyEther":"839061304","ReservesWeth":"352011937613212816","ReservesWethEther":"0.352011937613212816"},{"Symbol":"SENEGAL","ISO":"SN","Name":"Senegal","Active":true,"Marketcap":"700734329808043843","MarketcapEther":"0.700734329808043843","Price":"837098759","PriceEther":"0.000000000837098759","TotalSupply":"837098756000000000000000000","TotalSupplyEther":"837098756","ReservesWeth":"350367165322571280","ReservesWethEther":"0.35036716532257128"},{"Symbol":"MACEDONIA","ISO":"MK","Name":"Macedonia","Active":true,"Marketcap":"698564704881961651","MarketcapEther":"0.698564704881961651","Price":"835801835","PriceEther":"0.000000000835801835","TotalSupply":"835801832000000000000000000","TotalSupplyEther":"835801832","ReservesWeth":"349282352858881776","ReservesWethEther":"0.349282352858881776"},{"Symbol":"GUIANA","ISO":"GF","Name":"French Guiana","Active":true,"Marketcap":"696021372253055159","MarketcapEther":"0.696021372253055159","Price":"834278955","PriceEther":"0.000000000834278955","TotalSupply":"834278952000000000000000000","TotalSupplyEther":"834278952","ReservesWeth":"348010686543667056","ReservesWethEther":"0.348010686543667056"},{"Symbol":"WSAHARA","ISO":"EH","Name":"W. Sahara","Active":true,"Marketcap":"693535289146638645","MarketcapEther":"0.693535289146638645","Price":"832787663","PriceEther":"0.000000000832787663","TotalSupply":"832787660000000000000000000","TotalSupplyEther":"832787660","ReservesWeth":"346767644989713120","ReservesWethEther":"0.34676764498971312"},{"Symbol":"KENYA","ISO":"KE","Name":"Kenya","Active":true,"Marketcap":"688680489129004481","MarketcapEther":"0.688680489129004481","Price":"829867755","PriceEther":"0.000000000829867755","TotalSupply":"829867753000000000000000000","TotalSupplyEther":"829867753","ReservesWeth":"344340245394370011","ReservesWethEther":"0.344340245394370011"},{"Symbol":"DOMINICA","ISO":"DM","Name":"Dominica","Active":true,"Marketcap":"684779425988597978","MarketcapEther":"0.684779425988597978","Price":"827514005","PriceEther":"0.000000000827514005","TotalSupply":"827514002000000000000000000","TotalSupplyEther":"827514002","ReservesWeth":"342389713408056006","ReservesWethEther":"0.342389713408056006"},{"Symbol":"YEMEN","ISO":"YE","Name":"Yemen","Active":true,"Marketcap":"684722273271480830","MarketcapEther":"0.68472227327148083","Price":"827479471","PriceEther":"0.000000000827479471","TotalSupply":"827479469000000000000000000","TotalSupplyEther":"827479469","ReservesWeth":"342361137463219919","ReservesWethEther":"0.342361137463219919"},{"Symbol":"REUNION","ISO":"RE","Name":"Reunion","Active":true,"Marketcap":"683964098330288373","MarketcapEther":"0.683964098330288373","Price":"827021221","PriceEther":"0.000000000827021221","TotalSupply":"827021219000000000000000000","TotalSupplyEther":"827021219","ReservesWeth":"341982049992165419","ReservesWethEther":"0.341982049992165419"},{"Symbol":"ERITREA","ISO":"ER","Name":"Eritrea","Active":true,"Marketcap":"680877281973517490","MarketcapEther":"0.68087728197351749","Price":"825152885","PriceEther":"0.000000000825152885","TotalSupply":"825152883000000000000000000","TotalSupplyEther":"825152883","ReservesWeth":"340438641811911611","ReservesWethEther":"0.340438641811911611"},{"Symbol":"GUATEMALA","ISO":"GT","Name":"Guatemala","Active":true,"Marketcap":"680736131210955109","MarketcapEther":"0.680736131210955109","Price":"825067351","PriceEther":"0.000000000825067351","TotalSupply":"825067348000000000000000000","TotalSupplyEther":"825067348","ReservesWeth":"340368066018011248","ReservesWethEther":"0.340368066018011248"},{"Symbol":"FAEROE","ISO":"FO","Name":"Faeroe Is.","Active":true,"Marketcap":"680722451663024586","MarketcapEther":"0.680722451663024586","Price":"825059061","PriceEther":"0.000000000825059061","TotalSupply":"825059058000000000000000000","TotalSupplyEther":"825059058","ReservesWeth":"340361226244041798","ReservesWethEther":"0.340361226244041798"},{"Symbol":"BENIN","ISO":"BJ","Name":"Benin","Active":true,"Marketcap":"680672473802799272","MarketcapEther":"0.680672473802799272","Price":"825028773","PriceEther":"0.000000000825028773","TotalSupply":"825028770000000000000000000","TotalSupplyEther":"825028770","ReservesWeth":"340336237313913990","ReservesWethEther":"0.34033623731391399"},{"Symbol":"SOLOMON","ISO":"SB","Name":"Solomon Is.","Active":true,"Marketcap":"674513939522176642","MarketcapEther":"0.674513939522176642","Price":"821287977","PriceEther":"0.000000000821287977","TotalSupply":"821287975000000000000000000","TotalSupplyEther":"821287975","ReservesWeth":"337256970582376263","ReservesWethEther":"0.337256970582376263"},{"Symbol":"ETHIOPIA","ISO":"ET","Name":"Ethiopia","Active":true,"Marketcap":"674338651921012500","MarketcapEther":"0.6743386519210125","Price":"821181255","PriceEther":"0.000000000821181255","TotalSupply":"821181253000000000000000000","TotalSupplyEther":"821181253","ReservesWeth":"337169326781687511","ReservesWethEther":"0.337169326781687511"},{"Symbol":"GUADELOUPE","ISO":"GP","Name":"Guadeloupe","Active":true,"Marketcap":"673022743881974028","MarketcapEther":"0.673022743881974028","Price":"820379635","PriceEther":"0.000000000820379635","TotalSupply":"820379633000000000000000000","TotalSupplyEther":"820379633","ReservesWeth":"336511372761366611","ReservesWethEther":"0.336511372761366611"},{"Symbol":"SIERRALEONA","ISO":"SL","Name":"Sierra Leone","Active":true,"Marketcap":"664710315981656863","MarketcapEther":"0.664710315981656863","Price":"815297687","PriceEther":"0.000000000815297687","TotalSupply":"815297684000000000000000000","TotalSupplyEther":"815297684","ReservesWeth":"332355158398477296","ReservesWethEther":"0.332355158398477296"},{"Symbol":"CZECHIA","ISO":"CZ","Name":"Czech Rep.","Active":true,"Marketcap":"663959512573803590","MarketcapEther":"0.66395951257380359","Price":"814837109","PriceEther":"0.000000000814837109","TotalSupply":"814837107000000000000000000","TotalSupplyEther":"814837107","ReservesWeth":"331979757101738939","ReservesWethEther":"0.331979757101738939"},{"Symbol":"CAMBODIA","ISO":"KH","Name":"Cambodia","Active":true,"Marketcap":"662251210859382433","MarketcapEther":"0.662251210859382433","Price":"813788187","PriceEther":"0.000000000813788187","TotalSupply":"813788184000000000000000000","TotalSupplyEther":"813788184","ReservesWeth":"331125605836585296","ReservesWethEther":"0.331125605836585296"},{"Symbol":"MONTSERRAT","ISO":"MS","Name":"Montserrat","Active":true,"Marketcap":"661268389437835058","MarketcapEther":"0.661268389437835058","Price":"813184107","PriceEther":"0.000000000813184107","TotalSupply":"813184104000000000000000000","TotalSupplyEther":"813184104","ReservesWeth":"330634195125509616","ReservesWethEther":"0.330634195125509616"},{"Symbol":"IVORYCOAST","ISO":"CI","Name":"Cote d'Ivoire","Active":true,"Marketcap":"659269025299484279","MarketcapEther":"0.659269025299484279","Price":"811953833","PriceEther":"0.000000000811953833","TotalSupply":"811953831000000000000000000","TotalSupplyEther":"811953831","ReservesWeth":"329634513461695943","ReservesWethEther":"0.329634513461695943"},{"Symbol":"BANGLADESH","ISO":"BD","Name":"Bangladesh","Active":true,"Marketcap":"654154321270917105","MarketcapEther":"0.654154321270917105","Price":"808798073","PriceEther":"0.000000000808798073","TotalSupply":"808798071000000000000000000","TotalSupplyEther":"808798071","ReservesWeth":"327077161444256663","ReservesWethEther":"0.327077161444256663"},{"Symbol":"MALDIVES","ISO":"MV","Name":"Maldives","Active":true,"Marketcap":"650177386882865305","MarketcapEther":"0.650177386882865305","Price":"806335779","PriceEther":"0.000000000806335779","TotalSupply":"806335777000000000000000000","TotalSupplyEther":"806335777","ReservesWeth":"325088694247768419","ReservesWethEther":"0.325088694247768419"},{"Symbol":"CAPEVERDE","ISO":"CV","Name":"Cape Verde","Active":true,"Marketcap":"650137760921174368","MarketcapEther":"0.650137760921174368","Price":"806311207","PriceEther":"0.000000000806311207","TotalSupply":"806311205000000000000000000","TotalSupplyEther":"806311205","ReservesWeth":"325068881266898423","ReservesWethEther":"0.325068881266898423"},{"Symbol":"ECUADOR","ISO":"EC","Name":"Ecuador","Active":true,"Marketcap":"645049720106215863","MarketcapEther":"0.645049720106215863","Price":"803149875","PriceEther":"0.000000000803149875","TotalSupply":"803149873000000000000000000","TotalSupplyEther":"803149873","ReservesWeth":"322524860856257811","ReservesWethEther":"0.322524860856257811"},{"Symbol":"MALAWI","ISO":"MW","Name":"Malawi","Active":true,"Marketcap":"644772512196198355","MarketcapEther":"0.644772512196198355","Price":"802977281","PriceEther":"0.000000000802977281","TotalSupply":"802977279000000000000000000","TotalSupplyEther":"802977279","ReservesWeth":"322386256901076479","ReservesWethEther":"0.322386256901076479"},{"Symbol":"TRINIDAD","ISO":"TT","Name":"Trinidad and Tobago","Active":true,"Marketcap":"643096741783864334","MarketcapEther":"0.643096741783864334","Price":"801933129","PriceEther":"0.000000000801933129","TotalSupply":"801933127000000000000000000","TotalSupplyEther":"801933127","ReservesWeth":"321548371693865319","ReservesWethEther":"0.321548371693865319"},{"Symbol":"GEORGIA","ISO":"GE","Name":"Georgia","Active":true,"Marketcap":"640727310515713633","MarketcapEther":"0.640727310515713633","Price":"800454441","PriceEther":"0.000000000800454441","TotalSupply":"800454439000000000000000000","TotalSupplyEther":"800454439","ReservesWeth":"320363656058311239","ReservesWethEther":"0.320363656058311239"},{"Symbol":"ANDORRA","ISO":"AD","Name":"Andorra","Active":true,"Marketcap":"640300313621530282","MarketcapEther":"0.640300313621530282","Price":"800187675","PriceEther":"0.000000000800187675","TotalSupply":"800187673000000000000000000","TotalSupplyEther":"800187673","ReservesWeth":"320150157610952811","ReservesWethEther":"0.320150157610952811"},{"Symbol":"BOSNIA","ISO":"BA","Name":"Bosnia and Herz.","Active":true,"Marketcap":"635930630107897743","MarketcapEther":"0.635930630107897743","Price":"797452589","PriceEther":"0.000000000797452589","TotalSupply":"797452587000000000000000000","TotalSupplyEther":"797452587","ReservesWeth":"317965315851401459","ReservesWethEther":"0.317965315851401459"},{"Symbol":"MOLDOVA","ISO":"MD","Name":"Moldova","Active":true,"Marketcap":"635791835476748113","MarketcapEther":"0.635791835476748113","Price":"797365561","PriceEther":"0.000000000797365561","TotalSupply":"797365558000000000000000000","TotalSupplyEther":"797365558","ReservesWeth":"317895918137056798","ReservesWethEther":"0.317895918137056798"},{"Symbol":"TANZANIA","ISO":"TZ","Name":"Tanzania","Active":true,"Marketcap":"634394034972247778","MarketcapEther":"0.634394034972247778","Price":"796488567","PriceEther":"0.000000000796488567","TotalSupply":"796488564000000000000000000","TotalSupplyEther":"796488564","ReservesWeth":"317197017884368176","ReservesWethEther":"0.317197017884368176"},{"Symbol":"ZAMBIA","ISO":"ZM","Name":"Zambia","Active":true,"Marketcap":"634106405382144245","MarketcapEther":"0.634106405382144245","Price":"796307985","PriceEther":"0.000000000796307985","TotalSupply":"796307983000000000000000000","TotalSupplyEther":"796307983","ReservesWeth":"317053203487380111","ReservesWethEther":"0.317053203487380111"},{"Symbol":"CAMEROON","ISO":"CM","Name":"Cameroon","Active":true,"Marketcap":"633565186766790633","MarketcapEther":"0.633565186766790633","Price":"795968083","PriceEther":"0.000000000795968083","TotalSupply":"795968080000000000000000000","TotalSupplyEther":"795968080","ReservesWeth":"316782593781379360","ReservesWethEther":"0.31678259378137936"},{"Symbol":"NAURU","ISO":"NR","Name":"Nauru","Active":true,"Marketcap":"631632181595444764","MarketcapEther":"0.631632181595444764","Price":"794752907","PriceEther":"0.000000000794752907","TotalSupply":"794752905000000000000000000","TotalSupplyEther":"794752905","ReservesWeth":"315816091592475323","ReservesWethEther":"0.315816091592475323"},{"Symbol":"BELIZE","ISO":"BZ","Name":"Belize","Active":true,"Marketcap":"629668311983682116","MarketcapEther":"0.629668311983682116","Price":"793516423","PriceEther":"0.000000000793516423","TotalSupply":"793516421000000000000000000","TotalSupplyEther":"793516421","ReservesWeth":"314834156785357463","ReservesWethEther":"0.314834156785357463"},{"Symbol":"LIBERIA","ISO":"LR","Name":"Liberia","Active":true,"Marketcap":"628456411307142804","MarketcapEther":"0.628456411307142804","Price":"792752429","PriceEther":"0.000000000792752429","TotalSupply":"792752426000000000000000000","TotalSupplyEther":"792752426","ReservesWeth":"314228206049947590","ReservesWethEther":"0.31422820604994759"},{"Symbol":"COMOROS","ISO":"KM","Name":"Comoros","Active":true,"Marketcap":"618339254806396066","MarketcapEther":"0.618339254806396066","Price":"786345507","PriceEther":"0.000000000786345507","TotalSupply":"786345505000000000000000000","TotalSupplyEther":"786345505","ReservesWeth":"309169628189543523","ReservesWethEther":"0.309169628189543523"},{"Symbol":"VANUATU","ISO":"VU","Name":"Vanuatu","Active":true,"Marketcap":"615204620525287127","MarketcapEther":"0.615204620525287127","Price":"784349809","PriceEther":"0.000000000784349809","TotalSupply":"784349806000000000000000000","TotalSupplyEther":"784349806","ReservesWeth":"307602310654818430","ReservesWethEther":"0.30760231065481843"},{"Symbol":"BRUNEI","ISO":"BN","Name":"Brunei","Active":true,"Marketcap":"603834079835923410","MarketcapEther":"0.60383407983592341","Price":"777067617","PriceEther":"0.000000000777067617","TotalSupply":"777067615000000000000000000","TotalSupplyEther":"777067615","ReservesWeth":"301917040695029343","ReservesWethEther":"0.301917040695029343"},{"Symbol":"GAMBIA","ISO":"GM","Name":"Gambia","Active":true,"Marketcap":"602800494177980206","MarketcapEther":"0.602800494177980206","Price":"776402277","PriceEther":"0.000000000776402277","TotalSupply":"776402275000000000000000000","TotalSupplyEther":"776402275","ReservesWeth":"301400247865392363","ReservesWethEther":"0.301400247865392363"},{"Symbol":"DENMARK","ISO":"DK","Name":"Denmark","Active":true,"Marketcap":"589896178848060115","MarketcapEther":"0.589896178848060115","Price":"768046991","PriceEther":"0.000000000768046991","TotalSupply":"768046989000000000000000000","TotalSupplyEther":"768046989","ReservesWeth":"294948090192077039","ReservesWethEther":"0.294948090192077039"},{"Symbol":"GHANA","ISO":"GH","Name":"Ghana","Active":true,"Marketcap":"573606011742081145","MarketcapEther":"0.573606011742081145","Price":"757367819","PriceEther":"0.000000000757367819","TotalSupply":"757367817000000000000000000","TotalSupplyEther":"757367817","ReservesWeth":"286803006628408379","ReservesWethEther":"0.286803006628408379"},{"Symbol":"BHUTAN","ISO":"BT","Name":"Bhutan","Active":true,"Marketcap":"562071371935355391","MarketcapEther":"0.562071371935355391","Price":"749714195","PriceEther":"0.000000000749714195","TotalSupply":"749714192000000000000000000","TotalSupplyEther":"749714192","ReservesWeth":"281035686342534816","ReservesWethEther":"0.281035686342534816"},{"Symbol":"BELARUS","ISO":"BY","Name":"Belarus","Active":true,"Marketcap":"561925643690531995","MarketcapEther":"0.561925643690531995","Price":"749616999","PriceEther":"0.000000000749616999","TotalSupply":"749616997000000000000000000","TotalSupplyEther":"749616997","ReservesWeth":"280962822594882999","ReservesWethEther":"0.280962822594882999"},{"Symbol":"BOLIVIA","ISO":"BO","Name":"Bolivia","Active":true,"Marketcap":"545232613579337166","MarketcapEther":"0.545232613579337166","Price":"738398683","PriceEther":"0.000000000738398683","TotalSupply":"738398681000000000000000000","TotalSupplyEther":"738398681","ReservesWeth":"272616307528067243","ReservesWethEther":"0.272616307528067243"},{"Symbol":"RWANDA","ISO":"RW","Name":"Rwanda","Active":true,"Marketcap":"545057928352309040","MarketcapEther":"0.54505792835230904","Price":"738280387","PriceEther":"0.000000000738280387","TotalSupply":"738280385000000000000000000","TotalSupplyEther":"738280385","ReservesWeth":"272528964914434883","ReservesWethEther":"0.272528964914434883"},{"Symbol":"ANTIGUA","ISO":"AG","Name":"Antigua and Barb.","Active":true,"Marketcap":"531998801401567967","MarketcapEther":"0.531998801401567967","Price":"729382481","PriceEther":"0.000000000729382481","TotalSupply":"729382478000000000000000000","TotalSupplyEther":"729382478","ReservesWeth":"265999401065475198","ReservesWethEther":"0.265999401065475198"},{"Symbol":"TOGO","ISO":"TG","Name":"Togo","Active":true,"Marketcap":"529297880551117927","MarketcapEther":"0.529297880551117927","Price":"727528613","PriceEther":"0.000000000727528613","TotalSupply":"727528610000000000000000000","TotalSupplyEther":"727528610","ReservesWeth":"264648940639323270","ReservesWethEther":"0.26464894063932327"},{"Symbol":"TONGA","ISO":"TO","Name":"Tonga","Active":true,"Marketcap":"527757565383808469","MarketcapEther":"0.527757565383808469","Price":"726469247","PriceEther":"0.000000000726469247","TotalSupply":"726469245000000000000000000","TotalSupplyEther":"726469245","ReservesWeth":"263878783418373503","ReservesWethEther":"0.263878783418373503"},{"Symbol":"TAJIKISTAN","ISO":"TJ","Name":"Tajikistan","Active":true,"Marketcap":"527409809555619669","MarketcapEther":"0.527409809555619669","Price":"726229861","PriceEther":"0.000000000726229861","TotalSupply":"726229859000000000000000000","TotalSupplyEther":"726229859","ReservesWeth":"263704905504039659","ReservesWethEther":"0.263704905504039659"},{"Symbol":"ALGERIA","ISO":"DZ","Name":"Algeria","Active":true,"Marketcap":"525899729689029094","MarketcapEther":"0.525899729689029094","Price":"725189445","PriceEther":"0.000000000725189445","TotalSupply":"725189443000000000000000000","TotalSupplyEther":"725189443","ReservesWeth":"262949865569704011","ReservesWethEther":"0.262949865569704011"},{"Symbol":"CURACO","ISO":"CW","Name":"Curaco","Active":true,"Marketcap":"519874777235660335","MarketcapEther":"0.519874777235660335","Price":"721023425","PriceEther":"0.000000000721023425","TotalSupply":"721023422000000000000000000","TotalSupplyEther":"721023422","ReservesWeth":"259937388978341886","ReservesWethEther":"0.259937388978341886"},{"Symbol":"EQGUINEA","ISO":"GQ","Name":"Eq. Guinea","Active":true,"Marketcap":"508498887662475307","MarketcapEther":"0.508498887662475307","Price":"713091081","PriceEther":"0.000000000713091081","TotalSupply":"713091078000000000000000000","TotalSupplyEther":"713091078","ReservesWeth":"254249444187783198","ReservesWethEther":"0.254249444187783198"},{"Symbol":"MAURITIUS","ISO":"MU","Name":"Mauritius","Active":true,"Marketcap":"508333509618437485","MarketcapEther":"0.508333509618437485","Price":"712975113","PriceEther":"0.000000000712975113","TotalSupply":"712975110000000000000000000","TotalSupplyEther":"712975110","ReservesWeth":"254166755165706270","ReservesWethEther":"0.25416675516570627"},{"Symbol":"PAPUA","ISO":"PG","Name":"Papua New Guinea","Active":true,"Marketcap":"507975169472117849","MarketcapEther":"0.507975169472117849","Price":"712723769","PriceEther":"0.000000000712723769","TotalSupply":"712723767000000000000000000","TotalSupplyEther":"712723767","ReservesWeth":"253987585448782679","ReservesWethEther":"0.253987585448782679"},{"Symbol":"SAOTOME","ISO":"ST","Name":"Sao Tome and Principe","Active":true,"Marketcap":"504414419972646577","MarketcapEther":"0.504414419972646577","Price":"710221389","PriceEther":"0.000000000710221389","TotalSupply":"710221387000000000000000000","TotalSupplyEther":"710221387","ReservesWeth":"252207210696544659","ReservesWethEther":"0.252207210696544659"},{"Symbol":"AFRICANREP","ISO":"CF","Name":"Central African Rep.","Active":true,"Marketcap":"496096190751085464","MarketcapEther":"0.496096190751085464","Price":"704340963","PriceEther":"0.000000000704340963","TotalSupply":"704340961000000000000000000","TotalSupplyEther":"704340961","ReservesWeth":"248048096079883683","ReservesWethEther":"0.248048096079883683"},{"Symbol":"MAYOTTE","ISO":"YT","Name":"Mayotte","Active":true,"Marketcap":"489696688652172529","MarketcapEther":"0.489696688652172529","Price":"699783317","PriceEther":"0.000000000699783317","TotalSupply":"699783314000000000000000000","TotalSupplyEther":"699783314","ReservesWeth":"244848344675977926","ReservesWethEther":"0.244848344675977926"},{"Symbol":"CHINA","ISO":"CN","Name":"China","Active":false,"Marketcap":"0","MarketcapEther":"0.","Price":"0","PriceEther":"0.","TotalSupply":"23207482690235732544272324723","TotalSupplyEther":"23207482690.235732544272324723","ReservesWeth":"0","ReservesWethEther":"0."},{"Symbol":"NORTHKOREA","ISO":"KP","Name":"Dem. Rep. Korea","Active":false,"Marketcap":"0","MarketcapEther":"0.","Price":"0","PriceEther":"0.","TotalSupply":"23041991612953590532454764100","TotalSupplyEther":"23041991612.9535905324547641","ReservesWeth":"0","ReservesWethEther":"0."},{"Symbol":"NEWCALEDONIA","ISO":"NC","Name":"New Caledonia","Active":false,"Marketcap":"0","MarketcapEther":"0.","Price":"0","PriceEther":"0.","TotalSupply":"1010500854000000000000000000","TotalSupplyEther":"1010500854","ReservesWeth":"0","ReservesWethEther":"0."}]

	DD = []

	_ts = [];
	_mc = [];
	_pri = [];
	_eth = [];
	_ctk = [];
	_def = [];
	_topind = 0;
	_topmc = 0;
	_topts = 0;
	_nuked = 0;

	for(i=0;i<CD.length;i++) {
		DD.push({})
		DD[i]._nk = !CD[i].Active;
		DD[i]._cc = CD[i].Symbol;
		DD[i]._cf = getCountryFlag(CD[i].ISO);
		DD[i]._ts = Number(CD[i].TotalSupplyEther);
		DD[i]._mc = Number(CD[i].MarketcapEther);
		DD[i]._pri = Number(CD[i].PriceEther);
		DD[i]._eth = Number(CD[i].ReservesWethEther);
		DD[i]._ctk = Number(CD[i].ReservesWethEther) / Number(CD[i].PriceEther);
		DD[i]._def = 0;
		if(!CD[i].Active) _nuked++;
	}

	for(i=0;i<CD.length;i++) {
		if(DD[i]._mc > _topmc) {
			_topmc = DD[i]._mc;
			_topts = DD[i]._ts;
			_topind = i;
		}
	}

	for(i=0;i<CD.length;i++) {
		let _mul = _topmc / DD[i]._mc;
		if(_mul > 1 && !DD[i]._nk) {
			let _tem = Math.sqrt(_mul);
			DD[i]._def = DD[i]._eth * (_tem - 1);
		}
		else {
			DD[i]._def = 0;
		}
	}


	for(i=0;i<CD.length;i++) {

		$("main-table").innerHTML += `
			<div class="main-tables-rows">
				<div>${i+1} : ${(i<((CD.length-_nuked)/2+1))?CD.length-_nuked-i:0}</div>
				<div>${DD[i]._cf} ${DD[i]._cc}</div>
				<div>${ DD[i]._ts.toLocaleString(undefined,{maximumFractionDigits:0}) }</div>
				<div>${ DD[i]._mc.toLocaleString(undefined,{maximumFractionDigits:4}) } ETH </div>
				<div>${ DD[i]._eth.toLocaleString(undefined,{maximumFractionDigits:4}) } ETH </div>
				<div>+${ DD[i]._def.toLocaleString(undefined,{maximumFractionDigits:4}) } ETH </div>
			</div>
		`;
	}

return;

	WETH = "0x4200000000000000000000000000000000000006";
	DEAD = "0x000000000000000000000000000000000000dead";

	USA = new ethers.Contract("0x3bcb4d6523b98806dca200833723ffb32ba672c5", LPABI, provider);
	LP_USA = new ethers.Contract("0x6955d8d23420fa696f405baa380ea4d8f56f988e", LPABI, provider);

	NICARAGUA = new ethers.Contract("0xbdf7f7da57658a7d02c51bec3fc427e4627aca6f", LPABI, provider);
	LP_NICARAGUA = new ethers.Contract("0x8bc3878e628e11c81a027860130ee4cbf655041c", LPABI, provider);

	ICELAND = new ethers.Contract("0x20cdd480698e618caf36943d9a3ccb1b6f22507c", LPABI, provider);
	LP_ICELAND = new ethers.Contract("0x9851d5c9d3c56b4c42d116bf1ff3d83f36cecb84", LPABI, provider);

	EGYPT = new ethers.Contract("0x3718d6f04f9bb8bfa7df66dcebbb4449d3e49fb9", LPABI, provider);
	LP_EGYPT = new ethers.Contract("0x5ebdfdb197b873b809acf1024429f6274315959c", LPABI, provider);



	_cc = [
		"USA",
		"NICARAGUA",
		"ICELAND",
		"EGYPT"
	];

	__dead = await Promise.all([
		USA.balanceOf(DEAD),
		NICARAGUA.balanceOf(DEAD),
		ICELAND.balanceOf(DEAD),
		EGYPT.balanceOf(DEAD),
	])

	__ts = await Promise.all([
		USA.totalSupply(),
		NICARAGUA.totalSupply(),
		ICELAND.totalSupply(),
		EGYPT.totalSupply(),
	])

	__gr = await Promise.all([
		LP_USA.getReserves(),
		LP_NICARAGUA.getReserves(),
		LP_ICELAND.getReserves(),
		LP_EGYPT.getReserves(),
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
function getCountryFlag(isoCode) {
    if (isoCode.length !== 2) {
        return 'Invalid ISO code';
    }

    const OFFSET = 127397;
    const countryCode = isoCode.toUpperCase();

    let flag = '';
    for (let i = 0; i < countryCode.length; i++) {
        flag += String.fromCodePoint(countryCode.charCodeAt(i) + OFFSET);
    }

    return flag;
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
