
# Build Error Prevention Strategy

## React Query V5 Migration Checklist

### Breaking Changes to Watch For:
1. `cacheTime` → `gcTime`
2. `useInfiniteQuery` signature changes
3. `onError`, `onSuccess`, `onSettled` moved to different locations

### Prevention Steps:
1. **Always check React Query documentation** before using new hooks
2. **Use TypeScript strict mode** to catch prop mismatches early
3. **Run type validation scripts** during development
4. **Test component interfaces** before committing changes

## Component Interface Validation

### Required Checks:
1. **Verify component prop interfaces** match what's being passed
2. **Check Lucide React icon props** (use `className` for size, not `size` prop)
3. **Validate FilterBar props** match existing interface
4. **Ensure GlobalGoodCardFlat** receives correct prop names

### Prevention Steps:
1. **Create interface definitions first**, then implement components
2. **Use TypeScript IntelliSense** to verify prop names
3. **Write component tests** that verify prop interfaces
4. **Regular dependency audits** to catch breaking changes

## Type Definition Management

### Best Practices:
1. **Keep type definitions in sync** across all components
2. **Use union types** for flexible data structures
3. **Provide default values** for optional fields
4. **Document required vs optional** properties clearly

### Prevention Steps:
1. **Regular type validation runs** during development
2. **Automated type checking** in CI/CD pipeline
3. **Component interface documentation** for each major component
4. **Migration guides** for major type changes

## Development Workflow

### Before Making Changes:
1. Run `npm run type-check` 
2. Verify component interfaces in TypeScript
3. Check for deprecated properties in dependencies
4. Test hybrid and legacy systems side by side

### After Making Changes:
1. Run full build to catch type errors
2. Test affected pages manually
3. Verify no regression in existing functionality
4. Update documentation if interfaces changed

## Emergency Rollback Plan

### If Build Breaks:
1. **Revert to last working commit**
2. **Identify specific breaking changes**
3. **Fix one issue at a time**
4. **Test each fix in isolation**
5. **Document the resolution**

### Monitoring:
- Set up build alerts for TypeScript errors
- Regular dependency vulnerability scans
- Automated testing for critical user flows
- Component interface regression tests
