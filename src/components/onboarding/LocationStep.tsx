import React from "react";
import { FormField, FormItem } from "@/components/ui/form";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const LocationStep = ({ form }: any) => {
  const handleLocationChange = (option: any) => {
    form.setValue("location", option.label);
  };

  return (
    <FormField
      control={form.control}
      name="location"
      render={() => (
        <FormItem>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Where are you located?</h2>
            <GooglePlacesAutocomplete
              apiKey={process.env.VITE_GOOGLE_MAPS_API_KEY}
              selectProps={{
                value: form.getValues("location") ? { label: form.getValues("location"), value: form.getValues("location") } : null,
                onChange: handleLocationChange,
                placeholder: "Start typing your location...",
                className: "w-full",
                styles: {
                  control: (provided) => ({
                    ...provided,
                    padding: '4px',
                    borderRadius: '0.375rem',
                    borderColor: '#D1D5DB'
                  })
                }
              }}
            />
            {form.formState.errors.location && (
              <p className="text-red-500">{form.formState.errors.location.message}</p>
            )}
          </div>
        </FormItem>
      )}
    />
  );
};

export default LocationStep;