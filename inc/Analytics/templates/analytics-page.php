<?php
if (!defined('ABSPATH')) {
    exit;
}

global $wpdb;
$bppiv_is_premium = function_exists('panoramaIsPremium') ? panoramaIsPremium() : false;
$bppiv_upgrade_url = admin_url('edit.php?post_type=bppiv-image-viewer&page=bppiv-support#/pricing');
$bppiv_is_wc_active = class_exists('WooCommerce');
$bppiv_logs_table = $wpdb->prefix . 'bppiv_analytics_logs';
$bppiv_summary_table = $wpdb->prefix . 'bppiv_analytics_summary';

// Handle Date Range Filter (Enforce 7days for Free users)
// Default to 7 Days for everyone (Free and Pro) - a fresh/low-traffic site's chart looks mostly
// empty on a 30-day default, which reads as "broken" rather than "just started."
// phpcs:ignore WordPress.Security.NonceVerification.Recommended
$bppiv_range = isset($_GET['range']) ? sanitize_key($_GET['range']) : '7days';
// phpcs:ignore WordPress.Security.NonceVerification.Recommended
$bppiv_start_date = isset($_GET['start_date']) ? sanitize_text_field(wp_unslash($_GET['start_date'])) : '';
// phpcs:ignore WordPress.Security.NonceVerification.Recommended
$bppiv_end_date = isset($_GET['end_date']) ? sanitize_text_field(wp_unslash($_GET['end_date'])) : '';

if (!$bppiv_is_premium) {
    $bppiv_range = '7days';
}

$bppiv_where_clause = "WHERE 1=1";

if ($bppiv_range === '7days') {
    $bppiv_date_limit = gmdate('Y-m-d H:i:s', strtotime('-7 days'));
    $bppiv_where_clause .= $wpdb->prepare(" AND created_at >= %s", $bppiv_date_limit);
} elseif ($bppiv_range === '15days') {
    $bppiv_date_limit = gmdate('Y-m-d H:i:s', strtotime('-15 days'));
    $bppiv_where_clause .= $wpdb->prepare(" AND created_at >= %s", $bppiv_date_limit);
} elseif ($bppiv_range === '30days') {
    $bppiv_date_limit = gmdate('Y-m-d H:i:s', strtotime('-30 days'));
    $bppiv_where_clause .= $wpdb->prepare(" AND created_at >= %s", $bppiv_date_limit);
} elseif ($bppiv_range === 'custom' && !empty($bppiv_start_date) && !empty($bppiv_end_date)) {
    $bppiv_start_datetime = $bppiv_start_date . ' 00:00:00';
    $bppiv_end_datetime = $bppiv_end_date . ' 23:59:59';
    $bppiv_where_clause .= $wpdb->prepare(" AND created_at >= %s AND created_at <= %s", $bppiv_start_datetime, $bppiv_end_datetime);
}

// Fetch KPI Summaries
// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter
$bppiv_total_views = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$bppiv_logs_table} {$bppiv_where_clause} AND event_type = 'impression'");
$bppiv_total_clicks = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$bppiv_logs_table} {$bppiv_where_clause} AND event_type = 'hotspot_click'");
$bppiv_total_cart = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$bppiv_logs_table} {$bppiv_where_clause} AND event_type = 'cart_click'");
$bppiv_avg_dwell = (float) $wpdb->get_var("SELECT AVG(dwell_time) FROM {$bppiv_logs_table} {$bppiv_where_clause} AND event_type = 'dwell_time' AND dwell_time > 0");
$bppiv_unique_hotspots = (int) $wpdb->get_var("SELECT COUNT(DISTINCT hotspot_label) FROM {$bppiv_logs_table} {$bppiv_where_clause} AND event_type = 'hotspot_click' AND hotspot_label != ''");
// phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter

$bppiv_avg_clicks_per_view = $bppiv_total_views > 0 ? round($bppiv_total_clicks / $bppiv_total_views, 1) : ($bppiv_total_clicks > 0 ? $bppiv_total_clicks : 0);
$bppiv_conversion_rate = $bppiv_total_views > 0 ? min(100, round(($bppiv_total_cart / $bppiv_total_views) * 100, 1)) : ($bppiv_total_cart > 0 ? 100 : 0);

