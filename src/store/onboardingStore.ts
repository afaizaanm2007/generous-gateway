import { create } from 'zustand';

interface OnboardingState {
  faith: string;
  nationality: string;
  location: string;
  gender: 'male' | 'female' | undefined;
  age: string;
  setField: (field: keyof Omit<OnboardingState, 'setField'>, value: any) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  faith: '',
  nationality: '',
  location: '',
  gender: undefined,
  age: '',
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));