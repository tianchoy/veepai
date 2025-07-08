import DCloudUTSFoundation
import DCloudUniappRuntime
import UIKit
import DCloudUTSExtAPI
public typealias LimeClipboardErrorCode = NSNumber
public protocol GeneralCallbackResult : IUniError {
    var errCode: LimeClipboardErrorCode { get set }
}
public typealias SetClipboardDataCompleteCallback = (_ res: UniError) -> Void
public typealias SetClipboardDataFailCallback = (_ res: UniError) -> Void
public typealias SetClipboardDataSuccessCallback = (_ res: UniError) -> Void
@objc(UTSSDKModulesLimeClipboardSetClipboardDataOption)
@objcMembers
public class SetClipboardDataOption : NSObject, UTSObject, IUTSSourceMap {
    public func __$getOriginalPosition() -> UTSSourceMapPosition? {
        return UTSSourceMapPosition("SetClipboardDataOption", "uni_modules/lime-clipboard/utssdk/interface.uts", 25, 13)
    }
    public var showToast: Bool = false
    public var data: String!
    public var complete: SetClipboardDataCompleteCallback?
    public var fail: SetClipboardDataFailCallback?
    public var success: SetClipboardDataSuccessCallback?
    public subscript(_ key: String) -> Any? {
        get {
            return utsSubscriptGetValue(key)
        }
        set {
            switch(key){
                case "showToast":
                    self.showToast = try! utsSubscriptCheckValue(newValue)
                case "data":
                    self.data = try! utsSubscriptCheckValue(newValue)
                case "complete":
                    self.complete = try! utsSubscriptCheckValueIfPresent(newValue)
                case "fail":
                    self.fail = try! utsSubscriptCheckValueIfPresent(newValue)
                case "success":
                    self.success = try! utsSubscriptCheckValueIfPresent(newValue)
                default:
                    break
            }
        }
    }
    public override init() {
        super.init()
    }
    public init(_ obj: UTSJSONObject) {
        self.showToast = (obj["showToast"] as? Bool) ?? false
        self.data = obj["data"] as! String
        self.complete = obj["complete"] as! SetClipboardDataCompleteCallback?
        self.fail = obj["fail"] as! SetClipboardDataFailCallback?
        self.success = obj["success"] as! SetClipboardDataSuccessCallback?
    }
}
@objc(UTSSDKModulesLimeClipboardGetClipboardDataSuccessCallbackOption)
@objcMembers
public class GetClipboardDataSuccessCallbackOption : NSObject, UTSObject, IUTSSourceMap {
    public func __$getOriginalPosition() -> UTSSourceMapPosition? {
        return UTSSourceMapPosition("GetClipboardDataSuccessCallbackOption", "uni_modules/lime-clipboard/utssdk/interface.uts", 36, 13)
    }
    public var data: String!
    public var errMsg: String!
    public subscript(_ key: String) -> Any? {
        get {
            return utsSubscriptGetValue(key)
        }
        set {
            switch(key){
                case "data":
                    self.data = try! utsSubscriptCheckValue(newValue)
                case "errMsg":
                    self.errMsg = try! utsSubscriptCheckValue(newValue)
                default:
                    break
            }
        }
    }
    public override init() {
        super.init()
    }
    public init(_ obj: UTSJSONObject) {
        self.data = obj["data"] as! String
        self.errMsg = obj["errMsg"] as! String
    }
}
public typealias GetClipboardDataCompleteCallback = (_ res: UniError) -> Void
public typealias GetClipboardDataFailCallback = (_ res: UniError) -> Void
public typealias GetClipboardDataSuccessCallback = (_ option: GetClipboardDataSuccessCallbackOption) -> Void
@objc(UTSSDKModulesLimeClipboardGetClipboardDataOption)
@objcMembers
public class GetClipboardDataOption : NSObject, UTSObject, IUTSSourceMap {
    public func __$getOriginalPosition() -> UTSSourceMapPosition? {
        return UTSSourceMapPosition("GetClipboardDataOption", "uni_modules/lime-clipboard/utssdk/interface.uts", 47, 13)
    }
    public var complete: GetClipboardDataCompleteCallback?
    public var fail: GetClipboardDataFailCallback?
    public var success: GetClipboardDataSuccessCallback?
    public subscript(_ key: String) -> Any? {
        get {
            return utsSubscriptGetValue(key)
        }
        set {
            switch(key){
                case "complete":
                    self.complete = try! utsSubscriptCheckValueIfPresent(newValue)
                case "fail":
                    self.fail = try! utsSubscriptCheckValueIfPresent(newValue)
                case "success":
                    self.success = try! utsSubscriptCheckValueIfPresent(newValue)
                default:
                    break
            }
        }
    }
    public override init() {
        super.init()
    }
    public init(_ obj: UTSJSONObject) {
        self.complete = obj["complete"] as! GetClipboardDataCompleteCallback?
        self.fail = obj["fail"] as! GetClipboardDataFailCallback?
        self.success = obj["success"] as! GetClipboardDataSuccessCallback?
    }
}
public var UniErrorSubject = "ClipboardData"
public var UniErrors: Map<LimeClipboardErrorCode, String> = Map([
    [
        9010001,
        "ClipboardData:ok"
    ],
    [
        9010002,
        "ClipboardData:failed"
    ]
])
@objc(UTSSDKModulesLimeClipboardGeneralCallbackResultImpl)
@objcMembers
public class GeneralCallbackResultImpl : UniError, GeneralCallbackResult {
    public init(_ errCode: LimeClipboardErrorCode, _ type: String = "set"){
        super.init()
        self.errSubject = type + UniErrorSubject
        self.errCode = errCode
        self.errMsg = type + (UniErrors[errCode] ?? "")
    }
}
public func setClipboardData(_ options: SetClipboardDataOption) {
    var pasteboard = UIPasteboard.general
    pasteboard.string = options.data
    var res = GeneralCallbackResultImpl(9010001)
    if (options.showToast != false) {
        DCloudUTSExtAPI.showToast(ShowToastOptions(UTSJSONObject([
            "icon": "success",
            "title": "内容已复制"
        ])))
    }
    options.success?(res)
    options.complete?(res)
}
public func getClipboardData(_ options: GetClipboardDataOption) {
    var pasteboard = UIPasteboard.general
    var res = GeneralCallbackResultImpl(9010002, "get")
    if (pasteboard.string == nil) {
        options.fail?(res)
        options.complete?(res)
    } else {
        options.success?(GetClipboardDataSuccessCallbackOption(UTSJSONObject([
            "errMsg": "getClipboardData:ok",
            "data": """
\(pasteboard.string!)
"""
        ])))
        options.complete?(res)
    }
}
@objc(UTSSDKModulesLimeClipboardSetClipboardDataOptionJSONObject)
@objcMembers
public class SetClipboardDataOptionJSONObject : NSObject {
    public var showToast: Bool = false
    public var data: String!
    public var complete: UTSCallback?
    public var fail: UTSCallback?
    public var success: UTSCallback?
}
@objc(UTSSDKModulesLimeClipboardGetClipboardDataOptionJSONObject)
@objcMembers
public class GetClipboardDataOptionJSONObject : NSObject {
    public var complete: UTSCallback?
    public var fail: UTSCallback?
    public var success: UTSCallback?
}
public func setClipboardDataByJs(_ options: SetClipboardDataOptionJSONObject) {
    return setClipboardData(SetClipboardDataOption(UTSJSONObject([
        "showToast": options.showToast,
        "data": options.data,
        "complete": {
        (res: UniError) -> Void in
        options.complete?(res)
        },
        "fail": {
        (res: UniError) -> Void in
        options.fail?(res)
        },
        "success": {
        (res: UniError) -> Void in
        options.success?(res)
        }
    ])))
}
public func getClipboardDataByJs(_ options: GetClipboardDataOptionJSONObject) {
    return getClipboardData(GetClipboardDataOption(UTSJSONObject([
        "complete": {
        (res: UniError) -> Void in
        options.complete?(res)
        },
        "fail": {
        (res: UniError) -> Void in
        options.fail?(res)
        },
        "success": {
        (option: GetClipboardDataSuccessCallbackOption) -> Void in
        options.success?(option)
        }
    ])))
}
@objc(UTSSDKModulesLimeClipboardIndexSwift)
@objcMembers
public class UTSSDKModulesLimeClipboardIndexSwift : NSObject {
    public static func s_setClipboardDataByJs(_ options: SetClipboardDataOptionJSONObject) {
        return setClipboardDataByJs(options)
    }
    public static func s_getClipboardDataByJs(_ options: GetClipboardDataOptionJSONObject) {
        return getClipboardDataByJs(options)
    }
}
