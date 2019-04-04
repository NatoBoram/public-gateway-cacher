var hashToTest = "";
const $results = document.querySelector('#results');

function returnHtmlLink(gateway) {
	let gatewayTitle = gateway.split(hashToTest)[0];
	return '<a title="' + gatewayTitle + '" href="' + gateway + '">' + gateway + '</a>';
}

function addNode(gateway, online, title) {
	const para = document.createElement('div');
	let node;
	if (online) {
		node = document.createElement('strong');
		node.innerHTML = '✅ - Online  - ' + returnHtmlLink(gateway);
	} else {
		node = document.createElement('div');
		node.innerText = '❌ - Offline - ' + gateway;
	}
	node.setAttribute('title', title);
	para.appendChild(node);
	$results.appendChild(para);
}

function updateStats(total, checked) {
	document.getElementById('stats').innerText = checked + '/' + total + ' gateways checked';
}

function checkGateways(gateways) {
	const total = gateways.length;
	let checked = 0;
	gateways.forEach((gateway) => {
		const gatewayAndHash = gateway.replace(':hash', hashToTest);
		// opt-out from gateway redirects done by browser extension
		const testUrl = gatewayAndHash + '#x-ipfs-companion-no-redirect';
		fetch(testUrl)
			.then(res => res.text())
			.then((text) => {
				const matched = true; // TODO : Check if the response is good.
				addNode(gatewayAndHash, matched, matched ? 'All good' : 'Output did not match expected output');
				checked++;
				updateStats(total, checked);
			}).catch((err) => {
				window.err = err;
				addNode(gatewayAndHash, false, err);
				checked++;
				updateStats(total, checked);
			});
	});
}

function start() {

	while ($results.lastChild) {
		$results.removeChild($results.lastChild);
	}

	hashToTest = document.querySelector("#input").value;

	fetch('./gateways.json')
		.then(res => res.json())
		.then(gateways => checkGateways(gateways));
}
