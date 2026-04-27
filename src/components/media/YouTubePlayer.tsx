import { WebView } from "react-native-webview";

type YouTubePlayerProps = {
  watchUrl: string;
};

export default function YouTubePlayer({ watchUrl }: YouTubePlayerProps) {
  return (
    <WebView
      originWhitelist={["*"]}
      source={{ uri: watchUrl }}
      javaScriptEnabled
      domStorageEnabled
      allowsInlineMediaPlayback
      mediaPlaybackRequiresUserAction={false}
      allowsFullscreenVideo
      style={{ backgroundColor: "#000" }}
    />
  );
}
