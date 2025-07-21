package com.pdyn

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView

class MainActivity : ReactActivity() {
    override fun getMainComponentName(): String = "PDYN"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(
            this,
            mainComponentName,
            DefaultNewArchitectureEntryPoint.fabricEnabled
        ) {
            override fun createRootView(): RNGestureHandlerEnabledRootView {
                return RNGestureHandlerEnabledRootView(this@MainActivity)
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)
    }
}