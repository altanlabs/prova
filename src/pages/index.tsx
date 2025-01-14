import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function IndexPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [privacy, setPrivacy] = useState("Everyone");
  const [isAd, setIsAd] = useState(false);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setVideoFile(file);
  };

  const handlePublish = () => {
    // Implement TikTok API integration here
    console.log({ videoFile, caption, privacy, isAd });
  };

  return (
    <div className="container mx-auto px-4 py-16 space-y-32">
      {/* Video Upload Section */}
      <motion.section
        className="text-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Badge variant="secondary" className="mb-4">
          TikTok Video Publisher
        </Badge>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Upload and Publish Your Video
        </h1>
        <div className="space-y-4">
          <Input type="file" accept="video/*" onChange={handleVideoUpload} />
          {videoFile && (
            <video
              className="mx-auto mt-4"
              width="320"
              height="240"
              controls
              src={URL.createObjectURL(videoFile)}
            />
          )}
          <Input
            type="text"
            placeholder="Enter caption"
            value={caption}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCaption(e.target.value)}
          />
          <Select
            value={privacy}
            onValueChange={(value: string) => setPrivacy(value)}
            className="w-full"
          >
            <option value="Everyone">Everyone</option>
            <option value="Friends">Friends</option>
            <option value="Only Me">Only Me</option>
          </Select>
          <div className="flex items-center justify-center gap-2">
            <span>Ad Disclosure</span>
            <Switch checked={isAd} onCheckedChange={setIsAd} />
          </div>
          <Button size="lg" className="mt-4" onClick={handlePublish}>
            Publish Video
          </Button>
        </div>
      </motion.section>
    </div>
  );
}
