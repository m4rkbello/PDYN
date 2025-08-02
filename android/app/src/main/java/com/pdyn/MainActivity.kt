package com.pdyn

import android.os.Build
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView // ✅ Make sure this is here!

class MainActivity : ReactActivity() {
    override fun getMainComponentName(): String = "PDYN"

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : ReactActivityDelegate(this, mainComponentName) {
            override fun createRootView(): ReactRootView {
                return RNGestureHandlerEnabledRootView(this@MainActivity) // ✅ Use the correct class
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            // Preventing memory leaks on Android 12+
            try {
                Class.forName("android.app.ActivityThread")
                    .getDeclaredMethod("currentActivityThread")
                    .invoke(null)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
        super.onCreate(null)
    }
}