// Top Clicked Hotspots (Always Top 5)
// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter
$bppiv_top_hotspots = $wpdb->get_results("
    SELECT hotspot_label, product_id, COUNT(*) as click_count 
    FROM {$bppiv_logs_table} 
    {$bppiv_where_clause} AND event_type = 'hotspot_click' AND hotspot_label != ''
    GROUP BY hotspot_label, product_id 
    ORDER BY click_count DESC 
    LIMIT 5
");
// phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter

// Product Performance Breakdown Table
// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter
$bppiv_product_stats = $wpdb->get_results("
    SELECT product_id,
           SUM(CASE WHEN event_type = 'impression' THEN 1 ELSE 0 END) as views,
           SUM(CASE WHEN event_type = 'hotspot_click' THEN 1 ELSE 0 END) as clicks,
           SUM(CASE WHEN event_type = 'cart_click' THEN 1 ELSE 0 END) as cart_additions
    FROM {$bppiv_logs_table}
    {$bppiv_where_clause} AND product_id > 0
    GROUP BY product_id
    ORDER BY (SUM(CASE WHEN event_type = 'hotspot_click' THEN 1 ELSE 0 END) + SUM(CASE WHEN event_type = 'impression' THEN 1 ELSE 0 END)) DESC
    LIMIT 20
");
// phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter

// Dynamic Trend Generator (4-Metric: Views, Clicks, Cart Additions, Avg Duration)
// Trend chart now follows the selected Date Range tab instead of a fixed 7-day window.
$bppiv_trend_max_days = 90; // cap so "All Time" / large custom ranges don't flood the bar chart
if ($bppiv_range === '15days') {
    $bppiv_trend_days = 15;
    $bppiv_trend_title = '15-Days Engagement Trend';
} elseif ($bppiv_range === '30days') {
    $bppiv_trend_days = 30;
    $bppiv_trend_title = '30-Days Engagement Trend';
} elseif ($bppiv_range === 'all') {
    $bppiv_trend_days = $bppiv_trend_max_days;
    $bppiv_trend_title = 'Last 90-Days Engagement Trend';
} elseif ($bppiv_range === 'custom' && !empty($bppiv_start_date) && !empty($bppiv_end_date)) {
    $bppiv_custom_days = (int) floor((strtotime($bppiv_end_date) - strtotime($bppiv_start_date)) / DAY_IN_SECONDS) + 1;
    $bppiv_trend_days = max(1, min($bppiv_custom_days, $bppiv_trend_max_days));
    $bppiv_trend_title = 'Engagement Trend (' . gmdate('M d', strtotime($bppiv_start_date)) . ' - ' . gmdate('M d', strtotime($bppiv_end_date)) . ')';
} else {
    $bppiv_trend_days = 7;
    $bppiv_trend_title = '7-Days Engagement Trend';
}

// Anchor end date: custom range ends on the picked end_date, everything else ends "today".
$bppiv_trend_end_date = ($bppiv_range === 'custom' && !empty($bppiv_end_date)) ? $bppiv_end_date : gmdate('Y-m-d');
$bppiv_trend_start_limit = gmdate('Y-m-d 00:00:00', strtotime($bppiv_trend_end_date . ' -' . ($bppiv_trend_days - 1) . ' days'));
$bppiv_trend_end_limit = gmdate('Y-m-d 23:59:59', strtotime($bppiv_trend_end_date));

// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter
$bppiv_raw_daily = $wpdb->get_results($wpdb->prepare("
    SELECT DATE(created_at) as log_date,
           SUM(CASE WHEN event_type = 'impression' THEN 1 ELSE 0 END) as views,
           SUM(CASE WHEN event_type = 'hotspot_click' THEN 1 ELSE 0 END) as clicks,
           SUM(CASE WHEN event_type = 'cart_click' THEN 1 ELSE 0 END) as cart_additions,
           AVG(CASE WHEN event_type = 'dwell_time' AND dwell_time > 0 THEN dwell_time ELSE NULL END) as avg_dwell
    FROM {$bppiv_logs_table}
    WHERE created_at >= %s AND created_at <= %s
    GROUP BY DATE(created_at)
", $bppiv_trend_start_limit, $bppiv_trend_end_limit), OBJECT_K);
// phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter

$bppiv_daily_stats = [];
$bppiv_max_views = 1;
$bppiv_max_clicks = 1;
$bppiv_max_cart = 1;
$bppiv_max_dwell_val = 1;

if ($bppiv_is_premium) {
    // Pro Mode: Real DB Data calculation
    for ($bppiv_i = $bppiv_trend_days - 1; $bppiv_i >= 0; $bppiv_i--) {
        $bppiv_d = gmdate('Y-m-d', strtotime($bppiv_trend_end_date . " -{$bppiv_i} days"));
        $bppiv_v = isset($bppiv_raw_daily[$bppiv_d]) ? (int)$bppiv_raw_daily[$bppiv_d]->views : 0;
        $bppiv_c = isset($bppiv_raw_daily[$bppiv_d]) ? (int)$bppiv_raw_daily[$bppiv_d]->clicks : 0;
        $bppiv_ca = isset($bppiv_raw_daily[$bppiv_d]) ? (int)$bppiv_raw_daily[$bppiv_d]->cart_additions : 0;
        $bppiv_dwell = isset($bppiv_raw_daily[$bppiv_d]) && $bppiv_raw_daily[$bppiv_d]->avg_dwell ? round((float)$bppiv_raw_daily[$bppiv_d]->avg_dwell, 1) : 0;

        if ($bppiv_v > $bppiv_max_views) $bppiv_max_views = $bppiv_v;
        if ($bppiv_c > $bppiv_max_clicks) $bppiv_max_clicks = $bppiv_c;
        if ($bppiv_ca > $bppiv_max_cart) $bppiv_max_cart = $bppiv_ca;
        if ($bppiv_dwell > $bppiv_max_dwell_val) $bppiv_max_dwell_val = $bppiv_dwell;
        
        $bppiv_daily_stats[] = (object) [
            'log_date' => $bppiv_d,
            'views'    => $bppiv_v,
            'clicks'   => $bppiv_c,
            'cart'     => $bppiv_ca,
            'dwell'    => $bppiv_dwell
        ];
    }

    // Fetch Recent Live Activity Stream Logs for Pro Mode
    // phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter
    $bppiv_recent_logs = $wpdb->get_results("
        SELECT event_type, hotspot_label, product_id, created_at, dwell_time
        FROM {$bppiv_logs_table}
        {$bppiv_where_clause}
        ORDER BY created_at DESC
        LIMIT 10
    ");
    // phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter
} else {
    // Free Mode: Full Rich Teaser Demo Data for blurred Pro cards
    $bppiv_max_views = 50;
    $bppiv_max_clicks = 35;
    $bppiv_max_cart = 25;
    $bppiv_max_dwell_val = 90;
    $bppiv_sample_trends = [
        ['v' => 32, 'c' => 22, 'ca' => 12, 'd' => 45],
        ['v' => 45, 'c' => 31, 'ca' => 18, 'd' => 62],
        ['v' => 28, 'c' => 19, 'ca' => 9,  'd' => 38],
        ['v' => 50, 'c' => 35, 'ca' => 24, 'd' => 78],
        ['v' => 39, 'c' => 27, 'ca' => 15, 'd' => 54],
        ['v' => 42, 'c' => 29, 'ca' => 20, 'd' => 68],
        ['v' => 48, 'c' => 34, 'ca' => 22, 'd' => 85],
    ];

    for ($bppiv_i = $bppiv_trend_days - 1; $bppiv_i >= 0; $bppiv_i--) {
        $bppiv_idx = ($bppiv_trend_days - 1) - $bppiv_i;
        $bppiv_d = gmdate('Y-m-d', strtotime($bppiv_trend_end_date . " -{$bppiv_i} days"));
        $bppiv_sample = $bppiv_sample_trends[$bppiv_idx];
        $bppiv_daily_stats[] = (object) [
            'log_date' => $bppiv_d,
            'views'    => $bppiv_sample['v'],
            'clicks'   => $bppiv_sample['c'],
            'cart'     => $bppiv_sample['ca'],
            'dwell'    => $bppiv_sample['d']
        ];
    }

    // 2. Demo Top Clicked Hotspots
    $bppiv_top_hotspots = [
        (object)['hotspot_label' => 'Main 360° Product Spot', 'sample_title' => 'Main 360° Product Spot', 'product_id' => 0, 'click_count' => 38],
        (object)['hotspot_label' => 'Front Angle View', 'sample_title' => 'Front Angle View', 'product_id' => 0, 'click_count' => 26],
        (object)['hotspot_label' => 'Zoom Feature Spot', 'sample_title' => 'Zoom Feature Spot', 'product_id' => 0, 'click_count' => 19],
        (object)['hotspot_label' => 'Side Perspective', 'sample_title' => 'Side Perspective', 'product_id' => 0, 'click_count' => 14],
        (object)['hotspot_label' => 'Interactive Info Spot', 'sample_title' => 'Interactive Info Spot', 'product_id' => 0, 'click_count' => 8],
    ];

    // 3. Demo Product Performance Breakdown Table (WooCommerce vs Standard Content)
    if ($bppiv_is_wc_active) {
        $bppiv_product_stats = [
            (object)['product_id' => 0, 'sample_name' => '360° Leather Sneaker Model A', 'views' => 64, 'clicks' => 42, 'cart_additions' => 18],
            (object)['product_id' => 0, 'sample_name' => '360° Smart Watch Pro Edition', 'views' => 48, 'clicks' => 31, 'cart_additions' => 14],
            (object)['product_id' => 0, 'sample_name' => 'Modern Lounge Chair 360° Tour', 'views' => 35, 'clicks' => 22, 'cart_additions' => 9],
            (object)['product_id' => 0, 'sample_name' => 'Wireless Headphones 360° View', 'views' => 27, 'clicks' => 16, 'cart_additions' => 6],
            (object)['product_id' => 0, 'sample_name' => 'Luxury Designer Handbag 360°', 'views' => 19, 'clicks' => 11, 'cart_additions' => 4],
        ];
    } else {
        $bppiv_product_stats = [
            (object)['product_id' => 0, 'sample_name' => '360° Virtual Showroom Tour', 'views' => 64, 'clicks' => 42, 'cart_additions' => 18],
            (object)['product_id' => 0, 'sample_name' => 'Modern Villa 360° Interior', 'views' => 48, 'clicks' => 31, 'cart_additions' => 14],
            (object)['product_id' => 0, 'sample_name' => 'Automobile 360° View Spot', 'views' => 35, 'clicks' => 22, 'cart_additions' => 9],
            (object)['product_id' => 0, 'sample_name' => 'Interactive Gallery 360°', 'views' => 27, 'clicks' => 16, 'cart_additions' => 6],
            (object)['product_id' => 0, 'sample_name' => 'Panoramic Cityscape View', 'views' => 19, 'clicks' => 11, 'cart_additions' => 4],
        ];
    }

    // 4. Demo Recent Live Activity Stream Logs
    if ($bppiv_is_wc_active) {
        $bppiv_recent_logs = [
            (object)['event_type' => 'hotspot_click', 'hotspot_label' => '360° Hotspot Clicked (Leather Sneaker)', 'product_id' => 0, 'created_at' => current_time('mysql'), 'dwell_time' => 0],
            (object)['event_type' => 'cart_click', 'hotspot_label' => 'Add to Cart Triggered (Smart Watch Pro)', 'product_id' => 0, 'created_at' => gmdate('Y-m-d H:i:s', strtotime('-4 mins')), 'dwell_time' => 0],
            (object)['event_type' => 'dwell_time', 'hotspot_label' => '360° Viewer Session (Lounge Chair)', 'product_id' => 0, 'created_at' => gmdate('Y-m-d H:i:s', strtotime('-11 mins')), 'dwell_time' => 58],
            (object)['event_type' => 'impression', 'hotspot_label' => 'Panorama Viewer Loaded (Wireless Headphones)', 'product_id' => 0, 'created_at' => gmdate('Y-m-d H:i:s', strtotime('-22 mins')), 'dwell_time' => 0],
            (object)['event_type' => 'hotspot_click', 'hotspot_label' => 'Zoom Feature Click (Designer Handbag)', 'product_id' => 0, 'created_at' => gmdate('Y-m-d H:i:s', strtotime('-35 mins')), 'dwell_time' => 0],
        ];
    } else {
        $bppiv_recent_logs = [
            (object)['event_type' => 'hotspot_click', 'hotspot_label' => '360° Hotspot Clicked (Virtual Showroom)', 'product_id' => 0, 'created_at' => current_time('mysql'), 'dwell_time' => 0],
            (object)['event_type' => 'hotspot_click', 'hotspot_label' => 'Info Hotspot Clicked (Modern Villa)', 'product_id' => 0, 'created_at' => gmdate('Y-m-d H:i:s', strtotime('-4 mins')), 'dwell_time' => 0],
            (object)['event_type' => 'dwell_time', 'hotspot_label' => '360° Viewer Session (Automobile View)', 'product_id' => 0, 'created_at' => gmdate('Y-m-d H:i:s', strtotime('-11 mins')), 'dwell_time' => 58],
            (object)['event_type' => 'impression', 'hotspot_label' => 'Panorama Viewer Loaded (Interactive Gallery)', 'product_id' => 0, 'created_at' => gmdate('Y-m-d H:i:s', strtotime('-22 mins')), 'dwell_time' => 0],
            (object)['event_type' => 'hotspot_click', 'hotspot_label' => 'Zoom Feature Click (Cityscape View)', 'product_id' => 0, 'created_at' => gmdate('Y-m-d H:i:s', strtotime('-35 mins')), 'dwell_time' => 0],
        ];
    }
}

// Build the per-day bar heights (each metric as a % of its own max within the selected range).
// The bar row keeps a fixed per-day width no matter how many days are in range (see the CSS) -
// wide ranges (30/90 days) simply overflow the card and scroll horizontally instead of being
// squeezed to fit, so the bars never shrink into an unreadable blur.
$bppiv_show_cart = ($bppiv_is_wc_active && $bppiv_is_premium);
$bppiv_trend_points = [];

foreach (array_values($bppiv_daily_stats) as $bppiv_stat) {
    $bppiv_trend_points[] = [
        'date'       => $bppiv_stat->log_date,
        'views'      => (int) $bppiv_stat->views,
        'clicks'     => (int) $bppiv_stat->clicks,
        'cart'       => (int) $bppiv_stat->cart,
        'dwell'      => (float) $bppiv_stat->dwell,
        'pct_views'  => min(100, round(($bppiv_stat->views / $bppiv_max_views) * 100, 2)),
        'pct_clicks' => min(100, round(($bppiv_stat->clicks / $bppiv_max_clicks) * 100, 2)),
        'pct_cart'   => min(100, round(($bppiv_stat->cart / $bppiv_max_cart) * 100, 2)),
        'pct_dwell'  => min(100, round(($bppiv_stat->dwell / $bppiv_max_dwell_val) * 100, 2)),
    ];
}

// Only turn on the fixed-width + horizontal-scroll behavior once there are actually more bars
// than comfortably fit (matches the "7 Days" preset). Below that, bars stay plain flex:1 -
// free to grow AND shrink to whatever width exactly fills the card - so there is no overflow
// mechanism active at all for a short range, and therefore no way for a scrollbar to appear.
$bppiv_trend_scrollable = count($bppiv_trend_points) > 7;

// Bar colors. "Clicks" uses a deeper violet (not the KPI card's #8b5cf6) - validated against
// the blue "Views" bar for color-vision-deficiency separation (they were confusable at ~0.7 ΔE).
$bppiv_c_views  = '#146ef5';
$bppiv_c_clicks = '#4a3aa7';
$bppiv_c_cart   = '#10b981';
$bppiv_c_dwell  = '#f59e0b';
?>

<style id="bppiv-skeleton-critical-css">
    /* Prevent Flash of Unstyled Content (FOUC) */
    .bppiv-analytics-wrap {
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.25s ease-in-out;
    }
    .bppiv-analytics-loaded {
        visibility: visible !important;
        opacity: 1 !important;
    }

    /* Soft Blurred Wave Skeleton Loading Screen */
    .bppiv-skeleton-screen {
        max-width: 1240px;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .bppiv-skel-box {
        background: linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 35%, #cbd5e1 50%, #e2e8f0 65%, #f1f5f9 100%);
        background-size: 200% 100%;
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        animation: bppivWave 1.6s ease-in-out infinite;
        filter: blur(0.5px);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
    }
    @keyframes bppivWave {
        0% { background-position: 180% 0; }
        100% { background-position: -180% 0; }
    }
    .bppiv-skel-grid-4 {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
    }
    .bppiv-skel-grid-2 {
        display: grid;
        grid-template-columns: 1.8fr 1.2fr;
        gap: 16px;
    }
    @media screen and (max-width: 768px) {
        .bppiv-skel-grid-4 { grid-template-columns: repeat(2, 1fr); }
        .bppiv-skel-grid-2 { grid-template-columns: 1fr; }
    }
</style>

<div id="bppiv-analytics-skeleton" class="bppiv-skeleton-screen">
    <div class="bppiv-skel-box" style="height: 72px; border-top: 4px solid #146ef5;"></div>
    <div class="bppiv-skel-grid-4">
        <div class="bppiv-skel-box" style="height: 90px;"></div>
        <div class="bppiv-skel-box" style="height: 90px;"></div>
        <div class="bppiv-skel-box" style="height: 90px;"></div>
        <div class="bppiv-skel-box" style="height: 90px;"></div>
    </div>
    <div class="bppiv-skel-grid-2">
        <div class="bppiv-skel-box" style="height: 260px;"></div>
        <div class="bppiv-skel-box" style="height: 260px;"></div>
    </div>
    <div class="bppiv-skel-box" style="height: 200px;"></div>
</div>

<script id="bppiv-skeleton-loader-js">
    (function() {
        function showAnalytics() {
            var skel = document.getElementById('bppiv-analytics-skeleton');
            var wrap = document.querySelector('.bppiv-analytics-wrap');
            if (wrap) {
                wrap.classList.add('bppiv-analytics-loaded');
            }
            if (skel) {
                skel.style.display = 'none';
            }
        }
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(showAnalytics, 30);
        } else {
            document.addEventListener('DOMContentLoaded', showAnalytics);
            window.addEventListener('load', showAnalytics);
        }
    })();
</script>

<div class="wrap bppiv-analytics-wrap">
    
    <!-- Top Header Banner -->
    <div class="bppiv-header-banner">
        <div>
            <h1>360° Interaction Analytics Dashboard</h1>
            <p>
                <?php echo ($bppiv_is_wc_active && $bppiv_is_premium) ? 'Monitor customer engagement, hotspot clicks, view duration, & 360° product sales conversions.' : 'Monitor customer engagement, hotspot interactions, and 360° tour view durations.'; ?>
            </p>
        </div>
        <!-- Date Range Tab Bar Navigation -->
        <div class="bppiv-date-tabs-container">
            <div class="bppiv-date-tabs-wrapper">
                <span class="bppiv-date-tabs-label">Date Range:</span>
                <div class="bppiv-date-tabs">
                
                <!-- 7 Days Tab (Active for Free & Pro) -->
                <a href="<?php echo esc_url(add_query_arg('range', '7days')); ?>" class="bppiv-tab-btn <?php echo $bppiv_range === '7days' ? 'bppiv-tab-active' : ''; ?>">
                    7 Days
                </a>

                <!-- 15 Days Tab -->
                <?php if ($bppiv_is_premium) : ?>
                    <a href="<?php echo esc_url(add_query_arg('range', '15days')); ?>" class="bppiv-tab-btn <?php echo $bppiv_range === '15days' ? 'bppiv-tab-active' : ''; ?>">
                        15 Days
                    </a>
                <?php else : ?>
                    <a href="#" class="bppiv-tab-btn bppiv-tab-locked" title="15 Days Analytics (PRO Feature)">
                        15 Days <span class="bppiv-lock-icon">🔒</span>
                    </a>
                <?php endif; ?>

                <!-- 30 Days Tab -->
                <?php if ($bppiv_is_premium) : ?>
                    <a href="<?php echo esc_url(add_query_arg('range', '30days')); ?>" class="bppiv-tab-btn <?php echo $bppiv_range === '30days' ? 'bppiv-tab-active' : ''; ?>">
                        30 Days
                    </a>
                <?php else : ?>
                    <a href="#" class="bppiv-tab-btn bppiv-tab-locked" title="30 Days Analytics (PRO Feature)">
                        30 Days <span class="bppiv-lock-icon">🔒</span>
                    </a>
                <?php endif; ?>

                <!-- Custom Date Tab -->
                <?php if ($bppiv_is_premium) : ?>
                    <a href="<?php echo esc_url(add_query_arg('range', 'custom')); ?>" class="bppiv-tab-btn <?php echo $bppiv_range === 'custom' ? 'bppiv-tab-active' : ''; ?>">
                        📅 Custom Date
                    </a>
                <?php else : ?>
                    <a href="#" class="bppiv-tab-btn bppiv-tab-locked" title="Custom Date Range Filter (PRO Feature)">
                        📅 Custom <span class="bppiv-lock-icon">🔒</span>
                    </a>
                <?php endif; ?>

                <!-- Export CSV Button -->
                <?php
                $bppiv_export_url = wp_nonce_url(
                    admin_url('admin-post.php?action=bppiv_export_analytics_csv&range=' . urlencode($bppiv_range) . '&start_date=' . urlencode($bppiv_start_date) . '&end_date=' . urlencode($bppiv_end_date)),
                    'bppiv_export_csv'
                );
                ?>
                <?php if ($bppiv_is_premium) : ?>
                    <a href="<?php echo esc_url($bppiv_export_url); ?>" class="bppiv-tab-btn" style="background: #10b981; color: #fff; border-color: #10b981; margin-left: 10px;" title="<?php esc_attr_e('Export Analytics Data as CSV File', 'panorama'); ?>">
                        📥 Export CSV
                    </a>
                <?php else : ?>
                    <a href="#" class="bppiv-tab-btn bppiv-tab-locked" style="background: #f8fafc; color: #64748b; margin-left: 10px;" title="<?php esc_attr_e('Export CSV (PRO Feature)', 'panorama'); ?>">
                        📥 Export CSV <span class="bppiv-lock-icon">🔒</span>
                    </a>
                <?php endif; ?>
            </div>
            </div>

            <!-- Custom Date Picker Form (Pro users only when 'custom' tab is active) -->
            <?php if ($bppiv_is_premium && $bppiv_range === 'custom') : ?>
                <form method="get" class="bppiv-custom-date-form">
                    <input type="hidden" name="post_type" value="bppiv-image-viewer" />
                    <input type="hidden" name="page" value="bppiv-analytics" />
                    <input type="hidden" name="range" value="custom" />
                    
                    <div class="bppiv-custom-date-inputs">
                        <label>From: <input type="date" name="start_date" value="<?php echo esc_attr($bppiv_start_date ? $bppiv_start_date : gmdate('Y-m-d', strtotime('-14 days'))); ?>" required /></label>
                        <label>To: <input type="date" name="end_date" value="<?php echo esc_attr($bppiv_end_date ? $bppiv_end_date : gmdate('Y-m-d')); ?>" required /></label>
                        <button type="submit" class="bppiv-btn-apply-date">Apply Filter</button>
                    </div>
                </form>
            <?php endif; ?>
        </div>
    </div>

    <!-- 4 KPI Summary Cards -->
    <div class="bppiv-kpi-grid">
        
        <!-- Impressions -->
        <div class="bppiv-kpi-card">
            <div class="bppiv-kpi-accent" style="background: #146ef5;"></div>
            <div class="bppiv-kpi-label">360° VIEWER IMPRESSIONS</div>
            <div class="bppiv-kpi-value"><?php echo number_format($bppiv_total_views); ?></div>
            <div class="bppiv-kpi-meta" style="color: #146ef5;">
                <span>👁️</span> <span>Total 360 viewer loads</span>
            </div>
        </div>

        <!-- Hotspot Interactions -->
        <div class="bppiv-kpi-card">
            <div class="bppiv-kpi-accent" style="background: #8b5cf6;"></div>
            <div class="bppiv-kpi-label">HOTSPOT INTERACTIONS</div>
            <div class="bppiv-kpi-value"><?php echo number_format($bppiv_total_clicks); ?></div>
            <div class="bppiv-kpi-meta" style="color: #8b5cf6;">
                <span>🎯</span> <span><?php echo esc_html($bppiv_avg_clicks_per_view); ?> Avg Clicks / View</span>
            </div>
        </div>

        <!-- Card 3: Add to Cart Conversions OR Unique Hotspots Clicked -->
        <div class="bppiv-kpi-card">
            <div class="bppiv-kpi-accent" style="background: #10b981;"></div>
            <div class="bppiv-kpi-label"><?php echo ($bppiv_is_wc_active && $bppiv_is_premium) ? '360° ADD TO CART CLICKS' : 'UNIQUE HOTSPOTS CLICKED'; ?></div>
            <div class="bppiv-kpi-value"><?php echo number_format(($bppiv_is_wc_active && $bppiv_is_premium) ? $bppiv_total_cart : $bppiv_unique_hotspots); ?></div>
            <div class="bppiv-kpi-meta" style="color: #10b981;">
                <span><?php echo ($bppiv_is_wc_active && $bppiv_is_premium) ? '🛒' : '⚡'; ?></span> 
                <span>
                    <?php 
                    if ($bppiv_is_wc_active && $bppiv_is_premium) {
                        echo esc_html($bppiv_conversion_rate . '% Conversion Rate');
                    } else {
                        echo 'Distinct hotspots engaged';
                    }
                    ?>
                </span>
            </div>
        </div>

        <!-- Avg Dwell Time -->
        <div class="bppiv-kpi-card">
            <div class="bppiv-kpi-accent" style="background: #f59e0b;"></div>
            <div class="bppiv-kpi-label">AVG. ENGAGEMENT TIME</div>
            <div class="bppiv-kpi-value"><?php echo esc_html(round($bppiv_avg_dwell, 1)); ?>s</div>
            <div class="bppiv-kpi-meta" style="color: #f59e0b;">
                <span>⏱️</span> <span>Active 360 view duration</span>
            </div>
        </div>
    </div>

    <!-- Charts & Analytics Section -->
    <div class="bppiv-charts-grid">
        
        <!-- Left: 4-Metric 7-Day Engagement Trend Chart -->
        <div class="bppiv-card-box <?php echo !$bppiv_is_premium ? 'bppiv-pro-blur-box' : ''; ?>">
            
            <?php if (!$bppiv_is_premium) : ?>
                <div class="bppiv-pro-overlay">
                    <div class="bppiv-pro-overlay-card">
                        <div class="bppiv-pro-lock-badge">🔒 PRO FEATURE</div>
                        <h4><?php echo esc_html($bppiv_trend_title); ?> Graph</h4>
                        <p>Track daily 360 views, hotspot clicks, cart additions, & engagement duration over time.</p>
                        <a href="<?php echo esc_url($bppiv_upgrade_url); ?>" target="_blank" rel="noopener noreferrer" class="bppiv-btn-upgrade">✨ See Your Growth Trend</a>
                    </div>
                </div>
            <?php endif; ?>

            <div class="bppiv-card-content <?php echo !$bppiv_is_premium ? 'bppiv-pro-blurred' : ''; ?>">
                <div class="bppiv-card-header">
                    <h3>📈 <?php echo esc_html($bppiv_trend_title); ?></h3>
                    <div class="bppiv-chart-legend">
                        <span class="bppiv-legend-item" style="color: #146ef5;">
                            <span class="bppiv-legend-dot" style="background: #146ef5;"></span> Views
                        </span>
                        <span class="bppiv-legend-item" style="color: <?php echo esc_attr($bppiv_c_clicks); ?>;">
                            <span class="bppiv-legend-dot" style="background: <?php echo esc_attr($bppiv_c_clicks); ?>;"></span> Clicks
                        </span>
                        <?php if ($bppiv_show_cart) : ?>
                            <span class="bppiv-legend-item" style="color: #10b981;">
                                 <span class="bppiv-legend-dot" style="background: #10b981;"></span> Cart
                            </span>
                        <?php endif; ?>
                        <span class="bppiv-legend-item" style="color: #f59e0b;">
                            <span class="bppiv-legend-dot" style="background: #f59e0b;"></span> Time(s)
                        </span>
                    </div>
                </div>

                <!-- Fixed per-day bar width (see CSS) - a wide range overflows the card and
                     scrolls horizontally instead of squeezing every bar to fit. -->
                <div class="bppiv-trend-bars-wrap <?php echo $bppiv_trend_scrollable ? 'bppiv-trend-scrollable' : ''; ?>">
                    <div class="bppiv-trend-bars">
                        <?php foreach ($bppiv_trend_points as $bppiv_p) :
                                $bppiv_h_views  = $bppiv_p['views'] > 0 ? max(12, min(100, $bppiv_p['pct_views'])) : 4;
                                $bppiv_h_clicks = $bppiv_p['clicks'] > 0 ? max(12, min(100, $bppiv_p['pct_clicks'])) : 4;
                                $bppiv_h_cart   = $bppiv_p['cart'] > 0 ? max(12, min(100, $bppiv_p['pct_cart'])) : 4;
                                $bppiv_h_dwell  = $bppiv_p['dwell'] > 0 ? max(12, min(100, $bppiv_p['pct_dwell'])) : 4;
                            ?>
                                <div class="bppiv-trend-bar-group">
                                    <div class="bppiv-trend-bar-cols">
                                        <div class="bppiv-trend-bar-col">
                                            <span class="bppiv-trend-bar-val" style="color: <?php echo $bppiv_p['views'] > 0 ? esc_attr($bppiv_c_views) : '#cbd5e1'; ?>;"><?php echo number_format($bppiv_p['views']); ?></span>
                                            <span class="bppiv-trend-bar-fill" style="height: <?php echo esc_attr($bppiv_h_views); ?>%; background: <?php echo esc_attr($bppiv_c_views); ?>;"></span>
                                        </div>
                                        <div class="bppiv-trend-bar-col">
                                            <span class="bppiv-trend-bar-val" style="color: <?php echo $bppiv_p['clicks'] > 0 ? esc_attr($bppiv_c_clicks) : '#cbd5e1'; ?>;"><?php echo number_format($bppiv_p['clicks']); ?></span>
                                            <span class="bppiv-trend-bar-fill" style="height: <?php echo esc_attr($bppiv_h_clicks); ?>%; background: <?php echo esc_attr($bppiv_c_clicks); ?>;"></span>
                                        </div>
                                        <?php if ($bppiv_show_cart) : ?>
                                            <div class="bppiv-trend-bar-col">
                                                <span class="bppiv-trend-bar-val" style="color: <?php echo $bppiv_p['cart'] > 0 ? esc_attr($bppiv_c_cart) : '#cbd5e1'; ?>;"><?php echo number_format($bppiv_p['cart']); ?></span>
                                                <span class="bppiv-trend-bar-fill" style="height: <?php echo esc_attr($bppiv_h_cart); ?>%; background: <?php echo esc_attr($bppiv_c_cart); ?>;"></span>
                                            </div>
                                        <?php endif; ?>
                                        <div class="bppiv-trend-bar-col">
                                            <span class="bppiv-trend-bar-val" style="color: <?php echo $bppiv_p['dwell'] > 0 ? esc_attr($bppiv_c_dwell) : '#cbd5e1'; ?>;"><?php echo esc_html($bppiv_p['dwell']); ?>s</span>
                                            <span class="bppiv-trend-bar-fill" style="height: <?php echo esc_attr($bppiv_h_dwell); ?>%; background: <?php echo esc_attr($bppiv_c_dwell); ?>;"></span>
                                        </div>
                                    </div>

                                    <div class="bppiv-trend-bar-date"><?php echo esc_html(gmdate('M d', strtotime($bppiv_p['date']))); ?></div>

                                    <div class="bppiv-trend-tooltip">
                                        <div class="bppiv-trend-tooltip-date">🗓️ <?php echo esc_html(gmdate('M d, Y', strtotime($bppiv_p['date']))); ?></div>
                                        <div class="bppiv-trend-tooltip-row">
                                            <span><span class="bppiv-trend-tt-key" style="background: <?php echo esc_attr($bppiv_c_views); ?>;"></span>Views</span>
                                            <strong><?php echo number_format($bppiv_p['views']); ?></strong>
                                        </div>
                                        <div class="bppiv-trend-tooltip-row">
                                            <span><span class="bppiv-trend-tt-key" style="background: <?php echo esc_attr($bppiv_c_clicks); ?>;"></span>Hotspot Clicks</span>
                                            <strong><?php echo number_format($bppiv_p['clicks']); ?></strong>
                                        </div>
                                        <?php if ($bppiv_show_cart) : ?>
                                            <div class="bppiv-trend-tooltip-row">
                                                <span><span class="bppiv-trend-tt-key" style="background: <?php echo esc_attr($bppiv_c_cart); ?>;"></span>Cart Additions</span>
                                                <strong><?php echo number_format($bppiv_p['cart']); ?></strong>
                                            </div>
                                        <?php endif; ?>
                                        <div class="bppiv-trend-tooltip-row bppiv-trend-tooltip-row-last">
                                            <span><span class="bppiv-trend-tt-key" style="background: <?php echo esc_attr($bppiv_c_dwell); ?>;"></span>Avg Duration</span>
                                            <strong><?php echo esc_html($bppiv_p['dwell']); ?>s</strong>
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>

        <!-- Right: Top Clicked Hotspots -->
        <div class="bppiv-card-box <?php echo !$bppiv_is_premium ? 'bppiv-pro-blur-box' : ''; ?>">
            
            <?php if (!$bppiv_is_premium) : ?>
                <div class="bppiv-pro-overlay">
                    <div class="bppiv-pro-overlay-card">
                        <div class="bppiv-pro-lock-badge">🔒 PRO FEATURE</div>
                        <h4>Top Clicked Hotspots Breakdown</h4>
                        <p>Discover which specific hotspots & products drive the highest clicks & user interactions.</p>
                        <a href="<?php echo esc_url($bppiv_upgrade_url); ?>" target="_blank" rel="noopener noreferrer" class="bppiv-btn-upgrade">🔥 See Top Performers</a>
                    </div>
                </div>
            <?php endif; ?>

            <div class="bppiv-card-content <?php echo !$bppiv_is_premium ? 'bppiv-pro-blurred' : ''; ?>">
                <div class="bppiv-card-header">
                    <h3>🔥 Top Clicked Hotspots</h3>
                    <span class="bppiv-sub-label">By Click Share</span>
                </div>
                
                <?php if (!empty($bppiv_top_hotspots)) : ?>
                    <div class="bppiv-hotspots-list">
                        <?php 
                        $bppiv_colors = ['#8b5cf6', '#146ef5', '#10b981', '#f59e0b', '#ec4899'];
                        $bppiv_idx = 0;
                        foreach ($bppiv_top_hotspots as $bppiv_spot) : 
                            $bppiv_pct = $bppiv_total_clicks > 0 ? round(($bppiv_spot->click_count / $bppiv_total_clicks) * 100) : 0;
                            $bppiv_product_name = (($bppiv_is_wc_active && $bppiv_is_premium) && $bppiv_spot->product_id) ? get_the_title($bppiv_spot->product_id) : '';
                            $bppiv_c_color = $bppiv_colors[$bppiv_idx % count($bppiv_colors)];
                            $bppiv_idx++;
                        ?>
                            <div>
                                <div class="bppiv-hotspot-item-meta">
                                    <span class="bppiv-hotspot-title">
                                        <span style="width: 8px; height: 8px; border-radius: 0; background: <?php echo esc_attr($bppiv_c_color); ?>; display: inline-block;"></span>
                                        <span><?php echo esc_html($bppiv_spot->hotspot_label); ?></span>
                                        <?php if ($bppiv_product_name) echo '<small style="color:#64748b">(' . esc_html($bppiv_product_name) . ')</small>'; ?>
                                    </span>
                                    <span style="color: <?php echo esc_attr($bppiv_c_color); ?>; font-weight: 700;"><?php echo esc_html($bppiv_spot->click_count); ?> clicks (<?php echo esc_html($bppiv_pct); ?>%)</span>
                                </div>
                                <div class="bppiv-hotspot-progress-bg">
                                    <div class="bppiv-hotspot-progress-fill" style="width: <?php echo esc_attr(max(5, $bppiv_pct)); ?>%; background: <?php echo esc_attr($bppiv_c_color); ?>;"></div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php else : ?>
                    <div class="bppiv-empty-state">
                        No hotspot click interactions recorded yet.
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <!-- Bottom Analytics Section (Stacked Cards) -->
    <div>
        
        <!-- Content / Product Performance Breakdown Table -->
        <div class="bppiv-card-box <?php echo !$bppiv_is_premium ? 'bppiv-pro-blur-box' : ''; ?>">
            
            <?php if (!$bppiv_is_premium) : ?>
                <div class="bppiv-pro-overlay">
                    <div class="bppiv-pro-overlay-card">
                        <div class="bppiv-pro-lock-badge">🔒 PRO FEATURE</div>
                        <h4><?php echo ($bppiv_is_wc_active && $bppiv_is_premium) ? 'Product 360° Sales & Conversion Table' : '360° Content Performance Table'; ?></h4>
                        <p>Get per-product performance data on 360 views, hotspot clicks, cart additions, & conversion rates.</p>
                        <a href="<?php echo esc_url($bppiv_upgrade_url); ?>" target="_blank" rel="noopener noreferrer" class="bppiv-btn-upgrade">🛍️ See Conversion Rates</a>
                    </div>
                </div>
            <?php endif; ?>

            <div class="bppiv-card-content <?php echo !$bppiv_is_premium ? 'bppiv-pro-blurred' : ''; ?>">
                <div class="bppiv-card-header">
                    <h3><?php echo ($bppiv_is_wc_active && $bppiv_is_premium) ? '🛍️ Product 360° Performance Table' : '🖼️ 360° Content Performance Table'; ?></h3>
                </div>
                
                <?php if (!empty($bppiv_product_stats)) : ?>
                    <div class="bppiv-table-scroll">
                        <table class="bppiv-table">
                            <thead>
                                <tr>
                                    <th><?php echo ($bppiv_is_wc_active && $bppiv_is_premium) ? 'WooCommerce Product' : 'Item / Page'; ?></th>
                                    <th>360° Views</th>
                                    <th>Hotspot Clicks</th>
                                    <th><?php echo ($bppiv_is_wc_active && $bppiv_is_premium) ? 'Cart Additions' : 'Total Actions'; ?></th>
                                    <th><?php echo ($bppiv_is_wc_active && $bppiv_is_premium) ? 'Conversion Rate' : 'Action Rate'; ?></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($bppiv_product_stats as $bppiv_p_stat) : 
                                    $bppiv_p_title = get_the_title($bppiv_p_stat->product_id);
                                    $bppiv_p_thumb = get_the_post_thumbnail_url($bppiv_p_stat->product_id, 'thumbnail');
                                    $bppiv_display_title = $bppiv_p_title ? $bppiv_p_title : (isset($bppiv_p_stat->sample_name) ? $bppiv_p_stat->sample_name : (($bppiv_is_wc_active && $bppiv_is_premium) ? "Product #{$bppiv_p_stat->product_id}" : "360° Item #{$bppiv_p_stat->product_id}"));
                                    $bppiv_views_count = (int) $bppiv_p_stat->views;
                                    $bppiv_clicks_count = (int) $bppiv_p_stat->clicks;
                                    $bppiv_display_views = $bppiv_views_count > 0 ? $bppiv_views_count : $bppiv_clicks_count;
                                    $bppiv_actions_count = ($bppiv_is_wc_active && $bppiv_is_premium) ? $bppiv_p_stat->cart_additions : ($bppiv_p_stat->clicks);
                                    $bppiv_p_rate = min(100, round(($bppiv_actions_count / max($bppiv_display_views, 1)) * 100, 1));
                                ?>
                                    <tr>
                                        <td style="display: flex; align-items: center; gap: 10px; font-weight: 600; color: #0f172a;">
                                            <?php if ($bppiv_p_thumb) : ?>
                                                <img src="<?php echo esc_url($bppiv_p_thumb); ?>" style="width: 28px; height: 28px; object-fit: cover; border-radius: 0; border: 1px solid #e2e8f0;" />
                                            <?php else : ?>
                                                <div style="width: 28px; height: 28px; background: #e2e8f0; border-radius: 0; display: flex; align-items: center; justify-content: center; font-size: 11px;"><?php echo ($bppiv_is_wc_active && $bppiv_is_premium) ? '🛍️' : '🖼️'; ?></div>
                                            <?php endif; ?>
                                            <span><?php echo esc_html($bppiv_display_title); ?></span>
                                        </td>
                                        <td style="font-weight: 600; color: #146ef5;"><?php echo number_format($bppiv_display_views); ?></td>
                                        <td style="font-weight: 600; color: #8b5cf6;"><?php echo number_format($bppiv_p_stat->clicks); ?></td>
                                        <td style="font-weight: 600; color: #10b981;"><?php echo number_format($bppiv_actions_count); ?></td>
                                        <td style="font-weight: 700; color: #0f172a;"><?php echo esc_html($bppiv_p_rate); ?>%</td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php else : ?>
                    <div class="bppiv-empty-state">
                        No performance data available yet.
                    </div>
                <?php endif; ?>
            </div>
        </div>

        <!-- Recent Activity Stream -->
        <div class="bppiv-card-box <?php echo !$bppiv_is_premium ? 'bppiv-pro-blur-box' : ''; ?>">
            
            <?php if (!$bppiv_is_premium) : ?>
                <div class="bppiv-pro-overlay">
                    <div class="bppiv-pro-overlay-card">
                        <div class="bppiv-pro-lock-badge">🔒 PRO FEATURE</div>
                        <h4>Real-time Live Activity Stream</h4>
                        <p>Monitor live interactions, view sessions, and customer activity stream in real-time.</p>
                        <a href="<?php echo esc_url($bppiv_upgrade_url); ?>" target="_blank" rel="noopener noreferrer" class="bppiv-btn-upgrade">⚡ Watch Live Stream</a>
                    </div>
                </div>
            <?php endif; ?>

            <div class="bppiv-card-content <?php echo !$bppiv_is_premium ? 'bppiv-pro-blurred' : ''; ?>">
                <div class="bppiv-card-header">
                    <h3>⚡ Live Activity Stream</h3>
                </div>
                
                <?php if (!empty($bppiv_recent_logs)) : ?>
                    <div class="bppiv-activity-stream">
                        <?php foreach ($bppiv_recent_logs as $bppiv_log) : 
                            $bppiv_badge_bg = '#146ef5';
                            $bppiv_badge_label = 'Impression';
                            if ($bppiv_log->event_type === 'hotspot_click') {
                                $bppiv_badge_bg = '#8b5cf6';
                                $bppiv_badge_label = 'Hotspot Click';
                            } elseif ($bppiv_log->event_type === 'cart_click') {
                                $bppiv_badge_bg = '#10b981';
                                $bppiv_badge_label = 'Add to Cart';
                            } elseif ($bppiv_log->event_type === 'dwell_time') {
                                $bppiv_badge_bg = '#f59e0b';
                                $bppiv_badge_label = 'View Duration (' . $bppiv_log->dwell_time . 's)';
                            }
                        ?>
                            <div class="bppiv-activity-item">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <span class="bppiv-activity-badge" style="background: <?php echo esc_attr($bppiv_badge_bg); ?>;">
                                        <?php echo esc_html($bppiv_badge_label); ?>
                                    </span>
                                    <span style="font-weight: 600; color: #0f172a;">
                                        <?php echo esc_html($bppiv_log->hotspot_label ? $bppiv_log->hotspot_label : (($bppiv_is_wc_active && $bppiv_log->product_id) ? get_the_title($bppiv_log->product_id) : '360° Viewer')); ?>
                                    </span>
                                </div>
                                <div style="color: #64748b; font-size: 12px; font-weight: 500;">
                                    <?php echo esc_html(human_time_diff(strtotime($bppiv_log->created_at), current_time('timestamp')) . ' ago'); ?>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php else : ?>
                    <div class="bppiv-empty-state">
                        No recent activity stream logged yet.
                    </div>
                <?php endif; ?>
            </div>
        </div>

    </div>
</div>

<!-- Pro Feature Lock Modal -->
<div id="bppiv-pro-date-modal" class="bppiv-modal-overlay" style="display: none;">
    <div class="bppiv-modal-card">
        <button type="button" class="bppiv-modal-close-btn bppiv-modal-close">&times;</button>
        <div class="bppiv-modal-header">
            <span class="bppiv-modal-lock-badge">🔒 PRO FEATURE</span>
            <h2>Unlock Extended Date Range Analytics</h2>
            <p>Filtering analytics by 15 Days, 30 Days, All Time, or Custom Dates is available exclusively on <strong>Panorama 360° Pro</strong>.</p>
        </div>
        <div class="bppiv-modal-body">
            <ul class="bppiv-modal-feature-list">
                <li><span class="bppiv-check">✓</span> <span><strong>Custom Date Selection:</strong> Pick any past date range to analyze campaigns.</span></li>
                <li><span class="bppiv-check">✓</span> <span><strong>Extended History:</strong> Unlimited data retention beyond 7 days.</span></li>
                <li><span class="bppiv-check">✓</span> <span><strong>WooCommerce Revenue Metrics:</strong> Track add-to-cart & sales conversions.</span></li>
                <li><span class="bppiv-check">✓</span> <span><strong>Real-time Stream & Export:</strong> Watch live user sessions and export CSV reports.</span></li>
            </ul>
        </div>
        <div class="bppiv-modal-footer">
            <a href="<?php echo esc_url($bppiv_upgrade_url); ?>" target="_blank" rel="noopener noreferrer" class="bppiv-btn-upgrade-modal">
                ⚡ Upgrade to Pro Now
            </a>
            <button type="button" class="bppiv-btn-close-modal bppiv-modal-close">Dismiss</button>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    var lockedTabs = document.querySelectorAll('.bppiv-tab-locked');
    var modal = document.getElementById('bppiv-pro-date-modal');
    var closeBtns = document.querySelectorAll('.bppiv-modal-close');

    if (lockedTabs && modal) {
        lockedTabs.forEach(function(tab) {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = 'flex';
            });
        });
    }

    if (closeBtns && modal) {
        closeBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
</script>
