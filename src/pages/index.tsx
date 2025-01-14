import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

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
    <div className="container mx-auto px-4 py-16 space-y-32">
      {/* Video Upload Section */}
      <section className="text-center space-y-6">
        <Badge variant="secondary" className="mb-4">
          TikTok Video Publisher
        </Badge>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Upload and Publish Your Video
        </h1>
        <Button size="lg" className="mt-4 mb-4">
          Log In
        </Button>
        <div className="space-y-4">
          <Input type="file" accept="video/*" onChange={handleVideoUpload} />
          {videoFile && (
            <div>
              <video
                className="mx-auto mt-4 max-w-full h-auto"
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
          <Input
            type="text"
            placeholder="Enter caption"
            value={caption}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCaption(e.target.value)}
          />
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 bg-white text-black"
          >
            <option value="Everyone">Everyone</option>
            <option value="Friends">Friends</option>
            <option value="Only Me">Only Me</option>
          </select>
          <div className="flex items-center justify-center gap-2">
            <span>Ad Disclosure</span>
            <Switch checked={isAd} onCheckedChange={setIsAd} />
          </div>
          <div className="flex flex-col items-start gap-2 mt-4">
            <Checkbox checked={allowComments} onCheckedChange={setAllowComments}>
              Allow Comments
            </Checkbox>
            <Checkbox checked={allowDuet} onCheckedChange={setAllowDuet}>
              Allow Duet
            </Checkbox>
            <Checkbox checked={allowStitch} onCheckedChange={setAllowStitch}>
              Allow Stitch
            </Checkbox>
          </div>
          <Button size="lg" className="mt-4" onClick={handlePublish}>
            Publish Video
          </Button>
        </div>
      </section>
    </div>
  );
}
