# theming-experiment

Messing around with emotion styled components, emotion-theming, and context.

This app has a React context instance that manages the current theme (dark or light).

Components individually styled by Emotion automatically recieve a `theme` prop with the currently selected theme colors thanks to the `emotion-theming` package.

Global styles (e.g. `src/app.css`) use CSS custom properties to apply theme styles to elements globally. When a theme is applied while the app is running, we update all the custom properties, and the global styles recognize the change automatically. This update happens in the `src/context/ThemeContext` module. **Custom Property names** in CSS files must match up with the keys in the **`ThemeColors` interface** to work correctly (also located in `ThemeContext` module).
