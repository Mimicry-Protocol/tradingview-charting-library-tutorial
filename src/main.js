// Datafeed implementation
import Datafeed from './kaleidoscopeFeed.js';

// Options: https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions
window.tvWidget = new TradingView.widget({
	symbol: 'ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
	interval: '1D',
	fullscreen: true,
	container: 'tv_chart_container',
	datafeed: Datafeed,
	library_path: '../charting_library_cloned_data/charting_library/',
	autosize: true,
	locale: 'en',
	timeframe: '6M',
	custom_font_family: "'Roboto', monospace",
	loading_screen: { backgroundColor: "#ffffff" },
	theme: "light",


	// https://www.tradingview.com/charting-library-docs/latest/customization/Featuresets
	mobile: {
		disabled_features: [
			"left_toolbar", 
			"header_widget", 
			"timeframes_toolbar", 
		],
	},
	disabled_features: [
		"header_symbol_search",
		"symbol_search_hot_key",
		"header_compare",
		"display_market_status",
		"border_around_the_chart",
		"timeframes_toolbar",
		"symbol_info",
	],
	enabled_features: [
		"hide_left_toolbar_by_default",
		"side_toolbar_in_fullscreen_mode",
		"display_legend_on_all_charts",
	],

	// https://www.tradingview.com/charting-library-docs/latest/customization/overrides/chart-overrides
    overrides: {
		"paneProperties.backgroundType": "gradient",
        "paneProperties.backgroundGradientStartColor": "#FFFFFF",
        "paneProperties.backgroundGradientEndColor": "#FFDDEF",
		"paneProperties.horzGridProperties.style": "3",
		"paneProperties.legendProperties.showSeriesTitle": false,
		"paneProperties.legendProperties.showSeriesOHLC": false,
		"paneProperties.legendProperties.showVolume": true,
		"paneProperties.legendProperties.showStudyArguments": false,
		"paneProperties.legendProperties.showStudyTitles": false,
		"paneProperties.legendProperties.showStudyValues": false,
    },

	// https://www.tradingview.com/charting-library-docs/latest/customization/styles/
	// custom_css_url: 'css/style.css',
});
