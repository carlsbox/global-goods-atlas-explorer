
// This file re-exports all data loader functions from the new modular structure
// for backward compatibility and ease of migration

export {
  loadClassificationsData,
  loadGlobalGoodFlat,
  loadAllGlobalGoodsFlat,
  loadUseCase,
  loadAllUseCases,
  loadCountriesData,
} from "./loaders";
export { useContentLoader } from "@/hooks/useContentLoader";
