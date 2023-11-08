class ProgrammaticUsage {
  async generateSite() {
    const { resolve } = await import("path");
    const { build, loadNuxt } = await import("nuxt");
    const { defineNuxtConfig } = await import("nuxt/config");

    let nuxt = undefined;

    const config = defineNuxtConfig({
      rootDir: resolve(__dirname, "rootDir"),
      devtools: { enabled: true },
      ssr: false,
      buildDir: resolve(__dirname, "buildDir"),
      generate: { routes: ["/"] },
    });
    const options = {
      dev: false,
      ready: true,
      rootDir: resolve(__dirname, "rootDir"),
      config,
    };
    console.log("--------------------------------------> options", options);

    if (!nuxt) nuxt = await loadNuxt(options);
    await nuxt.ready(); // Necessary?
    console.log("--------------------------------------> loadNuxt complete");

    await build(nuxt);
    console.log("--------------------------------------> build complete");
  }
}

const p = new ProgrammaticUsage();
p.generateSite();
