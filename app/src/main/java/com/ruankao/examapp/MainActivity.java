package com.ruankao.examapp;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private WebView myWebView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        myWebView = (WebView) findViewById(R.id.webview);
        WebSettings webSettings = myWebView.getSettings();

        // 关键设置：允许执行 JS 和使用本地存储 (对题库系统至关重要)
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);

        // 开启自适应功能
        webSettings.setUseWideViewPort(true); // 让 WebView 支持 viewport 标签
        webSettings.setLoadWithOverviewMode(true); // 缩放至屏幕的大小
        webSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.TEXT_AUTOSIZING); // 文本自适应

        // 关键：强制使 WebView 文字缩放比例 100% 同步安卓系统设置
        int textZoom = (int) (getResources().getConfiguration().fontScale * 100);
        webSettings.setTextZoom(textZoom);

        // 允许缩放但隐藏控件，这有助于 WebView 正确计算布局宽度
        webSettings.setSupportZoom(true);
        webSettings.setBuiltInZoomControls(true);
        webSettings.setDisplayZoomControls(false);

        // 解决跨域问题（加载本地资源）
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);

        myWebView.setWebViewClient(new WebViewClient());

        // 加载打包好的本地 index.html
        myWebView.loadUrl("file:///android_asset/index.html");
    }

    // 处理安卓物理返回键：如果网页能返回就返回网页，否则退出
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && myWebView.canGoBack()) {
            myWebView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
