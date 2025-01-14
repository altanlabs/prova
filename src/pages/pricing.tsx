import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function PricingPage() {
  const [videoCount, setVideoCount] = useState<number>(0);

  const handleSliderChange = (value: number[]) => {
    setVideoCount(value[0]);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <Card>
        <CardContent>
          <h1 className="text-4xl font-bold mb-8">Pricing</h1>
          <p className="mb-4">Adjust the slider to see how many videos you can upload:</p>
          <Slider
            value={[videoCount]}
            onValueChange={handleSliderChange}
            min={0}
            max={100}
            step={1}
            className="mb-4"
          />
          <p className="text-lg">Videos you can upload: {videoCount === 100 ? '∞' : videoCount}</p>
          <p className="text-lg">Price: 0 €</p>
        </CardContent>
      </Card>
    </div>
  );
}
