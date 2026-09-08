<?php

namespace BPPIV\Analytics;

if (!defined('ABSPATH')) {
    exit;
}

class AnalyticsManager {
    public function register() {
        // Initialize Database Tables
        add_action('admin_init', [$this, 'create_db_tables_if_needed']);

        // Register REST API Endpoints
        add_action('rest_api_init', [$this, 'register_rest_routes']);

        // Register Admin Menu
        add_action('admin_menu', [$this, 'register_analytics_admin_menu']);

        // Register CSV Export Handler
        add_action('admin_post_bppiv_export_analytics_csv', [$this, 'export_analytics_csv']);
    }

    public function create_db_tables_if_needed() {
        global $wpdb;
        $version_option = 'bppiv_analytics_db_version';
        $current_version = get_option($version_option);

        if ($current_version === '1.0.0') {
            return;
        }

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        $charset_collate = $wpdb->get_charset_collate();

        // 1. Raw Event Logs Table
        $logs_table = $wpdb->prefix . 'bppiv_analytics_logs';
        $sql_logs = "CREATE TABLE {$logs_table} (
            id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            product_id BIGINT(20) UNSIGNED DEFAULT 0,
            tour_id VARCHAR(100) DEFAULT '',
            event_type VARCHAR(30) NOT NULL,
            hotspot_id VARCHAR(100) DEFAULT '',
            hotspot_label VARCHAR(255) DEFAULT '',
            dwell_time INT(11) DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            KEY product_id (product_id),
            KEY event_type (event_type),
            KEY created_at (created_at)
        ) {$charset_collate};";
        dbDelta($sql_logs);

