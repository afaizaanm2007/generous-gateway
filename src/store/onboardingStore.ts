import { create } from 'zustand';

interface OnboardingState {
  faith: string;
  nationality: string;
  location: string;
  gender: 'male' | 'female' | undefined;
  age: string;
  selectedCauses: string[];
  rankedCauses: string[];
  followedNonprofits: string[];
  setField: (field: keyof Omit<OnboardingState, 'setField'>, value: any) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  faith: '',
  nationality: '',
  location: '',
  gender: undefined,
  age: '',
  selectedCauses: [],
  rankedCauses: [],
  followedNonprofits: [],
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));