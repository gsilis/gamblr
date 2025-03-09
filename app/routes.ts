import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout('./components/chrome.tsx', [
    index('./routes/play-route.tsx'),
    route('history', './routes/history-route.tsx')
  ])
] satisfies RouteConfig;
