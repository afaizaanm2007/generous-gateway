import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useToast } from "@/hooks/use-toast";
import CauseSelectionStep from "@/components/onboarding/CauseSelectionStep";
import CauseRankingStep from "@/components/onboarding/CauseRankingStep";

const formSchema = z.object({
  selectedCauses: z.array(z.string()).min(1, "Please select at least one cause"),
  rankedCauses: z.array(z.string()),
});

const steps = ["selection", "ranking"] as const;

const InterestsOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const setField = useOnboardingStore((state) => state.setField);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedCauses: [],
      rankedCauses: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (currentStep === 0) {
      setField("selectedCauses", values.selectedCauses);
      form.setValue("rankedCauses", values.selectedCauses);
      setCurrentStep(1);
    } else {
      setField("rankedCauses", values.rankedCauses);
      toast({
        title: "Preferences saved!",
        description: "Your cause preferences have been updated.",
      });
      navigate("/dashboard");
    }
  };

  const renderStep = () => {
    const StepComponents = {
      selection: CauseSelectionStep,
      ranking: CauseRankingStep,
    };

    const CurrentStepComponent = StepComponents[steps[currentStep]];
    return <CurrentStepComponent form={form} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8"
      >
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-full mx-1 rounded-full ${
                  index <= currentStep ? "bg-primary" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(0)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 ml-auto"
              >
                {currentStep === steps.length - 1 ? "Complete" : "Next"}
              </button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default InterestsOnboarding;