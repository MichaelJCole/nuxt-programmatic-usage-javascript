class ProgrammaticUsage {
  async generateSite() {
    const { resolve } = await import("path");
    const { buildNuxt, loadNuxt } = await import("@nuxt/kit");
    const { defineNuxtConfig } = await import("nuxt/config");

    let nuxt = undefined;

    const config = defineNuxtConfig({
      devtools: { enabled: true },
      ssr: false,
      modules: ["@vite-pwa/nuxt"], // https://vite-pwa-org.netlify.app/frameworks/nuxt
      pwa: {
        manifest: {}, // set to generate manifest.webmanifest
        workbox: {
          navigateFallback: "/",
          globPatterns: ["**/*.{js,css,html,json,ico,png,svg}"], // <== json files included: when offline you will see missing json files request
        },
      },
      generate: {
        routes: ["/"],
        // TODO https://vite-pwa-org.netlify.app/frameworks/nuxt#prompt-for-update-and-offline-ready
      },
    });

    const options = {
      dev: false,
      ready: true,
      cwd: resolve(__dirname, "rootDir"),
      overrides: config,
    };
    console.log("--------------------------------------> options", options);

    if (!nuxt) nuxt = await loadNuxt(options);
    console.log("--------------------------------------> loadNuxt complete");

    await buildNuxt(nuxt);
    console.log("--------------------------------------> build complete");
  }
}

const p = new ProgrammaticUsage();
p.generateSite();
