# @alcumus/components

A library of React components for Alcumus frontend projects

### Style Guide References

- Typography: https://www.figma.com/file/T0kwdK4X7eJ9Qvm3vPnSCr/Styleguide?node-id=0%3A1
- Colors: https://xd.adobe.com/view/0299ee69-1125-47ac-b851-b8da4051fc87-57ca/screen/4bc88697-7247-4b3f-a670-19a6cb1923ba/variables/

### Contributing to @alcumus/components package

Please consider following when you are contributing to this package:

- If you are adding something new, is that something good for general reuse?
  - If it only is valuable to your frontend project, dont add it to react components package directly, add it to your project first. If the need arises for it to be used on another project, then it should be brought into react-components package

- Allow easy overrides for consumers through properties on your components

- Do not integrate things like redux into react-components package. It notonly adds unpleasant coupling to react component coming from a package but also adds to overall package size and becomes so specific for a use case that is better suited to be handled in your project itself

- Keep components lean and small for consumers to find it friendly enough to work with

- Add tests anytime you make changes to components
  - For new components, make sure to add any and all tests that verify it renders properly
	- If the component just renders static content, maybe you can add snapshot test so that gets validated against the previous version of the content so any unintentional edits are caught

- Add JSDoc comments

- Use classes, no inline styles please. And allow consumer to provide their own class to do easy overrides.

## Hosted Storybook

A hosted version of the Storybook exists here: https://alcumusstyleguide.z13.web.core.windows.net/

### Updating the hosted storybook

1. Build Storybook by doing: `npm run storybook:build` inside `packages/components`
2. Copy `.storybook/build/` directory and put it somewhere on your Desktop
3. Go to https://portal.azure.com, login with your Alcumus Credentials
4. Find and open "alcumusstyleguide" Storage Account
5. Go to "Data storage" > "Containers" in the sidebar
6. Go to "$web", click on "Upload"
7. Select all files copy-pasted in Step 2
8. Check "Overwrite if files already exist"
9. Click Upload