/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [
      [
        'swc-plugin-another-transform-imports',
        {
          "antd": {
            "transform": "antd/lib/${member}",
            "skipDefaultConversion": false,
            "preventFullImport": true,
            "style": "antd/lib/${member}/style",
            "memberTransformers": ["dashed_case"]
          },
        },
      ],
    ],
  },
}

module.exports = nextConfig;
