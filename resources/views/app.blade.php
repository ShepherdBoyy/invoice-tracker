<!DOCTYPE html>
<html data-theme="light">
  <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title>Invoice Tracker</title>

      @viteReactRefresh
      @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])

      @inertiaHead
  </head>

  <body>
      @inertia
  </body>

  <script src="http://localhost:8097"></script>
</html>
