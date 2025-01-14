import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

export default function IndexPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [privacy, setPrivacy] = useState("Everyone");
  const [isAd, setIsAd] = useState(false);
  const [videoInfo, setVideoInfo] = useState({
    name: "",
    duration: 0,
    width: 0,
    height: 0,
    format: ""
  });
  const [allowComments, setAllowComments] = useState(true);
  const [allowDuet, setAllowDuet] = useState(true);
  const [allowStitch, setAllowStitch] = useState(true);

  useEffect(() => {
    if (videoFile) {
      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(videoFile);
      videoElement.onloadedmetadata = () => {
        setVideoInfo({
          name: videoFile.name,
          duration: videoElement.duration,
          width: videoElement.videoWidth,
          height: videoElement.videoHeight,
          format: videoFile.type
        });
      };
    }
  }, [videoFile]);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setVideoFile(file);
  };

  const handlePublish = () => {
    // Implement TikTok API integration here
    console.log({
      videoFile,
      caption,
      privacy,
      isAd,
      videoInfo,
      allowComments,
      allowDuet,
      allowStitch
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <Badge variant="secondary" className="mb-8 text-center block">
        TikTok Video Publisher
      </Badge>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Video Preview Section */}
        <div className="flex-1">
          <Card>
            <CardContent>
              <h2 className="text-2xl font-bold mb-4">Video Preview</h2>
              <Input type="file" accept="video/*" onChange={handleVideoUpload} />
              {videoFile && (
                <div className="mt-4">
                  <video
                    className="mx-auto max-w-full h-auto"
                    controls
                    src={URL.createObjectURL(videoFile)}
                  />
                  <div className="mt-4 text-left">
                    <p><strong>File Name:</strong> {videoInfo.name}</p>
                    <p><strong>Duration:</strong> {videoInfo.duration.toFixed(2)} seconds</p>
                    <p><strong>Resolution:</strong> {videoInfo.width}x{videoInfo.height}</p>
                    <p><strong>Format:</strong> {videoInfo.format}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Settings Section */}
        <div className="flex-1">
          <Card>
            <CardContent>
              <h2 className="text-2xl font-bold mb-4">Video Settings</h2>
              <Button size="lg" className="mb-4">
                Log In
              </Button>
              <Input
                type="text"
                placeholder="Enter caption"
                value={caption}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCaption(e.target.value)}
                className="mb-4"
              />
              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-black mb-4"
              >
                <option value="Everyone">Everyone</option>
                <option value="Friends">Friends</option>
                <option value="Only Me">Only Me</option>
              </select>
              <div className="flex items-center justify-start gap-2 mb-4">
                <span>Ad Disclosure</span>
                <Switch checked={isAd} onCheckedChange={(checked) => setIsAd(checked)} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Privacy Settings</h3>
              <div className="flex flex-col items-start gap-2 mb-4">
                <label className="flex items-center gap-2">
                  <Checkbox checked={allowComments} onCheckedChange={(checked) => setAllowComments(checked === true)} />
                  Comments
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox checked={allowDuet} onCheckedChange={(checked) => setAllowDuet(checked === true)} />
                  Duet
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox checked={allowStitch} onCheckedChange={(checked) => setAllowStitch(checked === true)} />
                  Stitch
                </label>
              </div>
              <Button size="lg" onClick={handlePublish}>
                Publish Video
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
