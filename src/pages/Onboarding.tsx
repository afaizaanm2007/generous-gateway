import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useToast } from "@/components/ui/use-toast";
import { FaithStep } from "@/components/onboarding/FaithStep";
import { NationalityStep } from "@/components/onboarding/NationalityStep";
import { LocationStep } from "@/components/onboarding/LocationStep";
import { GenderStep } from "@/components/onboarding/GenderStep";
import { AgeStep } from "@/components/onboarding/AgeStep";
import { InterestsStep } from "@/components/onboarding/InterestsStep";

const formSchema = z.object({
  faith: z.string().min(1, "Please select your faith"),
  nationality: z.string().min(1, "Please enter your nationality"),
  location: z.string().min(1, "Please enter your location"),
  gender: z.enum(["male", "female"], {
    required_error: "Please select your gender",
  }),
  age: z.string().min(1, "Please enter your age"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
});

const steps = ["faith", "nationality", "location", "gender", "age", "interests"] as const;

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const setField = useOnboardingStore((state) => state.setField);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      faith: "",
      nationality: "",
      location: "",
      gender: undefined,
      age: "",
      interests: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const currentField = steps[currentStep];
    setField(currentField, values[currentField]);

    if (currentStep === steps.length - 1) {
      console.log("Form submitted:", values);
      toast({
        title: "Onboarding complete!",
        description: "Welcome to your personalized donation journey.",
      });
      navigate("/dashboard");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    const currentField = steps[currentStep];
    const fieldValue = form.getValues(currentField);
    
    if (fieldValue && fieldValue.length > 0) {
      setField(currentField, fieldValue);
      setCurrentStep((prev) => prev + 1);
    } else {
      form.trigger(currentField);
    }
  };

  const renderStep = () => {
    const StepComponents = {
      faith: FaithStep,
      nationality: NationalityStep,
      location: LocationStep,
      gender: GenderStep,
      age: AgeStep,
      interests: InterestsStep,
    };

    const CurrentStepComponent = StepComponents[steps[currentStep]];
    return <CurrentStepComponent form={form} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
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
          <h2 className="text-2xl font-bold text-gray-900">Donor Onboarding</h2>
          <p className="text-gray-600">Step {currentStep + 1} of {steps.length}</p>
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
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
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

export default Onboarding;