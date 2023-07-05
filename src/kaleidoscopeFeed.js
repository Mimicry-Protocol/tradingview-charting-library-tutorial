async function makeApiRequest(path) {
	try {
        // ethereum/0x4b15a9c28034dC83db40CD810001427d3BD7163D/floor/chart/5m
		const response = await fetch(`https://api.kaleidoscope.mimicry.org/v1/collections/${path}`);
		const json = await response.json();
		return json;
	} catch (error) {
		throw new Error(`Kaleidoscope request error: ${error.status}`);
	}
}

function resolutionToTimeframe(resolution) {
    switch (resolution) {
        case '5':
            return '5m';
        case '15':
            return '15m';
        case '30':
            return '30m';
        case '60':
            return '1h';
        case '1D':
            return '1d';
        case '1W':
            return '1w';
        default:
            return '1d';
    }
}

const configData = {
	// Represents the resolutions for bars supported by your datafeed
	supported_resolutions: ['5', '15', '30', '60', '1D', '1W'],
    supports_time: true,
};

export default {
    onReady: (callback) => {
        console.log('[onReady]: Method call');
        setTimeout(() => callback(configData));
    },
    searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
        console.log('[searchSymbols]: Method call');
        console.log(userInput, exchange, symbolType);
        onResultReadyCallback();
    },
    resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback, extension) => {
        console.log('[resolveSymbol]: Method call', symbolName);
        
        let metadata;
        try {
            metadata = await makeApiRequest(`${symbolName}`);
        } catch (error) {
            console.log(error);
        }

        // Symbol information object
		const symbolInfo = {
			ticker: symbolName,
			name: metadata.symbol,
			session: '24x7',
			timezone: 'Etc/UTC',
			minmov: 1,
			pricescale: 100,
			has_intraday: true,
			has_no_volume: false,
			has_weekly_and_monthly: true,
			supported_resolutions: configData.supported_resolutions,
			volume_precision: 1,
		};

        console.log('[resolveSymbol]: Symbol resolved', symbolName);
		onSymbolResolvedCallback(symbolInfo);
    },
    getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
        console.log('[getBars]: Method call', symbolInfo);
        console.log('resolution', resolution);

        const { from, to, firstDataRequest } = periodParams;

        try {
            if (firstDataRequest) {
                const data = await makeApiRequest(`${symbolInfo.ticker}/floor/chart/${resolutionToTimeframe(resolution)}`);
                console.log(`[getBars]: returned ${data.iochlv.length} bar(s)`);
                onHistoryCallback(data.iochlv, { noData: false });
            } else {
                onHistoryCallback([], { noData: true });
                return;
            }
            
        } catch (error) {
            console.log('[getBars]: Get error', error);
            onErrorCallback(error);
        }
    },

    // WSS NOT IMPLEMENTED
    subscribeBars: (
        symbolInfo, 
        resolution, 
        onRealtimeCallback, 
        subscriberUID, 
        onResetCacheNeededCallback
    ) => {
        console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
    },
    unsubscribeBars: (subscriberUID) => {
        console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
    },
};