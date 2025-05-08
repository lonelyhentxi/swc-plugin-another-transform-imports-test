import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import RefreshPlugin from "@rspack/plugin-react-refresh";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

const __dirname = import.meta.dirname;

export default defineConfig({
  context: __dirname,
  entry: {
    main: "./src/index.tsx"
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset"
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "swc-loader",
            options: {
              jsc: {
                experimental: {
                  plugins: [
                    [
                      "swc-plugin-another-transform-imports",
                      {
                        "antd": {
                          "transform": "antd/lib/${member}",
                          "skipDefaultConversion": false,
                          "preventFullImport": true,
                          "style": "antd/lib/${member}/style",
                          "memberTransformers": ["dashed_case"]
                        },
                        "lodash": {
                          "transform": "lodash/${member}",
                          "preventFullImport": true
                        }
                      }
                    ]
                  ]
                },
                parser: {
                  syntax: "typescript",
                  tsx: true
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev
                  }
                }
              },
              env: { targets }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html"
    }),
    isDev ? new RefreshPlugin() : null
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets }
      })
    ]
  },
  experiments: {
    css: true
  }
});
