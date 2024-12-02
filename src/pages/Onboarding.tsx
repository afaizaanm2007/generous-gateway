import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useOnboardingStore } from "@/store/onboardingStore";
import { FaithStep } from "@/components/onboarding/FaithStep";
import { useToast } from "@/components/ui/use-toast";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

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
      // Here you would typically send the data to your backend
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

  const renderStep = () => {
    switch (steps[currentStep]) {
      case "faith":
        return <FaithStep form={form} />;
      case "nationality":
        return (
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your nationality/origin?</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your nationality" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "location":
        return (
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where are you located?</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "gender":
        return (
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your gender?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "age":
        return (
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your age?</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter your age" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "interests":
        return (
          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What causes interest you?</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange([...field.value, value])}
                    value={field.value[field.value.length - 1]}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your interests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="orphans">Orphans</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="mt-2 flex flex-wrap gap-2">
                  {field.value.map((interest) => (
                    <div
                      key={interest}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {interest}
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
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

export default Onboarding;
