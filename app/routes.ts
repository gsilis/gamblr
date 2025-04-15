import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  layout('./layouts/chrome/chrome.tsx', [
    index('./routes/redirect-user.tsx'),
    layout('./layouts/play/play.tsx', [
      ...prefix('play', [
        index('./routes/picker-router.tsx'),
        route('picker', './routes/game-picker-route.tsx'),
        route(':gameName', './routes/play-route.tsx')
      ]),
      route('pawn-shop', './routes/pawn-shop-route.tsx'),
      route('reset', './routes/reset-route.tsx'),
      route('bank', './routes/bank-route.tsx'),
    ]),
    route('city-picker', './routes/city-picker-route.tsx'),
    route('nuclear-option', './routes/nuclear-option-route.tsx'),
  ])
] satisfies RouteConfig;
