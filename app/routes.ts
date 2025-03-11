import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout('./components/chrome/chrome.tsx', [
    index('./routes/play-route.tsx'),
    route('city-picker', './routes/city-picker-route.tsx'),
    route('history', './routes/history-route.tsx'),
    route('nuclear-option', './routes/nuclear-option-route.tsx'),
    route('reset', './routes/reset-route.tsx')
  ])
] satisfies RouteConfig;
