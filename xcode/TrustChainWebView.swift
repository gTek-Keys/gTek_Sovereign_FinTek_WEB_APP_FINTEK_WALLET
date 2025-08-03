// Xcode SwiftUI WebView for TrustChain Capsule NFT Viewer
// Place this in a SwiftUI iOS/macOS project
import SwiftUI
import WebKit

struct TrustChainWebView: UIViewRepresentable {
    let url: URL
    func makeUIView(context: Context) -> WKWebView {
        return WKWebView()
    }
    func updateUIView(_ uiView: WKWebView, context: Context) {
        let request = URLRequest(url: url)
        uiView.load(request)
    }
}

struct TrustChainWebView_Previews: PreviewProvider {
    static var previews: some View {
        TrustChainWebView(url: URL(string: "https://ipfs.io/ipfs/QmSjmKW7is3qdpbev4TUyiquJWXahKekyzrSGq4fsxWdoi")!)
    }
}
