
// This file re-exports all data loader functions from the modular structure

export {
  loadClassificationsData,
  loadGlobalGoodFlat,
  loadAllGlobalGoodsFlat,
  loadUseCase,
  loadAllUseCases,
  loadCountriesData,
} from "./loaders";
export { useContentLoader } from "@/hooks/useContentLoader";