        // 2. Daily Summary Table (Aggregated Stats)
        $summary_table = $wpdb->prefix . 'bppiv_analytics_summary';
        $sql_summary = "CREATE TABLE {$summary_table} (
            id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            product_id BIGINT(20) UNSIGNED DEFAULT 0,
            event_type VARCHAR(30) NOT NULL,
            hotspot_id VARCHAR(100) DEFAULT '',
            hotspot_label VARCHAR(255) DEFAULT '',
            event_date DATE NOT NULL,
            total_count INT(11) DEFAULT 0,
            total_dwell_time INT(11) DEFAULT 0,
            UNIQUE KEY unique_summary (product_id, event_type, hotspot_id, event_date),
            KEY event_date (event_date)
        ) {$charset_collate};";
        dbDelta($sql_summary);

        update_option($version_option, '1.0.0');
    }

    public function register_rest_routes() {
        register_rest_route('bppiv/v1', '/track-analytics', [
            'methods'             => 'POST',
            'callback'            => [$this, 'handle_track_analytics'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function handle_track_analytics(\WP_REST_Request $request) {
        global $wpdb;

        $event_type = sanitize_key($request->get_param('event_type'));
        $product_id = intval($request->get_param('product_id'));
        $tour_id = sanitize_text_field($request->get_param('tour_id'));
        $hotspot_id = sanitize_text_field($request->get_param('hotspot_id'));
        $hotspot_label = sanitize_text_field($request->get_param('hotspot_label'));
        $dwell_time = intval($request->get_param('dwell_time'));

        // 1. Whitelist Valid Event Types
        $valid_events = ['impression', 'hotspot_click', 'cart_click', 'dwell_time'];
        if (!in_array($event_type, $valid_events, true)) {
            return new \WP_REST_Response(['success' => false, 'message' => 'Invalid event type'], 400);
        }

        // 2. Validate Product ID if provided
        if ($product_id > 0 && function_exists('wc_get_product')) {
            $product = wc_get_product($product_id);
            if (!$product) {
                return new \WP_REST_Response(['success' => false, 'message' => 'Invalid product ID'], 400);
            }
        }

        // 3. Insert Raw Log Event
        $table_name = $wpdb->prefix . 'bppiv_analytics_logs';
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
        $inserted = $wpdb->insert(
            $table_name,
            [
                'product_id'    => $product_id,
                'tour_id'       => $tour_id,
                'event_type'    => $event_type,
                'hotspot_id'    => $hotspot_id,
                'hotspot_label' => $hotspot_label,
                'dwell_time'    => $dwell_time,
                'created_at'    => current_time('mysql'),
            ],
            ['%d', '%s', '%s', '%s', '%s', '%d', '%s']
        );

        if ($inserted) {
            return new \WP_REST_Response(['success' => true], 200);
        }

        return new \WP_REST_Response(['success' => false], 500);
    }

    public function register_analytics_admin_menu() {
        $page_hook = add_submenu_page(
            'edit.php?post_type=bppiv-image-viewer',
            esc_html__('Interaction Analytics', 'panorama'),
            '<span style="white-space:nowrap;">' . esc_html__('Analytics', 'panorama') . ' <span style="background:#146ef5;color:#fff;font-size:9px;font-weight:700;padding:2px 6px;border-radius:3px;text-transform:uppercase;line-height:1.2;display:inline-block;vertical-align:middle;margin-left:4px;">NEW</span></span>',
            'manage_options',
            'bppiv-analytics',
            [$this, 'render_analytics_admin_page']
        );
        add_action('admin_print_styles-' . $page_hook, [$this, 'enqueue_analytics_assets']);
    }

    public function enqueue_analytics_assets() {
        wp_enqueue_style('bppiv-analytics-css', BPPIV_PLUGIN_DIR . 'inc/Analytics/assets/css/analytics.css', [], BPPIV_VERSION);
    }

    public function render_analytics_admin_page() {
        wp_enqueue_style('bppiv-analytics-css', BPPIV_PLUGIN_DIR . 'inc/Analytics/assets/css/analytics.css', [], BPPIV_VERSION);
        $template_file = BPPIV_PATH . 'inc/Analytics/templates/analytics-page.php';
        if (file_exists($template_file)) {
            require_once $template_file;
        } else {
            echo '<div class="wrap"><h2>Analytics Template Not Found</h2></div>';
        }
    }

    public function export_analytics_csv() {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('Permission denied', 'panorama'));
        }

        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
        if (!isset($_GET['_wpnonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_GET['_wpnonce'])), 'bppiv_export_csv')) {
            wp_die(esc_html__('Security check failed', 'panorama'));
        }

        global $wpdb;
        $is_premium = function_exists('panoramaIsPremium') ? panoramaIsPremium() : false;
        $logs_table = $wpdb->prefix . 'bppiv_analytics_logs';

        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        $range = isset($_GET['range']) ? sanitize_key($_GET['range']) : '7days';
        $start_date = isset($_GET['start_date']) ? sanitize_text_field(wp_unslash($_GET['start_date'])) : '';
        $end_date = isset($_GET['end_date']) ? sanitize_text_field(wp_unslash($_GET['end_date'])) : '';

        if (!$is_premium) {
            $range = '7days';
        }

        $where_clause = "WHERE 1=1";

        if ($range === '7days') {
            $date_limit = gmdate('Y-m-d H:i:s', strtotime('-7 days'));
            $where_clause .= $wpdb->prepare(" AND created_at >= %s", $date_limit);
        } elseif ($range === '15days') {
            $date_limit = gmdate('Y-m-d H:i:s', strtotime('-15 days'));
            $where_clause .= $wpdb->prepare(" AND created_at >= %s", $date_limit);
        } elseif ($range === '30days') {
            $date_limit = gmdate('Y-m-d H:i:s', strtotime('-30 days'));
            $where_clause .= $wpdb->prepare(" AND created_at >= %s", $date_limit);
        } elseif ($range === 'custom' && !empty($start_date) && !empty($end_date)) {
            $start_datetime = $start_date . ' 00:00:00';
            $end_datetime = $end_date . ' 23:59:59';
            $where_clause .= $wpdb->prepare(" AND created_at >= %s AND created_at <= %s", $start_datetime, $end_datetime);
        }

        // phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter
        $logs = $wpdb->get_results("
            SELECT id, event_type, hotspot_label, product_id, dwell_time, created_at 
            FROM {$logs_table} 
            {$where_clause} 
            ORDER BY created_at DESC 
            LIMIT 5000
        ");
        // phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter

        $filename = 'panorama-analytics-report-' . gmdate('Y-m-d') . '.csv';

        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=' . $filename);

        // Writing directly to the php://output stream (not a real file), so
        // WP_Filesystem is not applicable here.
        // phpcs:disable WordPress.WP.AlternativeFunctions.file_system_operations_fopen, WordPress.WP.AlternativeFunctions.file_system_operations_fputs, WordPress.WP.AlternativeFunctions.file_system_operations_fclose
        $output = fopen('php://output', 'w');

        // Add UTF-8 BOM for Excel compatibility
        fputs($output, "\xEF\xBB\xBF");

        // Header Row
        fputcsv($output, ['ID', 'Event Type', 'Hotspot / Label', 'Product Title / ID', 'Watch Duration (Sec)', 'Date & Time']);

        foreach ($logs as $log) {
            $event_name = ucfirst(str_replace('_', ' ', $log->event_type));
            $label = $log->hotspot_label ? $log->hotspot_label : '360 Viewer';
            $product = $log->product_id > 0 ? (get_the_title($log->product_id) ? get_the_title($log->product_id) : 'Product #' . $log->product_id) : 'N/A';
            $dwell = $log->dwell_time > 0 ? $log->dwell_time : 'N/A';

            fputcsv($output, [
                $log->id,
                $event_name,
                $label,
                $product,
                $dwell,
                $log->created_at
            ]);
        }

        fclose($output);
        // phpcs:enable WordPress.WP.AlternativeFunctions.file_system_operations_fopen, WordPress.WP.AlternativeFunctions.file_system_operations_fputs, WordPress.WP.AlternativeFunctions.file_system_operations_fclose
        exit;
    }
}
