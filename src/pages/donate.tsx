import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>("");

  const handleSliderChange = (value: number[]) => {
    setDonationAmount(value[0]);
    setCustomAmount(""); // Reset custom amount when slider is used
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setDonationAmount(0); // Reset slider amount when custom amount is entered
  };

  const handleDonate = () => {
    const amount = customAmount ? parseFloat(customAmount) : donationAmount;
    console.log(`Donating ${amount} euros`);
    // Implement donation logic here
  };

  return (
    <div className="container mx-auto px-4 py-16 space-y-8">
      <Card>
        <CardContent>
          <h1 className="text-4xl font-bold mb-8">Donate</h1>
          <p className="mb-4">Select an amount to donate:</p>
          <Slider
            value={[donationAmount]}
            onValueChange={handleSliderChange}
            min={0}
            max={20}
            step={1}
            className="mb-4"
          />
          <p className="text-lg mb-4">Selected amount: {donationAmount} €</p>
          <Input
            type="number"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            className="mb-4"
          />
          <Button size="lg" variant="default" onClick={handleDonate}>
            Donate
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
