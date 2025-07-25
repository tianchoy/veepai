@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "NAME_SHADOWING", "UNNECESSARY_NOT_NULL_ASSERTION")
package uts.sdk.modules.limeProgress
import android.graphics.Paint
import io.dcloud.uniapp.*
import io.dcloud.uniapp.extapi.*
import io.dcloud.uniapp.framework.*
import io.dcloud.uniapp.runtime.*
import io.dcloud.uniapp.vue.*
import io.dcloud.uniapp.vue.shared.*
import io.dcloud.unicloud.*
import io.dcloud.uts.*
import io.dcloud.uts.Map
import io.dcloud.uts.Set
import io.dcloud.uts.UTSAndroid
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
fun measureText(fontSize: Number, text: String = "￥"): UTSArray<Number> {
    val paint = Paint()
    paint.setTextSize(fontSize.toFloat())
    val textWidth = paint.measureText(text)
    val fontMetrics = paint.getFontMetrics()
    val textHeight = fontMetrics.bottom - fontMetrics.top
    return _uA(
        textWidth,
        textHeight
    )
}
